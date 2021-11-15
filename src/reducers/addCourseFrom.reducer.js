import { nanoid } from 'nanoid';
import addCourseFormActionTypes from '../types/addCourseFormAction.types';

export const ADD_COURSE_FORM_INITIAL_STATE = {
    values: {
        name: '',
        startDate: undefined,
        endDate: undefined,
        weeklyWindows: [{day:0,time:"08:30 - 09:20",key:nanoid()},],
    },
    errorMessage: {
        conflictingDates: '',
    },
    validities: {
        name: false,
        startDate: false,
        endDate: false,
        weeklyWindows: false,
        notConflictingDates: false,
    },
    isNotFullForm: true,
}

const addCourseFormReducer = (state,action) => {
    switch(action.type) {
        case addCourseFormActionTypes.CHANGE_NAME_STATE : {
            const {value, isValid} = action.payload;
            const updatedValues = {...state.values, name: value};
            const updatedValidities = {...state.validities, name: isValid};
            const updatedIsNotFullForm = Object.keys(updatedValidities)
                                      .some(key => updatedValidities[key] === false);
            return {
                values: updatedValues,
                errorMessage: state.errorMessage,
                validities: updatedValidities,
                isNotFullForm: updatedIsNotFullForm,
            }
        }
        case addCourseFormActionTypes.CHANGE_START_DATE_STATE : {
            const {value,isValid} = action.payload;
            const updatedValues = {...state.values, startDate: value};
            const updatedValidities = {...state.validities, startDate: isValid};
            const updatedErrorMessages = {...state.errorMessage};
            if(updatedValidities.startDate && updatedValidities.endDate) {
                if(updatedValues.startDate <= updatedValues.endDate){
                    updatedValidities.notConflictingDates = true;
                    updatedErrorMessages.conflictingDates = ""
                }
                else{
                    updatedValidities.notConflictingDates = false;
                    updatedErrorMessages.conflictingDates = "Start date can't be later than end date"
                }
            }
            const updatedIsNotFullForm = Object.keys(updatedValidities)
                                      .some(key => updatedValidities[key] === false);
            return {
                values: updatedValues,
                errorMessage: updatedErrorMessages,
                validities: updatedValidities,
                isNotFullForm: updatedIsNotFullForm,
            }
        }
        case addCourseFormActionTypes.CHANGE_END_DATE_STATE : {
            const {value,isValid} = action.payload;
            const updatedValues = {...state.values, endDate: value};
            const updatedValidities = {...state.validities, endDate: isValid};
            const updatedErrorMessages = {...state.errorMessage};
            if(updatedValidities.startDate && updatedValidities.endDate) {
                if(updatedValues.startDate <= updatedValues.endDate){
                    updatedValidities.notConflictingDates = true;
                    updatedErrorMessages.conflictingDates = ""
                }
                else{
                    updatedValidities.notConflictingDates = false;
                    updatedErrorMessages.conflictingDates = "Start date can't be later than end date"
                }
            }
            const updatedIsNotFullForm = Object.keys(updatedValidities)
                                      .some(key => updatedValidities[key] === false);
            return {
                values: updatedValues,
                errorMessage: updatedErrorMessages,
                validities: updatedValidities,
                isNotFullForm: updatedIsNotFullForm,
            }
        }
        case addCourseFormActionTypes.CHANGE_WEEKLY_WINDOWS_STATE : {
            const {day,time,key} = action.payload.value;
            const weeklyWindows = [...state.values.weeklyWindows];
            const windowIndex = weeklyWindows.findIndex(window=>window.key===key)
            weeklyWindows[windowIndex].day = day;
            weeklyWindows[windowIndex].time = time;
            const updatedValues = {...state.values, weeklyWindows: weeklyWindows};
            return{
                values: updatedValues,
                errorMessage: {...state.errorMessage},
                validities: {...state.validities},
                isNotFullForm: state.isNotFullForm,
            }            
        }
        case addCourseFormActionTypes.ADD_NEW_WEEKLY_WINDOW : {
            const weeklyWindows = [...state.values.weeklyWindows];
            weeklyWindows.push({day:0,time:"08:30 - 09:20",key:nanoid()});
            const updatedValues = {...state.values, weeklyWindows: weeklyWindows};
            return {
                values: updatedValues,
                errorMessage: state.errorMessage,
                validities: state.validities,
                isNotFullForm: state.isNotFullForm,
            }
        }
        case addCourseFormActionTypes.DELETE_WEEKLY_WINDOW : {
            const key = action.payload.value;
            const weeklyWindows = [...state.values.weeklyWindows];
            const windowIndex = weeklyWindows.findIndex(window=>window.key===key);
            weeklyWindows.splice(windowIndex,1);
            const updatedValues = {...state.values, weeklyWindows: weeklyWindows};
            return{
                values: updatedValues,
                errorMessage: {...state.errorMessage},
                validities: {...state.validities},
                isNotFullForm: state.isNotFullForm,
            }  
        }
        default : {
            return {...state};
        }
    }
}

export default addCourseFormReducer;