import React from "react";
import axios from "./axios";

export default class Category extends React.Component {
    constructor(props) {
        console.log("props in uploader", props);
        super(props);
        this.state = {
            specializationList: [],
        };
    }

    componentDidMount() {
        console.log("Category mounted");
        axios.post("/specializationList").then((res) => {
            console.log(" Response from /user: ", res.data);
            this.setState({
                specializationList: res.data,
            });
        });
    }

    handleChange(e) {
        console.log("e.target.value", e.target.value);
        console.log("e.target.name: ", e.target.name);

        var cat = e.target.value;
        console.log("value in button", cat);
        axios.post("/category", { cat }).then((res) => {
            console.log("response in category", res);
            this.props.searchResult(res.data);
            console.log("response in category after setstate", this.state.user);
        });
    }

    // submit(e) {
    //     console.log("value in button", e.target.value);
    //     // this.setState({
    //     //     more: false,
    //     // });
    //     let cat = e.target.value;
    //     // if (cat == "all") {
    //     //     this.setState({
    //     //         more: true,
    //     //     });
    //     // }
    //     axios.post("/category", { cat }).then((res) => {
    //         console.log("response in category", res);
    //         // this.setState({
    //         //     user: res.data,
    //         // });
    //         console.log("response in category after setstate", this.state.user);
    //     });
    // }

    render() {
        return (
            <div id="category-modal-div">
                <div id="cat-nav">
                    <select
                        className="search-btn"
                        name="category_id"
                        onChange={(e) => this.handleChange(e)}
                        id="myList"
                        // onClick={(e) => {
                        //     this.submit(e);
                        // }}
                    >
                        <option>Search by specialist</option>
                        {this.state.specializationList.map((list) => (
                            <option key={list.id} value={list.id}>
                                {list.specialization_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}
