import {addStudentFormActionTypes} from '../types/addStudentFormAction.types';

export const ADD_STUDENT_FORM_INITIAL_STATE = {
    values: {
        name: "",
        email: "",
        address: "",
        phone: "",
    },
    isValid: {
        name: true,
        email: true,
        address: true,
        phone: true,
    },
    errorMessages: {
        name: "",
        email: "",
        address: "",
        phone: "",
    },
    isNotFullForm: true,
    formMessage: "",
}

const checkExistsEmptyField = (values) => {
    for(let key of Object.keys(values)) {
        if(values[key]==="") return true;
    }
    return false;
}

const checkExistsInvalidField = (values) => {
    for(let key of Object.keys(values)){
        if(values[key]===false) return true;
    }
    return false;
}

const addStudentFormReducer = (state,action) => {
    switch(action.type) {
        case addStudentFormActionTypes.CHANGE_NAME_STATE : {
            const {value,isValid,errorMessage} = action.payload;
            const updatedValues = {...state.values, name: value};
            const updatedValidities = {...state.isValid, name: isValid};
            const updatedErrorMessages = {...state.errorMessages, name: errorMessage};
            const updatedIsNotFullForm = (checkExistsInvalidField(updatedValidities)||checkExistsEmptyField(updatedValues));
            return {
                values: updatedValues,
                isValid: updatedValidities,
                errorMessages: updatedErrorMessages,
                isNotFullForm: updatedIsNotFullForm,
            }
        }
        case addStudentFormActionTypes.CHANGE_EMAIL_STATE : {
            const {value,isValid,errorMessage} = action.payload;
            const updatedValues = {...state.values, email: value};
            const updatedValidities = {...state.isValid, email: isValid};
            const updatedErrorMessages = {...state.errorMessages, email: errorMessage};
            const updatedIsNotFullForm = (checkExistsEmptyField(updatedValues) || checkExistsInvalidField(updatedValidities));
            return {
                values: updatedValues,
                isValid: updatedValidities,
                errorMessages: updatedErrorMessages,
                isNotFullForm: updatedIsNotFullForm,
            }
        }
        case addStudentFormActionTypes.CHANGE_ADDRESS_STATE : {
            const {value,isValid,errorMessage} = action.payload;
            const updatedValues = {...state.values, address: value};
            const updatedValidities = {...state.isValid, address: isValid};
            const updatedErrorMessages = {...state.errorMessages, address: errorMessage};
            const updatedIsNotFullForm = (checkExistsEmptyField(updatedValues) || checkExistsInvalidField(updatedValidities));
            return {
                values: updatedValues,
                isValid: updatedValidities,
                errorMessages: updatedErrorMessages,
                isNotFullForm: updatedIsNotFullForm,
            }
        }
        case addStudentFormActionTypes.CHANGE_PHONE_STATE : {
            const {value,isValid,errorMessage} = action.payload;
            const updatedValues = {...state.values, phone: value};
            const updatedValidities = {...state.isValid, phone: isValid};
            const updatedErrorMessages = {...state.errorMessages, phone: errorMessage};
            const updatedIsNotFullForm = (checkExistsEmptyField(updatedValues) || checkExistsInvalidField(updatedValidities));
            return {
                values: updatedValues,
                isValid: updatedValidities,
                errorMessages: updatedErrorMessages,
                isNotFullForm: updatedIsNotFullForm,
            }
        }
        default : return {...state};
    }
}

export default addStudentFormReducer;