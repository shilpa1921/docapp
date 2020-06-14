import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import DoctorMarker from "./DoctorMarker";
import { HashRouter, Link } from "react-router-dom";
const DoctorsMap = withScriptjs(
    withGoogleMap((props) => {
        console.log("Doctors map props", props.doctors.users);
        const markers = props.doctors.users.map((doctor) => (
            <DoctorMarker
                key={doctor.id}
                doctor={doctor}
                location={{
                    lat: doctor.latitude,
                    lng: doctor.longitude,
                }}
                icon={"./old_logo1.png"}
            />
        ));

        return (
            <GoogleMap
                defaultZoom={10}
                center={{ lat: 52.5384877697085, lng: 13.4276134697085 }}
            >
                {markers}
            </GoogleMap>
        );
    })
);

export default DoctorsMap;
