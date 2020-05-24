import React from "react";
// import Registration from "./registration";

import { HashRouter, Route, Link } from "react-router-dom";
// import Login from "./login";
// import ResetPassword from "./resetpassword";
// import RegistrationDoctor from "./reg-doctor";

export default function Welcome() {
    return (
        <div id="main-page">
            <div id="doc-box">
                <h1>If you are quilified doctor Please sign up</h1>
                <HashRouter>
                    <div>
                        <Link id="main-page-link" to="/reg-doc">
                            You can register in here!
                        </Link>
                    </div>
                    <div>
                        <p>
                            If you are already member
                            <Link id="main-page-link" to="/log-doc">
                                Log in here!
                            </Link>
                        </p>
                    </div>
                </HashRouter>
            </div>
            <div id="pat-box">
                <h1>If you are patient Please sign up</h1>
                <HashRouter>
                    <div>
                        <Link id="main-page-link" to="/registartion">
                            You can register in here!
                        </Link>
                    </div>
                    <div>
                        <p>
                            If you are already member
                            <Link id="main-page-link" to="/login">
                                Login in here!
                            </Link>
                        </p>
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}
