import React from "react";
import axios from "./axios";
import { HashRouter, Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        console.log("e.target.value", e.target.value);
        console.log("e.target.name: ", e.target.name);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    submit() {
        console.log("about to submit", this.state);
        // e.preventDefault();
        axios.post("/login", this.state).then(({ data }) => {
            console.log("data: ", data);
            if (data.success) {
                location.replace("/doc-list");
            } else {
                this.setState({
                    error: true,
                });
            }
        });
    }

    render() {
        return (
            <div className="login">
                <h3 id="head">Please login here</h3>
                {this.state.error && <div>Oops something went wrong!</div>}

                <br></br>
                <input
                    className="input-field-div"
                    name="email"
                    autoComplete="off"
                    placeholder="Email"
                    required
                    onChange={(e) => this.handleChange(e)}
                />
                <br></br>
                <input
                    className="input-field-div"
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    type="password"
                    required
                    onChange={(e) => this.handleChange(e)}
                />
                <br></br>
                <button onClick={() => this.submit()}>Log in!</button>
                <HashRouter>
                    <div id="register">
                        If you are not member?{" "}
                        <Link to="/registartion">Register here!</Link>
                    </div>
                    <div id="reset">
                        Forget your password?{" "}
                        <Link to="/resetpassword">Click here!</Link>
                    </div>
                </HashRouter>
            </div>
        );
    }
}
