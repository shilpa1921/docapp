import React, { useState } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import addDays from "date-fns/addDays";
import getDay from "date-fns/getDay";
import moment from "moment";
import axios from "./axios";

function CalenderShow({ id }) {
    const [startDate, setStartDate] = useState(new Date());
    const [excludeSlotState, setExcludeSlotState] = useState();
    const [minWorkingTime, setMinWorkingTime] = useState(
        setHours(setMinutes(new Date(), 0), 7)
    );
    const [maxWorkingTime, setMaxWorkingTime] = useState(
        setHours(setMinutes(new Date(), 0), 21)
    );

    const holidays = [new Date("2020-05-26"), new Date("2020-06-03")];
    const timeSlotResponse = [];

    const excludeSlot = [];
    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
        const timeslot = [];
    };

    const [successMsg, setSuccessMsg] = useState(false);
    // setMyParam(new Date());
    function setMyParam(date) {
        console.log("inside setMYParam ", date);
        var slotMinute;
        var slotHour;

        setStartDate(date);
        var onSelectDate = date;
        var classDate = new Date(onSelectDate);
        var doctor_id = id;
        const selectedDate = moment(classDate).format("YYYY-MM-DD");
        var setHourAndMinute = "";

        axios
            .post("/get-workinghours", {
                doctor_id: doctor_id,
            })
            .then((res) => {
                console.log("res in get working hours", res.data);
                const resultset = res.data[0];
                setMinWorkingTime(
                    setHours(
                        setMinutes(
                            new Date(),
                            resultset.visiting_hours_from.slice(3, 5)
                        ),
                        resultset.visiting_hours_from.slice(0, 2)
                    )
                );
                setMaxWorkingTime(
                    setHours(
                        setMinutes(
                            new Date(),
                            resultset.visiting_hours_to.slice(3, 5)
                        ),
                        resultset.visiting_hours_to.slice(0, 2)
                    )
                );
            });

        axios
            .post("/get-timesloat", {
                selectedDate: selectedDate,
                doctor_id: doctor_id,
            })
            .then((res) => {
                console.log("response in get-timesloat", res.data);

                timeSlotResponse.push(res.data);
                for (var i = 0; i < timeSlotResponse[0].length; i++) {
                    slotHour = timeSlotResponse[0][i].app_timeslot.slice(0, 2);
                    slotMinute = timeSlotResponse[0][i].app_timeslot.slice(
                        3,
                        5
                    );

                    excludeSlot.push(
                        setHours(
                            setMinutes(setSeconds(new Date(), 0), slotMinute),
                            slotHour
                        )
                    );
                }
                setExcludeSlotState(excludeSlot);
            });

        console.log("excludeSlotStateashok == ", excludeSlotState);
    }

    function confirmAppointment() {
        console.log("this.props.match in picker", id);
        console.log("in appointment histroy", startDate);
        var doc_id = id;

        const appDate = moment(startDate).format("YYYY-MM-DD");
        const appTime = moment(startDate).format("HH:mm");
        console.log("in appointment histroy date n time ", appDate, appTime);
        axios
            .post("/appointment-histroy", {
                appDate: appDate,
                appTime: appTime,
                doc_id: doc_id,
            })
            .then((res) => {
                console.log("response in appointment histroy", res);
                if (res.data.success) {
                    setSuccessMsg(true);
                    setStartDate(new Date());
                }
            });
    }

    return (
        <div className="App">
            <header className="App-header">
                <DatePicker
                    selected={startDate}
                    // onChange={(date) => setStartDate(date)}
                    onChange={(date) => setMyParam(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    timeCaption="Time"
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 90)}
                    minTime={minWorkingTime}
                    maxTime={maxWorkingTime}
                    excludeDates={holidays}
                    filterDate={isWeekday}
                    excludeTimes={excludeSlotState}
                    dateFormat="MMMM d, yyyy HH:mm aa"
                    withPortal
                />
            </header>
            {successMsg && (
                <p id="confirmMsg">
                    Your appointment is confirmed and details sent to email id
                </p>
            )}
            <button id="btn" onClick={confirmAppointment}>
                Confirm appointment
            </button>
        </div>
    );
}

export default CalenderShow;
