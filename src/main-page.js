import React from "react";
// import Registration from "./registration";
import Logo from "./logo";
import { HashRouter, Route, Link } from "react-router-dom";
// import Login from "./login";
// import ResetPassword from "./resetpassword";
// import RegistrationDoctor from "./reg-doctor";

export default function Welcome() {
    return (
        <div id="main-page-align">
            <h1 id="main-page-heading-font">
                Help you to book your doctor appointment<br></br>or<br></br>to
                bring your health care services online
            </h1>
            <div id="main-page">
                <div id="main-page-box">
                    <div className="landing-page-icon-center">
                        <img
                            className="landing-page-icon"
                            src="/patient_icon.png"
                        ></img>
                    </div>
                    <h1>I am a patient</h1>

                    <h4>My appointments are just a click away</h4>

                    <HashRouter>
                        <div>
                            <p>
                                You can register{" "}
                                <Link id="main-page-link" to="/registartion">
                                    here!
                                </Link>
                            </p>
                        </div>
                        <div>
                            <p>
                                If you are already member{" "}
                                <Link id="main-page-link" to="/login">
                                    login here!
                                </Link>
                            </p>
                        </div>
                    </HashRouter>
                </div>
                <div id="main-page-box">
                    <div className="landing-page-icon-center">
                        <img
                            className="landing-page-icon"
                            src="/doctor_icon.png"
                        ></img>
                    </div>
                    <h1>I am a doctor</h1>
                    <h4>I am easily reachable for your health care</h4>
                    <HashRouter>
                        <div>
                            <p>
                                You can register{" "}
                                <Link id="main-page-link" to="/reg-doc">
                                    here!
                                </Link>
                            </p>
                        </div>
                        <div>
                            <p>
                                If you are already member{" "}
                                <Link id="main-page-link" to="/log-doc">
                                    login here!
                                </Link>
                            </p>
                        </div>
                    </HashRouter>
                </div>
            </div>
        </div>
    );
}
