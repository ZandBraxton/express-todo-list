import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import REGISTER_MUTATION from "../graphql/mutations/register";
import { useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants/constants";
import "../assets/styles/login.scss";

interface Iformstate {
  email: string;
  username: string;
  password: string;
  confirmPass: string;
}

const Register: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<Iformstate>({
    email: "",
    username: "",
    password: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState<Iformstate>({
    email: "",
    username: "",
    password: "",
    confirmPass: "",
  });

  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION, {
    variables: {
      email: formState.email,
      username: formState.username,
      password: formState.password,
    },

    onError: () => {
      switch (error?.message) {
        case "Email already exists":
          setErrors({
            ...errors,
            email: error.message,
          });
          break;
        case "User already exists":
          setErrors({
            ...errors,
            username: error.message,
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

    onCompleted: ({ register }) => {
      localStorage.setItem(AUTH_TOKEN, register.token);
      navigate("/");
    },
  });

  return (
    <div className="form-wrapper">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (formState.password !== formState.confirmPass) {
            return setErrors({
              ...errors,
              password: "These passwords do not match!",
            });
          }
          await setErrors({
            email: "",
            username: "",
            password: "",
            confirmPass: "",
          });
          await register();
        }}
      >
        <h1 className="form-head">REGISTER</h1>
        <div className="form-content">
          <div className="input-wrapper">
            <input
              type={"email"}
              value={formState.email}
              placeholder={"Email"}
              required
              onChange={(e) =>
                setFormState({
                  ...formState,
                  email: e.target.value.toLocaleLowerCase(),
                })
              }
            />
            <span className="error">{errors.email}</span>
          </div>
          <div className="input-wrapper">
            <input
              value={formState.username}
              placeholder={"Username"}
              required
              onChange={(e) =>
                setFormState({
                  ...formState,
                  username: e.target.value.toLocaleLowerCase(),
                })
              }
            />
            <span className="error">{errors.username}</span>
          </div>
          <div className="input-wrapper">
            <input
              value={formState.password}
              placeholder={"Password"}
              required
              minLength={8}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  password: e.target.value,
                })
              }
            />
            <span className="error">{errors.password}</span>
          </div>
          <div className="input-wrapper">
            <input
              value={formState.confirmPass}
              placeholder={"Confirm Password"}
              required
              minLength={8}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  confirmPass: e.target.value,
                })
              }
            />
            <span className="error">{errors.password}</span>
          </div>
          <button type="submit">Register</button>
        </div>
      </form>
      <Link to={"/login"}>
        <span>Already have an account? Click here to login!</span>
      </Link>
    </div>
  );
};

export default Register;
