import React from "react";
import { HashRouter, Link } from "react-router-dom";

// pass 'props' as an argument to get access to the info being passed down from the parent (App)
// we can also use destructuring to pull up the properties inside props
export default function displayDocInfo({
    first,
    last,
    imageUrl,
    toggleModal,
    id,
    city,
}) {
    console.log("props in profilepic: ", id);

    imageUrl = imageUrl || "/default.png";
    let name = first + " " + last;

    return (
        <Link to={`/user/${id}`}>
            <div id="picandtext">
                <img
                    className="profilepic1"
                    src={imageUrl}
                    onClick={toggleModal}
                    alt={name}
                />
                <div id="list">
                    <h3>
                        {" "}
                        {first} {last}
                    </h3>
                    <h3>{city}</h3>
                </div>
            </div>
        </Link>
    );
}
