import React, { useState, useEffect } from "react";
import axios from "./axios";
import DisplayDocInfo from "./display-doc-info";

import LocationDemo from "./location";
import SearchLocation from "./knowYourLocation";

// import AppDate from "./picker-ex";

import ReactDOM from "react-dom";

export default function FindPeople() {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);
    const [newarriver, setNewarriver] = useState(true);
    const [search, setSearch] = useState(false);
    useEffect(() => {
        let abort;
        console.log("useEffect runs!");
        axios.post("/findpeople", { user }).then(({ data }) => {
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

    return (
        <div>
            <p>Search for Doctor!!</p>
            <div id="input-icon">
                <div>
                    <input
                        onChange={(e) => {
                            setNewarriver(false);
                            setSearch(true);
                            setUser(e.target.value);
                        }}
                        placeholder="type the name"
                    />
                </div>
                <div>
                    <SearchLocation />
                </div>
                <div>
                    <LocationDemo />
                </div>
                {/* <React.StrictMode>
                    <AppDate />
                </React.StrictMode> */}
            </div>

            {search && <p>People to whom you searched</p>}

            <ul>
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
                            />
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}
