import React from "react";

import AutoFillAddress from "./auto-add";

import DoctorProfessionalInfo from "./doc-prof";

export default function DoctorProfie({
    first,
    last,
    imageUrl,
    toggleModal,
    qulification,
    city,
    specialization,
}) {
    imageUrl = imageUrl || "default.png";

    function visibilityFunction(arg) {
        console.log("I am in doc profile", arg);
    }

    return (
        <div id="profile-page">
            <div>
                <img
                    onClick={toggleModal}
                    id="pic-in-profile"
                    src={imageUrl}
                ></img>
                <h1>
                    Dr. {first} {last}
                </h1>
                <h1>{qulification}</h1>
            </div>
            <div>
                <DoctorProfessionalInfo
                    visibilityFunction={(arg) => visibilityFunction(arg)}
                />
            </div>
            {/* <div>
                <AutoFillAddress />
            </div> */}
        </div>
    );
}
