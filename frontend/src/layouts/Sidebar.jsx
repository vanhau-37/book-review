import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"

export default function Sidebar() {
    const [open, setOpen] = useState({
        authors: true,
        books: false,
        reviews: false,
    });

    const toggleMenu = (key) => {
        setOpen({
            ...open,
            [key]: !open[key]
        })
    }

    return (
        <div
            className="col-2"
            style={{
                background: "#ddd",
                minHeight: "100vh",
                padding: "30px",
            }}
        >
            <div style={{ marginBottom: "20px" }}>
                <div
                    onClick={() => toggleMenu('authors')}
                    style={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "large",
                    }}
                >
                    <i className="fa-solid fa-user"></i> Authors
                </div>

                {open.authors && (
                    <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                        <NavLink to="/authors/list" className="nav-link">
                            List
                        </NavLink>

                        <NavLink to="/authors/create" className="nav-link">
                            Create
                        </NavLink>
                    </div>
                )}

                <div
                    onClick={() => toggleMenu('books')}
                    style={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "large",
                        marginTop:'30px'
                    }}
                >
                    <i className="fa-solid fa-book"></i> Books
                </div>

                {open.books && (
                    <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                        <NavLink to="/books/list" className="nav-link">
                            List
                        </NavLink>

                        <NavLink to="/books/create" className="nav-link">
                            Create
                        </NavLink>
                    </div>
                )}

                <div
                    onClick={() => toggleMenu('reviews')}
                    style={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "large",
                        marginTop:'30px'
                    }}
                >
                    <i className="fa-solid fa-book"></i> Reviews
                </div>

                {open.reviews && (
                    <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                        <NavLink to="/reviews/list" className="nav-link">
                            List
                        </NavLink>

                        <NavLink to="/reviews/create" className="nav-link">
                            Create
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
}
