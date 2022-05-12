import { Tasklist } from "./Tasklist";
import { Header } from "./Header";

import Footer from "./Footer";
import "../assets/styles/home.scss";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Header></Header>
      <div className="inbox">
        <Tasklist></Tasklist>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
