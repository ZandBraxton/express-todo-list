import { useApolloClient } from "@apollo/client";
import { useState } from "react";
import { AUTH_TOKEN } from "../constants/constants";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useQuery } from "@apollo/client";
import GET_USER from "../graphql/queries/getUser";
import { useIsAuth } from "../utils/useIsAuth";

export const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const client = useApolloClient();
  const navigate = useNavigate();

  const {
    loading: userLoading,
    error: userError,
    data: user,
  } = useQuery(GET_USER);

  useIsAuth();

  if (userLoading) {
    return <div>...loading</div>;
  }

  if (!user?.me) {
    return <div>Error</div>;
  }
  return (
    <header>
      <nav className="nav">
        <h1>Hello, {user?.me.username}</h1>
        <MenuIcon
          onClick={() => {
            setIsActive(!isActive);
          }}
        ></MenuIcon>
      </nav>
      <div className={isActive ? "active" : "hidden"}>
        <div className="menu-container">
          <div className="menu-buttons">
            <div
              className="menu-option"
              onClick={async () => {
                await localStorage.removeItem(AUTH_TOKEN);
                client.clearStore();
                navigate(`/login`);
              }}
            >
              <h3>Logout</h3>
              <LogoutIcon fontSize={"large"} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
