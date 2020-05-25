import React, { Component } from "react";
import axios from "./axios";

import Geocoder from "react-native-geocoding";
import Geolocation from "react-native-geolocation-service";
export default class LocationDemo extends Component {
    constructor() {
        super();

        this.state = {
            latitude: 0,

            longitude: 0,

            error: null,

            Address: null,
        };
    }

    initMap() {
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,

                    longitude: position.coords.longitude,
                });
                Geocoder.init("dummy");

                Geocoder.from(
                    position.coords.latitude,
                    position.coords.longitude
                )

                    .then((json) => {
                        console.log(json);

                        var addressComponent =
                            json.results[0].address_components;
                        var location = json.results[0].geometry;

                        this.setState({
                            street_address: `${addressComponent[1].long_name} ${addressComponent[0].long_name}`,
                            city: addressComponent[3].long_name,
                            state: addressComponent[4].long_name,
                            country: addressComponent[5].long_name,
                            zip_code: addressComponent[6].short_name,
                            lat: location.viewport.northeast.lat,
                            lng: location.viewport.northeast.lng,
                        });

                        console.log(this.state);
                        axios.post("/userLoction", this.state).then((res) => {
                            console.log("response in /userLocation", res);
                        });
                    })

                    .catch((error) => console.warn(error));
            },

            (error) => {
                // See error code charts below.

                this.setState({
                    error: error.message,
                }),
                    console.log(error.code, error.message);
            },

            {
                enableHighAccuracy: false,

                timeout: 10000,

                maximumAge: 100000,
            }
        );
    }

    render() {
        return (
            <p id="p-loc" onClick={(e) => this.initMap(e)}>
                <img id="loc" src="./location.png" />
            </p>
        );
    }
}
