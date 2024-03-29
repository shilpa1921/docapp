import React from "react";
import axios from "./axios";

import Presentational from "./presentational";
import Uploader from "./uploader";

// import Logo from "./logo";
import DoctorProfie from "./doc-profile";

import DoctorPage from "./doc-page";
// import Logout from "./logout";

// import Category from "./category";
// import Map  Wrapper from "./google-map-comp.js";

import AutoFillAddress from "./auto-add";

import { HashRouter, Link } from "react-router-dom";

import FindDoctor from "./find-doc";

import { BrowserRouter, Route } from "react-router-dom";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        console.log("mounted in app.js");
        axios.post("/user").then((res) => {
            console.log(" Response from /user: ", res.data);
            this.setState({
                first: res.data.first_name,
                last: res.data.last_name,
                quelification: res.data.quelification,
                specialization: res.data.specialization,
                city: res.data.city,
                id: res.data.id,

                imageUrl: res.data.pic_url,
            });
        });
    }

    toggleModal() {
        // console.log('toggleModal function is running!!');
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    receivePicture(arg) {
        console.log("I'm running in App: ", arg);
        this.setState({
            imageUrl: arg,
        });
    }
    receiveBio(arg) {
        console.log("I'm running in bio App: ", arg);
        this.setState({
            bio: arg,
        });
    }
    methodInApp(arg) {
        console.log("Im running in App!!!!! and my argument is: ", arg);
    }

    render() {
        return (
            <div id="app-componenet">
                <div>
                    <BrowserRouter>
                        <Presentational
                            first={this.state.first}
                            last={this.state.last}
                            imageUrl={this.state.imageUrl}
                            toggleModal={() => this.toggleModal()}
                        />

                        <Route
                            exact
                            path="/"
                            render={() => (
                                <DoctorProfie
                                    first={this.state.first}
                                    last={this.state.last}
                                    qulification={this.state.quelification}
                                    city={this.state.city}
                                    imageUrl={this.state.imageUrl}
                                    toggleModal={() => this.toggleModal()}
                                />
                            )}
                        />

                        <Route exact path="/user/:id" component={DoctorPage} />

                        <Route exact path="/doc-list" component={FindDoctor} />
                        {/* <Route exact path="/map" component={MapWrapper} /> */}

                        <Route
                            exact
                            path="/doc-address"
                            component={AutoFillAddress}
                        />

                        {this.state.uploaderIsVisible && (
                            <div id="upload-container">
                                <Uploader
                                    methodInApp={this.methodInApp}
                                    receivePicture={(arg) =>
                                        this.receivePicture(arg)
                                    }
                                    toggleModal={() => this.toggleModal()}
                                />
                            </div>
                        )}
                    </BrowserRouter>
                </div>
                {/* <div>
                    {" "}
                    <Footer />{" "}
                </div> */}
            </div>
        );
    }
}
