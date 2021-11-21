import React, { useState, useEffect } from 'react';

const StudentCourseViewAttendanceCardWindow = ({window,courseId,date,handleChanges}) => {
    const [attended,setAttended] = useState();
    const [reason,setReason] = useState("");

    const handleAttendanceInput = (isAttended) => {
        setAttended(isAttended);
        handleChanges({
            windowId:window._id,
            attended: isAttended,
            reason,
        })
    }
    const handleReasonInput = (e) => {
        const reasonInput = e.target.value;
        setReason(reasonInput);
        handleChanges({
            windowId:window._id,
            attended,
            reason: reasonInput,
        })
    }

    useEffect(()=>{
        //If info about attendance exists
        if(window.attended.length > 0 || window.notAttended.length > 0){
            setAttended(window.attended.length > 0);
            if(window.notAttended.length > 0){
                setReason(window.notAttended[0].reason);
            }
        }
    },[])

    return (
        <div className="attendance-card__window__conatiner">
            <div className="attendance-card__window__title">
                <div className="attendance-card__window__time">{window.time}</div>
            </div>
            <form>
                <div className="form-field" onClick={()=>{handleAttendanceInput(true)}}>
                    <input type="radio" name="attendance" checked={attended===true} readOnly/>
                    <label>Attended</label>
                </div>
                <div className="form-field" onClick={()=>{handleAttendanceInput(false)}}>
                    <input type="radio" name="attendance" checked={attended===false} readOnly/>
                    <label>Didn't attend</label>
                </div>
                {attended===false && 
                    <div className="form-field text">
                        <label>Reason:</label>
                        <input type="text" onChange={handleReasonInput} value={reason}/>
                    </div>
                }
            </form>
        </div>
    )
}

export default StudentCourseViewAttendanceCardWindow;