import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <div className="nav-left">Event Booking App</div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                {token && role === "ADMIN" && (
                    <>
                        <span className="nav-link-separator"> | </span>
                        <Link to="/admin-bookings">User Bookings</Link>
                        <span className="nav-link-separator"> | </span>
                        <Link to="/admin-dashboard">Dashboard</Link>
                    </>
                )}
                {token && role !== "ADMIN" && (
                    <>
                        <span className="nav-link-separator"> | </span>
                        <Link to="/my-bookings">My Bookings</Link>
                    </>
                )}
                <span className="nav-link-separator"> | </span>
                {token ? (
                    <button className="nav-logout" onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;