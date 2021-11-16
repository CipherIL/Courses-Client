const CourseCard = ({course,updateSelectedCourse}) => {

    const dateToString = (date) => {
        return new Date(date).toLocaleDateString();
    }
    

    return (
        <div className="course-card" id={course._id} onClick={updateSelectedCourse}>
            <div className="course-name">{course.name}</div>
            <div className="course-dates">{dateToString(course.startDate)} - {dateToString(course.endDate)}</div>
            <div className="course-detail"># of enrolled students: <b>{course.students.length}</b></div>
            <div className="course-detail"># of weekly windows: <b>{course.weeklyWindows.length}</b></div>
        </div>
    )
}

export default CourseCard;