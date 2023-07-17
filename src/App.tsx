import React, { useState } from "react";
import "./app.css";
import iconArrow from "./assets/images/icon-arrow.svg";


const App = () => {

    const [elapsed, setElapsed] = useState<{days: number | undefined, months: number | undefined, years: number | undefined}>({
        days: undefined,
        months: undefined,
        years: undefined
    });
    const [allFieldsNotEmpty, setAllFieldsNotEmpty] = useState(true);
    const [yearField, setYearField] = useState(true);
    const [monthField, setMonthField] = useState(true);
    const [dayField, setDayField] = useState(true);

    const handleFormSubmission = (e: any) => {

        e.preventDefault();
        
        const formData = new FormData(e.target);
        //console.log(formData); // converts formData to plain text in object format
        const {day, month, year} = Object.fromEntries(formData);

        // console.log(day, month, year);
        if (!day && !month && !year)
            setAllFieldsNotEmpty(false);
        else
            setAllFieldsNotEmpty(true);
        
        let elapsedYears = 0;
        let elapsedMonths = 0;
        let elapsedDays = 0;
        // console.log(elapsedDays, elapsedMonths, elapsedYears);


        const start = new Date(`${year}-${month}-${day}`);
        const end = new Date();
        if (isNaN(start.getDay()) && day !== "" && month !== "" && year !== "") {
            if (Number(year) - end.getFullYear() > 0) {
                setYearField(false);
            }
            else {
                setYearField(true);
            }
            if (Number(month) > 12 || Number(month) < 1) {
                setMonthField(false);
                if (Number(day) >= 1 && Number(day) <= 31)
                    return;
            }
            else {
                setMonthField(true);
            }
            if (yearField || monthField) {
                setDayField(false);
            }
            setElapsed({ 
                days: undefined,
                months: undefined,
                years: undefined 
            })
            return;
        }
        
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        
        const differenceInTime = end.getTime() - start.getTime(); // Difference in milliseconds
        let differenceInDays = Math.floor(differenceInTime / millisecondsPerDay); // Difference in days
        if (differenceInDays < 0) {
            setYearField(false);
            return;
        }
        setYearField(true);
        setMonthField(true);
        setDayField(true);
        // console.log("Days " + differenceInDays);

        if (differenceInDays >= 365) {
            elapsedYears = Math.floor(differenceInDays / 365);
            differenceInDays -= elapsedYears * 365;
        }
        
        if (differenceInDays >= 30) {
            elapsedMonths = Math.floor(differenceInDays / 30);
            differenceInDays -= elapsedMonths * 30;
        }
        
        elapsedDays = differenceInDays;
        // console.log(`The difference is ${elapsedYears} years, ${elapsedMonths} months, and ${elapsedDays} days.`);

        setElapsed({ 
            days: elapsedDays,
            months: elapsedMonths,
            years: elapsedYears 
        })
    }

return (
        <div className="container">
            <div className="app">
                <form
                    onSubmit={(e: any) => {
                        handleFormSubmission(e)
                    }}

                    className="form"
                >
                    <div className={allFieldsNotEmpty && dayField ? `form-input-field`: `form-input-field invalid-input-fields`}>
                        <label htmlFor="day">DAY</label>
                        <input name="day" type="number" placeholder="DD" />
                        <span className={dayField ? "" : "input-error-day-text"} >Must be a valid day</span>
                        <span className={allFieldsNotEmpty ? "": "input-error-general-text"}>This field is required</span>
                    </div>
                    <div className={allFieldsNotEmpty && monthField ? `form-input-field`: `form-input-field invalid-input-fields`}>
                        <label htmlFor="month">MONTH</label>
                        <input name="month" type="number" placeholder="MM" />
                        <span className={monthField ? "" : "input-error-month-text"} >Must be a valid month</span>
                        <span className={allFieldsNotEmpty ? "": "input-error-general-text"}>This field is required</span>
                    </div>
                    <div className={allFieldsNotEmpty && yearField ? `form-input-field`: `form-input-field invalid-input-fields`}>
                        <label htmlFor="year">YEAR</label>
                        <input name="year" type="number" placeholder="YYYY" />
                        <span className={yearField ? "" : "input-error-year-text"} >Must be in the past</span>
                        <span className={allFieldsNotEmpty ? "": "input-error-general-text"}>This field is required</span>
                    </div>
                    <div className="form-submit">
                        <div className="form-submit-demacation"></div>
                        <div className="form-submit-button">
                            <button>
                                <img src={iconArrow} width={40} alt="sub" />
                            </button>
                        </div>
                        <div className="form-submit-demacation"></div>
                    </div>
                </form>
                <div className="app-outputs">
                    <div>
                        <span className="output"> {elapsed.years ? elapsed.years : "- -" }</span>
                        <span> Years </span>
                    </div>
                    <div>
                        <span className="output"> {elapsed.months ? elapsed.months : "- -"} </span>
                        <span> Months </span>
                    </div>
                    <div>
                        <span className="output"> {elapsed.days ? elapsed.days : "- -" } </span>
                        <span> days </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;