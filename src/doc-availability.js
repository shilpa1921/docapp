import React, { useState } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addDays from "date-fns/addDays";
import getDay from "date-fns/getDay";
import axios from "./axios";
import moment from "moment";

// import "react-datepicker/dist/react-datepicker.css";

function AvailbilityShow() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState();
    const [error, setError] = useState(false);
    const [error1, setError1] = useState(false);
    // setHours(setMinutes(new Date(), new Date().getMinutes()),new Date().getHours())

    var fromDate = moment(startDate).format("HH:mm");
    var toDate = moment(endDate).format("HH:mm");
    var day = selectedDay;

    const submit = () => {
        console.log(
            "shilpa in doc-availability",
            toDate,
            fromDate,
            selectedDay
        );
        axios
            .post("/doc-availability", { to: toDate, from: fromDate, day: day })
            .then(({ data }) => {
                console.log("response from /doc-availability", data);
                if (data.success) {
                    setError(true);
                } else {
                    setError1(true);
                }
            });
    };

    return (
        <div className="reg-doc2">
            {error && <p>Succesfully updated</p>}
            {error1 && <p>You have already updated</p>}
            <p>
                <strong>Enter your daily availability</strong>{" "}
            </p>
            From:{" "}
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                timeFormat="HH:mm"
            />
            <p></p> To:{"  "}
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                timeFormat="HH:mm"
            />
            <br></br>
            <p>
                <strong>If you are also working on weekend</strong>
            </p>
            <select
                className="input-field-div"
                name="availabilityDay"
                onChange={(e) => setSelectedDay(e.target.value)}
            >
                <option>Please select Here</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
                <option value="both">Both days</option>
            </select>
            <br></br>
            <button id="avail" onClick={submit}>
                submit info
            </button>
        </div>
    );
}

export default AvailbilityShow;
