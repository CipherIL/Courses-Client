import React, {useContext, useEffect, useState} from "react";
import Login from "../components/custom/Login.component";
import { checkIsLoggedIn } from "../utils/isLoggedIn";

import { UserContext } from "../contexts/User.context";

const Dashboard = () => {
    const {isLoggedIn, setIsLoggedIn, isProfessor, setIsProfessor} = useContext(UserContext);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        checkIsLoggedIn()
        .then(res=>{
            if(res===400 || res===500) setIsLoggedIn(false);
            else if(res===true){
                setIsLoggedIn(true);
                setIsProfessor(true);
            }
            else{
                setIsLoggedIn(true);
                setIsProfessor(false);
            }
        })
        .catch(err=>{

        })
        setIsLoading(false);
        console.log(isLoggedIn)
    }, [setIsLoggedIn,setIsProfessor]);
    
    // You stopped here!!
    
    return(
        <div className="page-main">
            {!isLoggedIn && <Login/>} 
        </div>
    )
};

export default Dashboard;