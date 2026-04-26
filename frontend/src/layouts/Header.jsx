import { NavLink } from "react-router-dom";
import "./Layout.css";

function Header() {
    return (
        <nav
            className="navbar navbar-expand-lg  navbar-dark bg-primary"
            style={{
                "--bs-bg-opacity": "0.858",
            }}
        >
            <span className="navbar-brand" style={{ marginLeft: "30px" }}>
                HAIBAZO BOOK REVIEW
            </span>
        </nav>
    );
}

export default Header;
