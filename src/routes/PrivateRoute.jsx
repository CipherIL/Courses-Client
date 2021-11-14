import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import { checkValidToken } from "../server/general.request";
import { UserContext } from "../contexts/User.context";

export function PrivateRoute ({children}) {
    const {isLoggedIn} = useContext(UserContext);
    return isLoggedIn ? children: <Navigate to="/"/>
}

export function PrivateProfessorRoute ({children}) {
    const {isProfessor} = useContext(UserContext);
    return isProfessor ? children: <Navigate to="/"/>
}