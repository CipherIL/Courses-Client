import React from "react";

import EditStudentsPanel from "./EditStudentsPanel.component"

const ProfessorCourseEditEnrolledStudents = ({enrolledStudents,courseId}) => {
    const handleExpandEditStudents = (e) => {
        e.target.children[1].children[0].classList.toggle('rotate')
        e.target.nextSibling.classList.toggle('show')
    }

    return (
        <div className="course-view__edit-students__container">
            <button className="section-name-button" onClick={handleExpandEditStudents}>
                <div className="course-view__section-name">Edit Students</div>
                <div className="section-name-button__arrow">
                    <img src="button-arrow.png" alt="arrow" />
                </div>
            </button>
            <div className="course-view__expandable-content">
                <EditStudentsPanel enrolledStudents={enrolledStudents} courseId={courseId}/>
            </div>
        </div>
    )
}

export default ProfessorCourseEditEnrolledStudents;