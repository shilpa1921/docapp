import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
// import StethoscopeIcon from "../stethoscopeIcon.png";
import { HashRouter, Link } from "react-router-dom";
export default class DoctorMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoWindowVisible: false,
        };
    }
    toggleModal() {
        // console.log('toggleModal function is running!!');
        this.setState({
            infoWindowVisible: !this.state.infoWindowVisible,
        });
    }

    render() {
        return (
            <Marker
                position={this.props.location}
                icon={this.props.icon}
                onClick={() => this.toggleModal()}
            >
                {this.state.infoWindowVisible && (
                    <InfoWindow onCloseClick={() => this.toggleModal()}>
                        <Link
                            id="link-in-infoWindow"
                            to={`/user/${this.props.doctor.id}`}
                        >
                            <div id="info-wimdow">
                                <img
                                    id="img-in-map"
                                    src={this.props.doctor.pic_url}
                                />
                                <br></br>
                                Dr. {this.props.doctor.first_name}{" "}
                                {this.props.doctor.last_name}
                                <br></br>
                                {this.props.doctor.street}{" "}
                                {this.props.doctor.house_no}
                                <br></br>
                                {this.props.doctor.city}{" "}
                                {this.props.doctor.pincode}
                            </div>
                        </Link>
                    </InfoWindow>
                )}
            </Marker>
        );
    }
}
