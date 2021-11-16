import React, {useContext, useEffect, useState} from "react";

import CourseCard  from "../components/custom/CourseCard.component";
import ProfessorCourseView from "../components/custom/ProfessorCourseView.component";
import { UserContext } from "../contexts/User.context";
import { getAllCourses } from "../server/professor.requests";

const Dashboard = () => {
    const {isProfessor} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [selectedCourse,setSelectedCourse] = useState();

    const updateSelectedCourse = (e) => {
        setSelectedCourse(e.target.id)
    }

    useEffect(()=>{
        if(isProfessor) {
            getAllCourses()
            .then(res=>{
                setCourses(res.map(course=><CourseCard key={course._id} course={course} updateSelectedCourse={updateSelectedCourse}/>));
                setIsLoading(false);
            })
        }
        else {

        }
    },[isProfessor])
    
    return(
        <div className="page-main dashboard">
            {isLoading && 
            <div className="dashboard-loader-container">
                <div className="dashboard-loader"></div>
            </div> 
            }
            {courses.length > 0 && selectedCourse === undefined &&
            <div className="course-cards__container">
                {courses}
            </div>
            }
            {isProfessor && selectedCourse !== undefined &&
                <ProfessorCourseView course={courses.find(course=>course.key===selectedCourse)}/>
            }
        </div>
    )
};

export default Dashboard;