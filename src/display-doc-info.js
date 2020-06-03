import React from "react";
import { HashRouter, Link } from "react-router-dom";

// pass 'props' as an argument to get access to the info being passed down from the parent (App)
// we can also use destructuring to pull up the properties inside props
export default function DisplayDocInfo({
    first,
    last,
    imageUrl,
    toggleModal,
    id,
    city,
    languages,
    website_link,
    street,
    house_no,
    pincode,
    specialization_name,
    qualification,
    dist,
    distance,
}) {
    console.log("props in profilepic: ", id, dist);

    imageUrl = imageUrl || "/default.png";
    let name = first + " " + last;

    return (
        <div id="picandtext">
            <Link to={`/user/${id}`}>
                <img
                    className="profilepic1"
                    src={imageUrl}
                    onClick={toggleModal}
                    alt={name}
                />
            </Link>
            <div id="list">
                <p>
                    {" "}
                    Dr.{first} {last}
                </p>
                <p>
                    <strong>Spec:</strong> {specialization_name}
                </p>
                <p>
                    <strong>Qual:</strong> {qualification}
                </p>
                <p>
                    <strong>Add:</strong> {street} {house_no}
                    <br></br>
                    {"  "}
                    {city} {pincode}
                </p>
                {dist && (
                    <p>
                        <strong>Dist:</strong> {distance}mi
                    </p>
                )}
            </div>
            <div id="address-confirmbtn">
                {/* <p>
                    <strong> Address:</strong> {street} {house_no}, {city} ,
                    {pincode}
                </p> */}

                <Link to={`/user/${id}`}>
                    <button>Continue to book an appointment</button>
                </Link>
            </div>
        </div>
    );
}
