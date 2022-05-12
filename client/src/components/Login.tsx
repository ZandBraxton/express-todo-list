import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LOGIN_MUTATION from "../graphql/mutations/login";
import { useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants/constants";
import { onError } from "@apollo/client/link/error";
import "../assets/styles/login.scss";

interface Iformstate {
  email: string;
  password: string;
}

const Login: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<Iformstate>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Iformstate>({
    email: "",
    password: "",
  });

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },

    onError: () => {
      switch (error?.message) {
        case "User not found":
          setErrors({
            ...errors,
            email: error.message,
          });
          break;
        case "Passwords do not match":
          setErrors({
            ...errors,
            password: error.message,
          });
          break;

        default:
          break;
      }
    },

    onCompleted: async ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      await navigate("/", { replace: true });
    },
  });

  return (
    <div className="form-wrapper">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await setErrors({
            email: "",
            password: "",
          });
          await login();
        }}
      >
        <h1 className="form-head">LOGIN</h1>
        <div className="form-content">
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
            <span className="error">{errors.email}</span>
          </div>
          <div className="input-wrapper">
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
            <span className="error">{errors.password}</span>
          </div>

          <button type="submit">LOGIN</button>
          <span className="forgot-password">Forgot your password?</span>
        </div>
      </form>
      <Link to={"/register"}>
        <span>Don't have an account? Click here to sign up!</span>
      </Link>
    </div>
  );
};

export default Login;
