import React from "react";
import axios from "./axios";

import { HashRouter, Link } from "react-router-dom";

export default class RegistrationDoctor extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            error1: false,
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
        axios.post("/register-doc", this.state).then(({ data }) => {
            console.log("data: ", data);
            if (data.success) {
                location.replace("/");
            } else if (data.duplicate) {
                this.setState({
                    error1: true,
                });
            } else {
                this.setState({
                    error: true,
                });
            }
        });
    }

    render() {
        return (
            <div className="reg-doc">
                <h2 id="heading">Please register here</h2>
                {this.state.error && <div>Oops something went wrong!</div>}
                {this.state.error1 && (
                    <div>Email address is already exists please login!</div>
                )}
                <input
                    className="input-field-div"
                    name="first"
                    autoComplete="off"
                    placeholder="First name"
                    required
                    onChange={(e) => this.handleChange(e)}
                />
                <br></br>
                <input
                    className="input-field-div"
                    name="last"
                    autoComplete="off"
                    placeholder="Last name"
                    required
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    className="input-field-div"
                    name="email"
                    autoComplete="off"
                    placeholder="Email id "
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
                <input
                    className="input-field-div"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    autoComplete="off"
                    type="password"
                    required
                    onChange={(e) => this.handleChange(e)}
                />
                <br></br>
                <button onClick={() => this.submit()}>Register!</button>
                <HashRouter>
                    <div id="desc-link">
                        Already a member?{" "}
                        <Link to="/log-doc">Log in here!</Link>
                    </div>
                </HashRouter>
            </div>
        );
    }
}
