import React from "react";
import axios from "./axios";
import Autocomplete from "react-google-autocomplete";
class AutoFillAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.autocomplete = null;
    }

    componentDidMount() {
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
            street: "",
            house_no: "",
            city: "",
            state: "",
            country: "",
            zip_code: "",
            lat: "",
            lng: "",
            error: false,
        };
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log("this.state", this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post("/auto-address", this.state).then((res) => {
            console.log("response in /auto-address", res);
            if (res.data.success) {
                location.replace("/doc-list");
            } else {
                this.setState({
                    error: true,
                });
            }
        });
    }

    handlePlaceSelect() {
        console.log(
            "this.autocomplete.getPlace()",
            this.autocomplete.getPlace()
        );
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components;
        let location = addressObject.geometry;
        this.setState({
            name: addressObject.name,
            street: address[1].long_name,
            house_no: address[0].long_name,
            city: address[3].long_name,
            state: address[4].long_name,
            country: address[5].long_name,
            zip_code: address[6].short_name,
            lat: location.viewport.Ya.i,
            lng: location.viewport.Ua.i,
        });
    }

    render() {
        return (
            <div className="reg-doc">
                <h1>Fill your clinic address</h1>
                {this.state.error && (
                    <h2>You have already entered your address</h2>
                )}
                <form onSubmit={this.handleSubmit}>
                    <input
                        className="input-field-div"
                        id="autocomplete"
                        ref="input"
                        type="text"
                    />
                    <br></br>

                    <input
                        className="input-field-div"
                        name={"name"}
                        value={this.state.name}
                        placeholder={"Name"}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <input
                        className="input-field-div"
                        name={"street"}
                        value={this.state.street}
                        placeholder={"Street Address"}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <input
                        className="input-field-div"
                        name={"house_no"}
                        value={this.state.house_no}
                        placeholder={"House no"}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <input
                        className="input-field-div"
                        name={"city"}
                        value={this.state.city}
                        placeholder={"City"}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <input
                        className="input-field-div"
                        name={"state"}
                        value={this.state.state}
                        placeholder={"State"}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <input
                        className="input-field-div"
                        name={"country"}
                        value={this.state.country}
                        placeholder={"Country"}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <input
                        className="input-field-div"
                        name={"zip_code"}
                        value={this.state.zip_code}
                        placeholder={"Zipcode"}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <button
                        className="input-field-div"
                        onSubmit={this.handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default AutoFillAddress;
