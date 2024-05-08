import "../styles/Header.css";
import Toggle from "./Toggle";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>Spreadsheet Handler</h1>
      <div className="right-side">
        <Toggle />
        <Link to={"/"}>
          <p>Get Started</p>
        </Link>
      </div>
    </header>
  );
}
