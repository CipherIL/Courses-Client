export const addCourseFormInsertValueAction = (type,value,isValid,errorMessage='') => {
    return {
        type,
        payload: {
            value,
            isValid,
            errorMessage,
        }
    }
}