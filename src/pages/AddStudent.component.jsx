import React, {useReducer} from "react";
import validator from 'validator';
import addStudentFormReducer, {ADD_STUDENT_FORM_INITIAL_STATE} from "../reducers/addStudentForm.reducer";
import { addStudentFormActionTypes } from "../types/addStudentFormAction.types";
import { addStudentFormInsertValueAction } from '../actions/addStudentForm.actions';
import { addNewStudent } from "../server/professor.requests";
const AddStudent = () => {
    //Reducer
    const [formState,dispatchForm] = useReducer(addStudentFormReducer,ADD_STUDENT_FORM_INITIAL_STATE);

    //Handler Functions
    const handleNameInput = (e) => {
        const name = e.target.value;
        if(name==="")
            dispatchForm(addStudentFormInsertValueAction(addStudentFormActionTypes.CHANGE_NAME_STATE,name,false,"Name is required"));
        else
            dispatchForm(addStudentFormInsertValueAction(addStudentFormActionTypes.CHANGE_NAME_STATE,name,true));
    }
    const handleEmailInput = (e) => {
        const email = e.target.value;
        if(validator.isEmail(email))
            dispatchForm(addStudentFormInsertValueAction(addStudentFormActionTypes.CHANGE_EMAIL_STATE,email,true));
        else
            dispatchForm(addStudentFormInsertValueAction(addStudentFormActionTypes.CHANGE_EMAIL_STATE,email,false,"Invalid Email"));
    }
    const handleAddressInput = (e) => {
        const address = e.target.value;
        if(address==="")
            dispatchForm(addStudentFormInsertValueAction(addStudentFormActionTypes.CHANGE_ADDRESS_STATE,address,false,"Address is required"));
        else
            dispatchForm(addStudentFormInsertValueAction(addStudentFormActionTypes.CHANGE_ADDRESS_STATE,address,true));
    }
    const handlePhoneInput = (e) => {
        const phone = e.target.value;
        if(validator.isMobilePhone(phone) && phone.length === 10)
            dispatchForm(addStudentFormInsertValueAction(addStudentFormActionTypes.CHANGE_PHONE_STATE,phone,true))
        else
            dispatchForm(addStudentFormInsertValueAction(addStudentFormActionTypes.CHANGE_PHONE_STATE,phone,false,"Invalid phone number"));
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        addNewStudent(formState)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="page-main add-student">
            <div className="add-student__form-container">
                <h1 className="add-student__form-title">Add Student</h1>
                <form className="add-student__form">
                    <div className="form-field">
                        <label>Name</label>
                        <input type="text" onInput={handleNameInput}/>
                    </div>
                    {!formState.isValid.name && <div className="form-error">{formState.errorMessages.name}</div>}
                    <div className="form-field">
                        <label>Email</label>
                        <input type="text" onInput={handleEmailInput}/>
                    </div>
                    {!formState.isValid.email && <div className="form-error">{formState.errorMessages.email}</div>}
                    <div className="form-field">
                        <label>Address</label>
                        <input type="text" onInput={handleAddressInput}/>
                    </div>
                    {!formState.isValid.address && <div className="form-error">{formState.errorMessages.address}</div>}
                    <div className="form-field">
                        <label>Phone Number</label>
                        <input type="text" onInput={handlePhoneInput}/>
                    </div>
                    {!formState.isValid.phone && <div className="form-error">{formState.errorMessages.phone}</div>}
                    <button className="form-submit-button" onClick={handleFormSubmit} disabled={formState.isNotFullForm}>Submit</button>
                    {formState.formMessage!=="" && <div className="form-message">{formState.formMessage}</div>}
                </form>
            </div>
            <div className="add-student__password-notice__container">
                <h1 className="add-student__password-notice__title">Important</h1>
                <div className="add-student__password-notice__text">
                    Do not forget to inform students that on first login they will be prompted to change password
                    <br /> <br />
                    The default password is 'aA12345'
                </div>
            </div>
        </div>
    )
}

export default AddStudent;