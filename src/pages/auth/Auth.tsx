import { Outlet } from "react-router";

import "./Auth.css";

const Auth = () => {
    return (
        <div id="container">
            <header id="auth-header">
                <h2>Estética e Cosmetologia</h2>
            </header>
            <div id="content-container">
                <Outlet />
            </div>
        </div>
    )
}

export default Auth;