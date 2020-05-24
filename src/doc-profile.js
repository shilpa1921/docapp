import React from "react";

import AutoFillAddress from "./auto-add";

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

    return (
        <div id="profile-page">
            <div>
                <img
                    onClick={toggleModal}
                    id="pic-in-profile"
                    src={imageUrl}
                ></img>
                <h1>
                    {first} {last}
                </h1>
                <h1>{qulification}</h1>
            </div>
            <div>
                <AutoFillAddress />
            </div>
        </div>
    );
}
