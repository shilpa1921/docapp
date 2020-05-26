import React from "react";
import Logo from "./logo";
import Logout from "./logout";
import { HashRouter, Link } from "react-router-dom";

export default function Presentational({ first, last, imageUrl, toggleModal }) {
    imageUrl = imageUrl || "/default.png";
    let name = first + " " + last;

    return (
        <div id="present">
            <div id="nav">
                <Logo />

                <div>
                    <Link id="navbox" to="/doc-list">
                        Doctor List
                    </Link>
                </div>

                <div>
                    <Link id="navbox" to="/category">
                        Category
                    </Link>
                </div>
                <Logout />
            </div>
        </div>
    );
}
