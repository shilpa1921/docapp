import React from "react";
import DoctorsMap from "./DoctorsMap";

export default class DoctorsMapContainer extends React.Component {
    constructor(props) {
        super(props);
        console.log("props in doc container ", props);
    }
    render() {
        return (
            <DoctorsMap
                doctors={this.props}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=dummy
&libraries=places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                    <div style={{ height: `400px`, width: `1200px` }} />
                }
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }
}
