import GET_USER from "../graphql/queries/getUser";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
export const useIsAuth = () => {
  const client = useApolloClient();
  const { data, loading } = useQuery(GET_USER);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !data?.me) {
      client.clearStore();
      navigate("/login", { replace: true });
    }
  }, [loading, data, navigate]);
};
