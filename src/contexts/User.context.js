import React, {createContext, useState} from "react";

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProfessor, setIsProfessor] = useState();
    return (
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, isProfessor, setIsProfessor}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;