import React, { Component, Fragment } from "react";
import axios from "./axios";
// import Profile from "./profile";
// import Logout from "./logout";

class DoctorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selfuser: false,
        };
        console.log("props in other profilr", props);
    }

    componentDidMount() {
        console.log("this.props.match", this.props.match.params.id);
        const otherUserId = this.props.match.params.id;
        axios.post("/user/" + otherUserId).then((res) => {
            console.log("result in other profile", res.data);

            this.setState({
                first: res.data.first_name,
                last: res.data.last_name,
                imageUrl: res.data.pic_url || "/default.png",
                city: res.data.city,
            });
        });
    }
    render() {
        return (
            <Fragment>
                <div className="profile">
                    <h1>
                        {this.state.first} {this.state.last}
                    </h1>
                    <img
                        id="pic-in-otherprofile"
                        src={this.state.imageUrl}
                    ></img>
                    <h2>{this.state.city}</h2>
                </div>
            </Fragment>
        );
    }
}

export default DoctorPage;
