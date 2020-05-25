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
}) {
    console.log("props in profilepic: ", id);

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
                <h3>
                    {" "}
                    Dr.{first} {last}
                </h3>
                <h3>Spoken languages:{languages}</h3>
            </div>
            <div>
                <h4>
                    Website:<a href={website_link}>{website_link}</a>
                </h4>
                <h4>
                    {street} {house_no} {city} {pincode}
                </h4>
            </div>
        </div>
    );
}
