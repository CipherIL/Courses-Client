import ProfessorCourseViewAttendance from "./ProfessorCourseViewAttendance.component";
import ProfessorCourseViewWeeklyWindow from "./ProfessorCourseViewWeeklyWindow.component";

const ProfessorCourseView = ({course}) => {
    course = course.props.course;
    return (
        <div className="course-view__container">
            <div className="course-view__course-name">{course.name}</div>
            <div className="course-view__section-name">Weekly Windows</div>
            <ProfessorCourseViewWeeklyWindow weeklyWindows={course.weeklyWindows}/>
            <div className="course-view__section-divider"></div>
            <ProfessorCourseViewAttendance attendance={course.attendance}/>
            <div className="course-view__section-divider"></div>
        </div>
    )
}

export default ProfessorCourseView;