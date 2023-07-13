import React, { useState } from "react";
import "./app.css";
import iconArrow from "./assets/images/icon-arrow.svg";


const App = () => {

    const [elapsed, setElapsed] = useState<{days: number | undefined, months: number | undefined, years: number | undefined}>({
        days: undefined,
        months: undefined,
        years: undefined
    });

    const handleFormSubmission = (e: any) => {
        // console.log(e);
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(formData); // converts formData to plain text in object format
        const {day, month, year} = Object.fromEntries(formData);

        let elapsedYears = 0;
        let elapsedMonths = 0;
        let elapsedDays = 0;

        const start = new Date(`${year}-${month}-${day}`);
        const end = new Date();
        
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        
        const differenceInTime = end.getTime() - start.getTime(); // Difference in milliseconds
        let differenceInDays = Math.floor(differenceInTime / millisecondsPerDay); // Difference in days
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
                    <div className="form-input-field">
                        <label htmlFor="day">DAY</label>
                        <input name="day" type="number" placeholder="DD" />
                    </div>
                    <div className="form-input-field">
                        <label htmlFor="month">MONTH</label>
                        <input name="month" type="number" placeholder="MM" />
                    </div>
                    <div className="form-input-field">
                        <label htmlFor="year">YEAR</label>
                        <input name="year" type="number" placeholder="YYYY" />
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