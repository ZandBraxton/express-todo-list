import GET_USER from "../graphql/queries/getUser";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
export const useIsAuth = () => {
  const { data, loading } = useQuery(GET_USER);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(data, loading);
    if (!loading && !data?.me) {
      navigate("/login", { replace: true });
    }
  }, [loading, data, navigate]);
};
