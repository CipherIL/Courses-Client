export const addStudentFormInsertValueAction = (type,value,isValid,errorMessage="") => {
    return {
        type,
        payload : {
            value,
            isValid,
            errorMessage
        }
    }
}