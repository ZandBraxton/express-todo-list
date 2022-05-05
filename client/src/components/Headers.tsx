import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants/constants";
import { ApolloCache, useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

const Header = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div className="header-wrapper">
      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="ml1 pointer black"
            onClick={async () => {
              await localStorage.removeItem(AUTH_TOKEN);
              client.clearStore();
              navigate(`/login`);
            }}
          >
            logout
          </div>
        ) : (
          <Link to="/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
