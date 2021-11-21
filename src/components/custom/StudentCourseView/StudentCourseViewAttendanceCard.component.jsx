import React, { useState } from 'react';
import StudentCourseViewAttendanceCardWindow from './StudentCourseViewAttendanceCardWindow.component';
import { updateAttendanceWindow } from '../../../server/student.request';
import PageMessageModal from '../PageMessageModal.component';
const dateConvert = (dateStr) =>{
    const newDate = new Date(dateStr);
    return `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
}

const StudentCourseViewAttendanceCard = ({date,courseId}) => {
    const [dateChanges,setDateChanges] = useState([]);
    const [pageMessage,setPageMessage] = useState("");

    const handleChanges = (data) => {
        const windowIndex = dateChanges.findIndex(window => window.windowId === data.windowId);
        if(windowIndex === -1) setDateChanges([...dateChanges,data])
        else {
            const newDateChanges = [...dateChanges];
            newDateChanges.splice(windowIndex,1,data);
            setDateChanges(newDateChanges);
        }
    }

    const handleSaveChanges = (e) => {
        e.disabled = true;
        updateAttendanceWindow(courseId,date,dateChanges)
        .then(res=>{
            setPageMessage(res);
            setTimeout(()=>{
                setPageMessage("");
                e.disabled=false;
            },2000)
        })
        .catch(err=>{
            setPageMessage(err);
            setTimeout(()=>{
                setPageMessage("");
                e.disabled=false;
            },2000)
        })
    }

    return (
        <div className="attendance-card">
            {pageMessage!=="" && <PageMessageModal message={pageMessage}/>}
            <div className="attendance-card__title">
                <div className="attendance-card__title__date">{dateConvert(date.date)}</div>
                <img src="save.png" alt="save" onClick={handleSaveChanges}/>
            </div>
                
            <div className="attendance-card__content">
                {date.windows.map(window => {
                    return <StudentCourseViewAttendanceCardWindow key={window._id} window={window} 
                    courseId={courseId} date={date} handleChanges={handleChanges}/>
                })}
            </div>
        </div>
    )
}

export default StudentCourseViewAttendanceCard;