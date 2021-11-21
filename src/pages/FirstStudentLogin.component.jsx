import React, { useState } from "react";
import { updatePassword } from "../server/student.request";

const FirstStudentLogin = () => {
    const [password,setPassword] = useState("");
    const [isValidPassword,setIsValidPassword] = useState(false);
    const [repeatPassword,setRepeatPassword] = useState("");
    const [isValidRepeatPassword,setIsValidRepeatPassword] = useState(false);
    const [passwordMessage,setPasswordMessage] = useState("");
    const [repeatPasswordMessage,setRepeatPasswordMessage] = useState("");

    const handlePasswordInput = (e) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;
        const password = e.target.value;
        setPassword(password)
        if (passwordRegex.test(password)) {
            setPasswordMessage("")
            setIsValidPassword(true);
        }
        else {
            setPasswordMessage("Invalid Password")
            setIsValidPassword(false);
        }
        if(repeatPassword === password) {
            setRepeatPasswordMessage("");
            setIsValidRepeatPassword(true);
        }
        else {
            setRepeatPasswordMessage("Not the same as password")
            setIsValidRepeatPassword(false);
        }
    }
    const handleRepeatPasswordInput = (e) => {
        const repeatPassword = e.target.value;
        setRepeatPassword(repeatPassword);
        if(repeatPassword === password) {
            setRepeatPasswordMessage("");
            setIsValidRepeatPassword(true);
        }
        else {
            setRepeatPasswordMessage("Not the same as password")
            setIsValidRepeatPassword(false);
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        updatePassword(password)
        .then(res=>{
            console.log(res);
            window.location.reload()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="page-main">
            <div className="change-password__form-container">
                <div className="change-password__form__title">Change Password</div>
                <form className="change-password__form">
                    <div className="form-field">
                        <label>Password</label>
                        <input type="password" onInput={handlePasswordInput}/>
                        {passwordMessage!=="" && <span className="form-field__message">{passwordMessage}</span>}
                    </div>
                    <div className="form-field">
                        <label>Repeat password</label>
                        <input type="password" onInput={handleRepeatPasswordInput}/>
                        {repeatPasswordMessage!=="" && <span className="form-field__message">{repeatPasswordMessage}</span>}
                    </div>
                    <button className="change-password__form__submit-button" onClick={handleFormSubmit}
                    disabled={!isValidPassword || !isValidRepeatPassword}>Submit</button>
                </form>
            </div>
            <div className="change-password__explanation-container">
                <div className="change-password__explanation__text">
                    <div className="change-password__explanation__text__paragraph">
                        This is the first time you have logged in! <br/>
                        Please change your password from the default (given by your professor) to a new one.
                    </div>
                    <div className="change-password__explanation__text__paragraph">
                        The password must be at least 7 characters : <br/>
                        - One uppercase letter <br/>
                        - One lowercase letter <br/>
                        - One number
                    </div>
                    <div className="change-password__explanation__text__paragraph">
                        After you submit you will be redirected to login again. <br />
                        Have a nice day !   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstStudentLogin;