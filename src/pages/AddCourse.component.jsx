import React from "react";
import {nanoid} from 'nanoid';

const createWeeklyWindowsContent = () => {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
    const content = days.map(day=>{
        return (
            <div className="day-container" key={nanoid()}>
                <div className="day-button">{day}</div>
                <div className="day-options-container">
                    <input type="checkbox" /> 08:30 - 09:20
                </div>
            </div>
        )
    })
    return content;
}

const AddCourse = () => {
    return (
        <div className="page-main">
            <div className="add-course__form-container">
                <h1 className="add-course__form-title">Add Course</h1>
                <form>
                    <div className="form-field">
                        <label>Course Name</label>
                        <input type="text" />
                    </div>
                    <div className="form-field">
                        <label>Start Date</label>
                        <input type="date" />
                    </div>
                    <div className="form-field">
                        <label>End Date</label>
                        <input type="date" />
                    </div>
                    <div className="form-field expandable">
                        <span>Weekly Windows</span>
                        <div className="windows-container">
                            {createWeeklyWindowsContent()}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCourse;