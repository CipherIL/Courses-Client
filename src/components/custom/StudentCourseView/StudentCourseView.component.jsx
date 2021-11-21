import React, { useEffect, useState } from "react"
import { getStudentCourseAttendance } from "../../../server/student.request";
import StudentCourseViewAttendanceCard from "./StudentCourseViewAttendanceCard.component";

const StudentCourseView = ({course}) => {
    course = course.props.course;
    const [dates,setDates] = useState([]);

    useEffect(()=>{
        getStudentCourseAttendance(course._id)
        .then(res=>{
            if(res!==[])
                setDates(res);
        })
        .catch(err=>{
            console.log(err);
        })
    },[course._id])

    const handleExpandAttendance = (e) => {
        e.target.children[1].children[0].classList.toggle('rotate');
        e.target.nextSibling.classList.toggle('show');
    }

    return (
        <div className="course-view__container">
            <div className="course-view__course-name">{course.name}</div>
            <button className="section-name-button" onClick={handleExpandAttendance}>
                <div className="course-view__section-name">Edit Attendance</div>
                <div className="section-name-button__arrow">
                    <img src="button-arrow.png" alt="arrow" />
                </div>
            </button>
            <div className="course-view__expandable-content">
                <div className="attendance-cards__container">
                    {dates.map(date => {
                        return <StudentCourseViewAttendanceCard key={date._id} date={date} courseId={course._id}/>
                    })}
                </div>
            </div> 
        </div>
    )
}

export default StudentCourseView;