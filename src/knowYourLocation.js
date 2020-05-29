import React from "react";
import axios from "./axios";
import Autocomplete from "react-google-autocomplete";
class SearchLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.autocomplete = null;
    }

    componentDidMount() {
        // this.autocomplete = new google.maps.places.Autocomplete(
        //     document.getElementById("autocomplete"),
        //     {}
        // );

        // this.autocomplete.addListener("place_changed", this.handlePlaceSelect);

        // this.autocomplete.setComponentRestrictions({
        //     country: ["de"],
        // });

        var options = {
            // types: ["(regions)"],
            componentRestrictions: { country: "de" },
        };
        var input = document.getElementById("autocomplete");
        this.autocomplete = new google.maps.places.Autocomplete(input, options);
        this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
    }

    initialState() {
        return {
            name: "",
            street_address: "",
            city: "",
            state: "",
            country: "",
            zip_code: "",
            lat: "",
            lng: "",
        };
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log("this.state", this.state);
    }

    handleSubmit(e) {
        event.preventDefault();
        console.log("this.state", this.state);
    }

    handlePlaceSelect(e) {
        console.log(
            "this.autocomplete.getPlace()",
            this.autocomplete.getPlace()
        );
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components;
        let location = addressObject.geometry;
        this.setState({
            lat: location.viewport.Ya.i,
            lng: location.viewport.Ua.i,
        });
        console.log("this.state", this.state);
        axios.post("/userLoction", this.state).then((res) => {
            console.log("response in /userLocation", res);
            this.props.searchResult(res.data);
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        className="search-btn"
                        id="autocomplete-search"
                        className="input-field"
                        ref="input"
                        type="text"
                        placeholder="Find a doctor near you!"
                    />
                </form>
            </div>
        );
    }
}

export default SearchLocation;
