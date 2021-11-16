import React, {useContext, useEffect, useState} from "react";
import { UserContext } from "../contexts/User.context";
import { getAllCourses } from "../server/professor.requests";
import { createCourseCard } from "../utils/createCourseCard";

const Dashboard = () => {
    const {isProfessor} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    useEffect(()=>{
        if(isProfessor) {
            getAllCourses()
            .then(res=>{
                setCourses(res.map(course=>createCourseCard(course)));
                setIsLoading(false);
            })
        }
        else {

        }
    },[])
    
    return(
        <div className="page-main dashboard">
            {isLoading && 
            <div className="dashboard-loader-container">
                <div className="dashboard-loader"></div>
            </div> 
            }
            {courses.length > 0 && 
            <div className="course-cards__container">
                {courses}
            </div>
            }
        </div>
    )
};

export default Dashboard;