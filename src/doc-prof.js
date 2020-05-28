import React from "react";
import axios from "./axios";

import { HashRouter, Link } from "react-router-dom";

export default class DoctorProfessionalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specializationList: [],
            error: false,
        };
        console.log("props in doc proff", this.props);
    }

    componentDidMount() {
        console.log("mounted in profile prof.js");
        axios.post("/specializationList").then((res) => {
            console.log(" Response from /user: ", res.data);
            this.setState({
                specializationList: res.data,
            });
        });
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
        axios.post("/register-doc-info", this.state).then(({ data }) => {
            console.log("data: ", data);
            if (data.success) {
                location.replace("/doc-address");
                // this.props.visibilityFunction(data.success);
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
            <div className="reg-doc1">
                <h2 id="heading">Please fill the all fields</h2>
                {this.state.error && <div>Oops something went wrong!</div>}

                <input
                    className="input-field-div "
                    name="qualification"
                    autoComplete="off"
                    placeholder="Qualification"
                    required
                    onChange={(e) => this.handleChange(e)}
                />
                <br></br>
                <select
                    className="input-field-div border"
                    name="insurence"
                    onChange={(e) => this.handleChange(e)}
                >
                    <option>Do you accept insurence card</option>
                    <option value="yes">yes</option>
                    <option value="no">No</option>
                </select>
                <select
                    className="input-field-div border"
                    name="category_id"
                    onChange={(e) => this.handleChange(e)}
                    id="myList"
                >
                    <option>Please enter your specialization</option>
                    {this.state.specializationList.map((list) => (
                        <option key={list.id} value={list.id}>
                            {list.specialization_name}
                        </option>
                    ))}
                </select>
                <input
                    className="input-field-div"
                    name="dob"
                    autoComplete="off"
                    placeholder="DOB (YYYY-MM-DD)"
                    required
                    onChange={(e) => this.handleChange(e)}
                />

                <br></br>
                <input
                    className="input-field-div"
                    name="Office_number"
                    autoComplete="Off"
                    placeholder="Office number "
                    required
                    onChange={(e) => this.handleChange(e)}
                />
                <br></br>
                <input
                    className="input-field-div"
                    name="personal_number"
                    autoComplete="off"
                    placeholder="Personal number "
                    required
                    onChange={(e) => this.handleChange(e)}
                />

                <br></br>
                <input
                    className="input-field-div"
                    name="spoken_lang"
                    autoComplete="off"
                    placeholder="Spoken languages"
                    required
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    className="input-field-div"
                    name="website_link"
                    autoComplete="off"
                    placeholder="Your website link"
                    required
                    onChange={(e) => this.handleChange(e)}
                />
                <button
                    className="input-field-div"
                    onClick={() => this.submit()}
                >
                    Submit
                </button>
            </div>
        );
    }
}
