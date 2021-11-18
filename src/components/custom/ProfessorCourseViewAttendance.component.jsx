import React from "react";

import AttendanceCard from "./AttendanceCard.component";

const ProfessorCourseViewAttendance = ({attendance}) => {
    const handleExpandAttendance = (e) => {
        e.target.children[1].children[0].classList.toggle('rotate')
        e.target.nextSibling.classList.toggle('show')
    }
    return (
        <div className="course-view__course-attendance-container">
            <button className="section-name-button" onClick={handleExpandAttendance}>
                <div className="course-view__section-name">Attendance</div>
                <div className="section-name-button__arrow">
                    <img src="button-arrow.png" alt="arrow" />
                </div>
            </button>
            <div className="course-view__expandable-content">
                {attendance.map(date=>{
                    return <AttendanceCard date={date} key={date._id}/>
                })}
            </div>
        </div>
    )
}

export default ProfessorCourseViewAttendance;