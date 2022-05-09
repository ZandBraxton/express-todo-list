import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import GET_USER from "../graphql/queries/getUser";
import { AUTH_TOKEN } from "../constants/constants";
import { useApolloClient } from "@apollo/client";
import { useIsAuth } from "../utils/useIsAuth";
import { Projectlist } from "./Projectlist";
import { Tasklist } from "./Tasklist";
import { useState } from "react";
import Footer from "./Footer";
import "../assets/styles/home.scss";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxIcon from "@mui/icons-material/AddBox";
const Home = () => {
  const [isActive, setIsActive] = useState(false);
  const client = useApolloClient();
  const navigate = useNavigate();
  interface Itasks {
    name: string;
    priority: string;
    isCompleted: boolean;
    __typename: string;
  }
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
    <div className="home-wrapper">
      {/* <Header></Header> */}
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
          <div className="projects">
            <h2>PROJECTS</h2>
            <Projectlist></Projectlist>
            <div className="menu-buttons">
              <div className="menu-option">
                <h3>Add Project</h3>
                <AddBoxIcon fontSize={"large"} />
              </div>
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

        {/* <div className="">
          <ul>
            <li>Settings</li>
          </ul>
        </div> */}
      </header>
      <div className="inbox">
        <Tasklist></Tasklist>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
