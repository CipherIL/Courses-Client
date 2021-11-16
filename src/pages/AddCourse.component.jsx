import React, { useReducer } from "react";

import addCourseFormReducer, { ADD_COURSE_FORM_INITIAL_STATE } from "../reducers/addCourseFrom.reducer";
import addCourseFormActionTypes from "../types/addCourseFormAction.types";
import { addCourseFormInsertValueAction } from "../actions/addCourseForm.actions";
import WeeklyWindow from "../components/custom/WeeklyWindow.component";
import { addNewCourse } from "../server/professor.requests";

const AddCourse = () => {
    //Reducer
    const [formState,dispatchForm] = useReducer(addCourseFormReducer,ADD_COURSE_FORM_INITIAL_STATE);
    
    const createWeeklyWindowsContent = () => {
        const content = formState.values.weeklyWindows.map(window=>
            <WeeklyWindow window={window} dispatchForm={dispatchForm} key={window.key}/> 
        )
        return content;
    }
    //Handler Functions
    const handleNameInput = (e) => {
        const name = e.target.value;
        dispatchForm(addCourseFormInsertValueAction(addCourseFormActionTypes.CHANGE_NAME_STATE,name,true));
    }
    const handleStartDateInput = (e) => {
        const startDate = new Date(e.target.value);
        if(startDate === "Invalid Date")
            dispatchForm(addCourseFormInsertValueAction(addCourseFormActionTypes.CHANGE_START_DATE_STATE,undefined,false))
        else
            dispatchForm(addCourseFormInsertValueAction(addCourseFormActionTypes.CHANGE_START_DATE_STATE,startDate.getTime(),true))
    }
    const handleEndDateInput = (e) => {
        const endDate = new Date(e.target.value);
        if(endDate === "Invalid Date")
            dispatchForm(addCourseFormInsertValueAction(addCourseFormActionTypes.CHANGE_END_DATE_STATE,undefined,false))
        else
            dispatchForm(addCourseFormInsertValueAction(addCourseFormActionTypes.CHANGE_END_DATE_STATE,endDate.getTime(),true))
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
        addNewCourse(formState)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const addWeeklyWindow = (e) => {
        e.preventDefault();
        dispatchForm(addCourseFormInsertValueAction(addCourseFormActionTypes.ADD_NEW_WEEKLY_WINDOW))
    }

    return (
        <div className="page-main">
            <div className="add-course__form-container">
                <h1 className="add-course__form-title">Add Course</h1>
                <form>
                    <div className="form-field">
                        <label>Course Name</label>
                        <input type="text" onInput={handleNameInput}/>
                    </div>
                    <div className="form-field">
                        <label>Start Date</label>
                        <input type="date" onInput={handleStartDateInput}/>
                    </div>
                    {!formState.validities.notConflictingDates &&
                    <div className="form-error">
                        <span>{formState.errorMessage.conflictingDates}</span>
                    </div>
                    }
                    <div className="form-field">
                        <label>End Date</label>
                        <input type="date" onInput={handleEndDateInput}/>
                    </div>
                    <div className="form-field expandable">
                        <span>Weekly Windows</span>
                        <div className="windows-container">
                            {createWeeklyWindowsContent()}
                            <div className="add-button__container">
                                <button className="add-button" onClick={addWeeklyWindow}>+</button>
                            </div>
                            
                        </div>
                    </div>
                    <button className="add-course__submit-button" onClick={handleSubmitForm} 
                    disabled={formState.isNotFullForm}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddCourse;