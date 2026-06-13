import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/app.css";

function MainLayout() {
    return (
        <>
            <div className="app-root">
                <Navbar />
                <main className="page-container">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default MainLayout;