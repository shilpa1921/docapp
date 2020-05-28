import React, { useState, useEffect } from "react";
import axios from "./axios";
import DisplayDocInfo from "./display-doc-info";

import LocationDemo from "./location";
import SearchLocation from "./knowYourLocation";

import Category from "./category";

import ReactDOM from "react-dom";

export default function FindPeople() {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);
    const [newarriver, setNewarriver] = useState(true);
    const [search, setSearch] = useState(false);
    const [dist, setDist] = useState(false);
    const [more, setMore] = useState(true);

    useEffect(() => {
        let abort;
        console.log("useEffect runs!");
        axios.post("/findDoctor", { user }).then(({ data }) => {
            console.log("data from flame egg: ", data);

            if (!abort) {
                setUsers(data);
            }
        });
        if (user == "") {
            setSearch(false);
            setNewarriver(true);
        }

        return () => {
            abort = true;
        };
    }, [user]);
    function searchResult(arg) {
        console.log("shilpa in search result ", arg);

        setDist(true);
        setUsers(arg);
    }

    var arr = [];
    arr.push(...users);
    const seeMore = () => {
        console.log("shilpa in see more", users);
        var lastId = { id: users[users.length - 1].id };
        console.log("Shilpa in category but seeing in seeMore", lastId, users);

        axios
            .post("/morePost", lastId)
            .then((response) => {
                console.log("res from morePost", response);
                var lowestId =
                    response.data[response.data.length - 1].lowest_id;
                var lastId = response.data[response.data.length - 1].id;
                if (lastId === lowestId) {
                    setMore(false);
                }
                for (var i = 0; i < response.data.length; i++) {
                    arr.push(response.data[i]);
                }
                console.log("shilpa", arr);
                setUsers(arr);
            })

            .catch(function (err) {
                console.log("Error in POST /get-more: ", err);
            });
    };

    return (
        <div id="find-doc">
            {/* <p>Search By Doctor !!</p> */}
            <div id="input-icon">
                <div>
                    <input
                        className="search-btn"
                        onChange={(e) => {
                            setNewarriver(false);
                            setSearch(true);
                            setMore(false);
                            setUser(e.target.value);
                        }}
                        placeholder="Search by doctor name"
                    />
                    {/* <h2>{exp.latitude}</h2> */}
                </div>
                <div id="user-location">
                    <SearchLocation
                        searchResult={(arg) => {
                            searchResult(arg);
                        }}
                    />

                    <LocationDemo
                        searchResult={(arg) => {
                            searchResult(arg);
                        }}
                    />
                </div>
                <div>
                    <Category />
                </div>
            </div>

            {search && <p>Doctor to whom you searched</p>}

            <div>
                {users.map((user) => (
                    <div id="findPeople" key={user.id}>
                        <div>
                            <DisplayDocInfo
                                first={user.first_name}
                                last={user.last_name}
                                city={user.city}
                                imageUrl={user.pic_url}
                                id={user.id}
                                languages={user.languages}
                                website_link={user.website_link}
                                street={user.street}
                                city={user.city}
                                house_no={user.house_no}
                                pincode={user.pincode}
                                specialization_name={user.specialization_name}
                                qualification={user.qualification}
                                dist={dist}
                                distance={user.distance}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div id="seemore">
                {more && <button onClick={(e) => seeMore(e)}>See More</button>}
            </div>
        </div>
    );
}
