const AttendanceCard = ({date}) => {

    const dateConvert = (dateStr) =>{
        const newDate = new Date(dateStr);
        return `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
    }
    const handleExpandAttendanceWindow = (e) => {
        e.target.children[1].children[0].classList.toggle('rotate');
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
                                    {window.attended.map(attendee=>
                                        <div className="attendance-card__window__content__attendee" key={attendee._id}>{attendee}</div>
                                    )}
                                </div>
                            </div>      
                        )
                    })}
            </div>
        </div>
    )
}

export default AttendanceCard;