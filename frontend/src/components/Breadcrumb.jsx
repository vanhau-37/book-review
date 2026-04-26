import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
    const location = useLocation();
    const paths = location.pathname.split("/").filter(Boolean);

    return (
        <p
            style={{
                padding: "0 0 0 30px",
                marginBottom: 0,
                background: "#ddf2fb",
                fontSize: "14px",
            }}
        >
            {paths.map((path, index) => {
                const isLast = index === paths.length - 1;

                return (
                    <span key={index}>
                        {path.charAt(0).toUpperCase() + path.slice(1)}
                        {!isLast && " > "}
                    </span>
                );
            })}
        </p>
    );
}

export default Breadcrumb;
