import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import REGISTER_MUTATION from "../graphql/mutations/register";
import { useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants/constants";

interface registerProps {}
const Register: React.FC<registerProps> = ({}) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION, {
    variables: {
      email: formState.email,
      username: formState.username,
      password: formState.password,
    },
    onCompleted: ({ register }) => {
      // localStorage.setItem(AUTH_TOKEN, register.token);
      navigate("/");
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          register();
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
        <label>Username</label>
        <input
          value={formState.username}
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value,
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
        <button type="submit">Register</button>
      </form>
      <Link to={"/login"}>Already have an account? Click here to login!</Link>
    </div>
  );
};

export default Register;
