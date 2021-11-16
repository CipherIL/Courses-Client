import { nanoid } from 'nanoid';

const dateToString = (date) => {
    return new Date(date).toLocaleDateString();
}

export const createCourseCard = (course) => {
    return (
        <div className="course-card" key={nanoid()}>
            <div className="course-name">{course.name}</div>
            <div className="course-dates">{dateToString(course.startDate)} - {dateToString(course.endDate)}</div>
            <div className="course-detail"># of enrolled students: <b>{course.students.length}</b></div>
            <div className="course-detail"># of weekly windows: <b>{course.weeklyWindows.length}</b></div>
        </div>
    )
}