const ProfessorCourseViewWeeklyWindow = ({weeklyWindows}) => {
    const numToDay = (num) => {
        switch(num) {
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            default: return undefined;
        }
    }
    return (
        <div className="course-view__course-weekly-windows-contianer">
            {weeklyWindows.map(window=>{
                return (
                    <div className="course-view__course-weekly-window" key={window._id}>
                        <div className="course-view__course-weekly-window__day">{numToDay(window.day)}</div>
                        <div className="course-view__course-weekly-window__time">{window.time}</div>
                    </div>
                )
                
            })}
        </div>
    )
}

export default ProfessorCourseViewWeeklyWindow;