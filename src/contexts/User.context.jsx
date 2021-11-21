import React, {createContext, useState} from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProfessor, setIsProfessor] = useState(false);
    const [isFirstLogin, setIsFirstLogin] = useState(false);
    return (
        <UserContext.Provider value={{
            isLoggedIn, setIsLoggedIn, 
            isProfessor, setIsProfessor,
            isFirstLogin,setIsFirstLogin}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;