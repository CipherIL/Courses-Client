import loginFormActionTypes from "../types/loginFormAction.types";

export const LOGIN_FORM_INITIAL_STATE = {
    values: {
        email: '',
        password: '',
    },
    isValid: {
        email: true,
    },
    errorMessage: {
        email: '',
    },
    isNotFullForm: true,
    formErrorMessage: '',
}

const loginFormReducer = (state,action) => {
    switch(action.type) {
        case loginFormActionTypes.CHANGE_EMAIL_STATE: {
            const { value, isValid, errorMessage } = action.payload;
            const updatedValues = {...state.values, email:value};
            const updatedValidities = {...state.isValid, email: isValid};
            const updatedErrorMessages = {...state.errorMessage, email: errorMessage};
            const updatedFormNotValid = (Object.keys(updatedValues).some(key=>
                updatedValues[key] === '')) || (Object.keys(updatedValidities).some(key=>
                    updatedValidities[key] === false));
            return {
                values: updatedValues,
                isValid: updatedValidities,
                errorMessage: updatedErrorMessages,
                isNotFullForm: updatedFormNotValid,
                formErrorMessage: "",
            };
        }
        case loginFormActionTypes.CHANGE_PASSWORD_STATE: {
            const { value } = action.payload;
            const updatedValues = {...state.values, password: value};
            const updatedFormNotValid = (Object.keys(updatedValues).some(key=>
                updatedValues[key] === '')) || (Object.keys(state.isValid).some(key=>
                    state.isValid[key] === false));
            return {
                values: updatedValues,
                isValid: state.isValid,
                errorMessage: state.errorMessage,
                isNotFullForm: updatedFormNotValid,
                formErrorMessage: '',
            };
        }
        case loginFormActionTypes.CHANGE_ERROR_MESSAGE_STATE: {
            const { value } = action.payload;
            return {
                values: state.values,
                isValid: state.isValid,
                errorMessage: state.errorMessage,
                isNotFullForm: state.isNotFullForm,
                formErrorMessage: value,
            };
        }
        default:
            return {...state};
    }
}

export default loginFormReducer;