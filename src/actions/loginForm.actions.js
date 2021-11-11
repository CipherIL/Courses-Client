export const loginFormInsertValueAction = (type,value,isValid,errorMessage) => ({
    type,
    payload: {
        value,
        isValid,
        errorMessage,
    }
});