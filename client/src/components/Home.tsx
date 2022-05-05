import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import GET_USER from "../graphql/queries/getUser";
import { useIsAuth } from "../utils/useIsAuth";
import { Tasklist } from "./Tasklist";
import Header from "./Headers";
import "../assets/styles/home.scss";
import MenuIcon from "@mui/icons-material/Menu";
const Home = () => {
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
      <header>
        <h1>Hello, {user?.me.username}</h1>
        <MenuIcon></MenuIcon>
      </header>
      {/* <hr></hr> */}
      <div className="inbox">
        <Tasklist></Tasklist>
      </div>
      <Link to={"/createTask"}>
        <span>Create Task</span>
      </Link>
    </div>
  );
};

export default Home;
