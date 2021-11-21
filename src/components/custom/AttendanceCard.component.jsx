import React from "react"

const AttendanceCard = ({date}) => {

    const dateConvert = (dateStr) =>{
        const newDate = new Date(dateStr);
        return `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
    }
    const handleExpandAttendanceWindow = (e) => {
        e.target.children[1].children[0].classList.toggle('rotate');
        e.target.nextSibling.classList.toggle('show');
    }

    return (
        <div className="attendance-card__container">
            <div className="attendance-card__title">{dateConvert(date.date)}</div>
            <div className="attendance-card__windows-container">
                    {date.windows.map(window=>{
                        return (
                            <div className="attendance-card__window" key={window._id}>
                                <button className="attendance-card__window__button" onClick={handleExpandAttendanceWindow}>
                                    <div className="attendance-card__window__button__title">{window.time}</div>
                                    <div className="attendance-card__window__button__arrow">
                                        <img src="button-arrow.png" alt="arrow" />
                                    </div>
                                </button>
                                <div className="attendance-card__window__content">
                                    <div className="attendance-card__window__attended-list">
                                        <div className="attendance-card__window__attended-list__title">Attended</div>
                                        {window.attended.map(student=>
                                            <div className="attendance-card__window__content__attendee" key={student.studentId}>{student.studentName}</div>
                                        )}
                                    </div>
                                    <div className="attendance-card__window__absent-list">
                                        <div className="attendance-card__window__absent-list__title">Didn't attend</div>
                                        {window.notAttended.map(student=>
                                            <div className="attendance-card__window__content__attendee" key={student.studentId}>{student.studentName}: {student.reason}</div>
                                        )}
                                    </div>
                                </div>
                            </div>      
                        )
                    })}
            </div>
        </div>
    )
}

export default AttendanceCard;