import React, { useReducer, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import validator from "validator";

import loginFormReducer, {LOGIN_FORM_INITIAL_STATE} from "../reducers/loginForm.reducer";
import {loginFormInsertValueAction} from '../actions/loginForm.actions';
import loginFormActionTypes from "../types/loginFormAction.types";
import { checkValidToken, userLogin } from "../server/general.request";
import { UserContext } from "../contexts/User.context";

//Component
const Login = () => {
    //Reducer
    const [formState,dispatchForm] = useReducer(loginFormReducer,LOGIN_FORM_INITIAL_STATE);
    //Context
    const {isLoggedIn,setIsLoggedIn, setIsProfessor} = useContext(UserContext);
    //Loader State
    const [isLoading,setIsLoading] = useState(true);

    //Functions
    const emailOnBlur = (e) => {
        const email = e.target.value;
        if(validator.isEmail(email))
            dispatchForm(loginFormInsertValueAction(loginFormActionTypes.CHANGE_EMAIL_STATE,email,true));
        else
            dispatchForm(loginFormInsertValueAction(loginFormActionTypes.CHANGE_EMAIL_STATE,email,false,"Invalid Email"));
    }
    const passwordOnBlur = (e) => {
        const password = e.target.value;
        dispatchForm(loginFormInsertValueAction(loginFormActionTypes.CHANGE_PASSWORD_STATE,password));            
    }
    const submitLogin = async (e) => {
        const response = await userLogin(formState.values.email,formState.values.password);
        if(response.status === 400 || response.status === 500)
            dispatchForm(loginFormInsertValueAction(loginFormActionTypes.CHANGE_ERROR_MESSAGE_STATE,response.data));
        else{
            setIsLoggedIn(true);
            setIsProfessor(response.data);
        }
    }

    useEffect(()=>{
        checkValidToken()
        .then(res=>{
            if(res.valid){
                setTimeout(()=>{
                    setIsLoggedIn(true);
                    setIsProfessor(res.isProfessor);
                },1000)
            }
            else{
                setTimeout(()=>{
                    setIsLoading(false);
                },1000)        
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    return (
        isLoggedIn ? <Navigate to="/dashboard"/> :
        <div>
            {isLoading && 
            <div className="loader-container">
                <div className="loader"></div>
            </div> 
            }
            <div className="page-main">    
            <div className="login__container">
            <div className="login-form__container">
                <div className="login-form__form__container">
                    <form className="login-form__form">
                        <div className="form-field">
                            <label className="form-field__label">Email</label>
                            <input type="text" className="form-field__input" placeholder="Email" onBlur={emailOnBlur}/>
                        </div>
                        {!formState.isValid.email && <div className="error-message">{formState.errorMessage.email}</div>}
                        <div className="form-field">
                            <label className="form-field__label">Password</label>
                            <input type="text" className="form-field__input" placeholder="Password" onBlur={passwordOnBlur}/>
                        </div>
                        { formState.formErrorMessage !== '' && <div className="error-message">{formState.formErrorMessage}</div>}
                    </form>
                    <button className="login-form__button" onClick={submitLogin} 
                            disabled={formState.isNotFullForm || formState.formErrorMessage!==''}>Login</button>
                </div>
            </div>
            </div>
            </div>
        </div>
        
    )
}

export default Login;