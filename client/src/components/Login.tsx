import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LOGIN_MUTATION from "../graphql/mutations/login";
import { useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants/constants";

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
      console.log(login);
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <label>Email</label>
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
        />
        <label>Password</label>
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
        />
        <button type="submit">Login</button>
      </form>
      <Link to={"/register"}>
        Don't have an account? Click here to sign up!
      </Link>
    </div>
  );
};

export default Login;
