import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LOGIN_MUTATION from "../graphql/mutations/login";
import { useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants/constants";
import "../assets/styles/login.scss";

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },

    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate("/", { replace: true });
    },
  });

  return (
    <div className="login-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <h1 className="form-head">LOGIN</h1>
        <div className="input-wrapper">
          <input
            value={formState.email}
            placeholder={"Email"}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value,
              })
            }
          />
          <input
            value={formState.password}
            placeholder={"Password"}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value,
              })
            }
          />
          <button type="submit">LOGIN</button>
          <span>Forgot your password?</span>
        </div>
      </form>
      <Link to={"/register"}>
        <span>Don't have an account? Click here to sign up!</span>
      </Link>
    </div>
  );
};

export default Login;
