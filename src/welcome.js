import React from "react";
import Registration from "./registration";

import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import Mainpage from "./main-page";
import ResetPassword from "./resetpassword";
import RegistrationDoctor from "./reg-doctor";
import LoginDoctor from "./log-doctor";
import Logo from "./logo";

// import ParlorForm from "./autoadd";

import ResetPasswordDoctor from "./resetpassword-doc";

export default function Welcome() {
    return (
        <div id="welcome">
            <Logo />

            <HashRouter>
                <div>
                    <Route exact path="/" component={Mainpage} />

                    <Route
                        exact
                        path="/reg-doc"
                        component={RegistrationDoctor}
                    />

                    <Route exact path="/log-doc" component={LoginDoctor} />
                    <Route
                        path="/resetpassdoc"
                        component={ResetPasswordDoctor}
                    />

                    <Route
                        exact
                        path="/registartion"
                        component={Registration}
                    />
                    <Route path="/login" component={Login} />
                    <Route path="/resetpassword" component={ResetPassword} />
                    {/* <Route path="/autodd" component={ParlorForm} /> */}
                </div>
            </HashRouter>
        </div>
    );
}
