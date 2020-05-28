import React, { Component, Fragment } from "react";
import axios from "./axios";
// import Profile from "./profile";
// import Logout from "./logout";

import CalenderShow from "./picker-calender";

class DoctorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selfuser: false,
        };
        console.log("props in other profilr", props);
    }

    componentDidMount() {
        console.log("this.props.match", this);
        const otherUserId = this.props.match.params.id;
        axios.post("/user/" + otherUserId).then((res) => {
            console.log("result in other profile", res.data);

            this.setState({
                first: res.data.first_name,
                last: res.data.last_name,
                imageUrl: res.data.pic_url || "/default.png",
                city: res.data.city,
                id: res.data.id,

                languages: res.data.languages,
                personal_number: res.data.personal_number,
                email_id: res.data.email_id,
                street: res.data.street,
                house_no: res.data.house_no,
                state: res.data.state,
                pincode: res.data.pincode,
                website_link: res.data.website_link,
                specialization_name: res.data.specialization_name,
                qualification: res.data.qualification,
            });
        });
    }
    render() {
        return (
            <Fragment>
                <div className="profile">
                    <div>
                        <img
                            id="pic-in-otherprofile"
                            src={this.state.imageUrl}
                        ></img>
                        <p>
                            <strong>
                                {" "}
                                Dr. {this.state.first} {this.state.last}
                            </strong>
                            <br></br>
                            {this.state.specialization_name}
                            <br></br>
                            {this.state.qualification}
                        </p>
                        <br></br>

                        <p>
                            {" "}
                            <strong> Spoken languages:</strong>{" "}
                            {this.state.languages}
                        </p>

                        <p>
                            <strong>Email:</strong> {this.state.email_id}
                        </p>
                        <p>
                            <strong>Address:</strong> {this.state.street}{" "}
                            {this.state.house_no}
                            <br></br>
                            {this.state.city}
                            {this.state.pincode}
                        </p>
                        <p>
                            <strong>Website:</strong>{" "}
                            <a href={this.state.website_link} target="blank">
                                {this.state.website_link}
                            </a>
                        </p>
                    </div>
                    <div id="calender">
                        <h3> Please select date and time </h3>
                        <CalenderShow id={this.state.id} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default DoctorPage;
