import { Link, useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";

import "../assets/styles/footer.scss";
const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <Link to={"/createTask"}>
          <AddBoxIcon fontSize={"large"}></AddBoxIcon>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
