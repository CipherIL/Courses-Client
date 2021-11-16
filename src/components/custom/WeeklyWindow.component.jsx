import {nanoid} from 'nanoid';
import { useEffect, useState } from 'react';
import { addCourseFormInsertValueAction } from '../../actions/addCourseForm.actions';
import addCourseFormActionTypes from '../../types/addCourseFormAction.types';

const WeeklyWindow = ({window,dispatchForm}) => {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
    let times = ['08:30 - 09:20','09:30 - 10:20','10:30 - 11:20','11:30 - 12:20','12:50 - 13:40','13:50 - 14:40',
                    '14:50 - 15:40','15:50 - 16:40','16:50 - 17:40','17:50 - 18:40','18:50 - 19:40','19:50 - 20:40'];
    const [dayState,setDayState] = useState(0);
    const [timeState,setTimeState] = useState("08:30 - 09:20");
    const convertDayToNum = (dayStr) => {
        switch(dayStr) {
            case "Sunday" : return 0;
            case "Monday" : return 1;
            case "Tuesday" : return 2;
            case "Wednesday" : return 3;
            case "Thursday" : return 4;
            case "Friday" : return 5;
            default : return undefined;
        }
    }
    const handleWeeklyWindowDayInput = (e) => {
        const day = parseInt(e.target.value);
        setDayState(day);    
    }
    const handleWeeklyWindowTimeInput = (e) => {
        const time = e.target.value;
        setTimeState(time);
    }
    const handleDeleteWindow = (e) => {
        e.preventDefault();
        dispatchForm(addCourseFormInsertValueAction(addCourseFormActionTypes.DELETE_WEEKLY_WINDOW,window.key));
    }
    useEffect(()=>{
        dispatchForm(addCourseFormInsertValueAction(addCourseFormActionTypes.CHANGE_WEEKLY_WINDOWS_STATE,
            {day:dayState,time:timeState,key:window.key}))
    },[dayState,timeState])

    return (
        <div className="window-container">
            <div className="window__day">
                <label>Day :</label>
                <select name="day" value={dayState} onChange={handleWeeklyWindowDayInput}>
                    {days.map(day=>{
                        return (
                            <option value={convertDayToNum(day)} key={nanoid()}>{day}</option>
                        )
                    })}
                </select>
            </div>
            <div className="window__time">
                <label>Time :</label>
                <select name="time" value={timeState} onChange={handleWeeklyWindowTimeInput}>
                    {times.map(time=>{
                        return(
                            <option value={time} key={nanoid()}>{time}</option>
                        ) 
                    })}
                </select>
            </div>
            <div className="delete-window-button__container">
                <button className="delete-window-button" onClick={handleDeleteWindow}>X</button>
            </div>
        </div>
    )
}

export default WeeklyWindow;