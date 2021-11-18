import React, { useEffect, useState } from "react"
import { editStudentsInCourse, getAllStudents } from "../../server/professor.requests";

const EditStudentsPanel = ({enrolledStudents,courseId}) => {
    const [studentsInCourse,setStudentsInCourse] = useState([]);
    const [studentsNotInCourse,setStudentsNotInCourse] = useState([]);
    const [selectedStudentsToAdd,setSelectedStudentsToAdd] = useState([]);
    const [selectedStudentsToRemove,setSelectedStudentsToRemove] = useState([]);
    const [rejectedStudents,setRejectedStudents] = useState([]);

    useEffect(()=>{
        getAllStudents()
        .then(res=>{
            console.log(enrolledStudents);
            console.log(res)
            const newStudentsInCourse = [];
            enrolledStudents.forEach(enrolledStudent=>{
                const studentIndex = res.findIndex(student=>student._id === enrolledStudent.studentId)
                newStudentsInCourse.push(res.splice(studentIndex,1)[0]);
            })
            setStudentsInCourse(newStudentsInCourse);
            setStudentsNotInCourse(res);
        })
        .catch(err=>{
            console.log(err)
        })
    },[enrolledStudents])

    const handleStudentToAdd = (student) => {
        //add/remove in students to add list
        let studentIndex = selectedStudentsToAdd.findIndex(selectedStudent => selectedStudent._id === student._id);
        if(studentIndex === -1) setSelectedStudentsToAdd([...selectedStudentsToAdd,student]);
        else setSelectedStudentsToAdd(selectedStudentsToAdd.filter(selectedStudent => selectedStudent._id !== student._id));
    }

    const handleStudentToRemove = (student) => {
        //add to list of remove
        const studentIndex = selectedStudentsToRemove.findIndex(selectedStudent => selectedStudent._id === student._id);
        if(studentIndex === -1) setSelectedStudentsToRemove([...selectedStudentsToRemove,student]);
        else setSelectedStudentsToRemove(selectedStudentsToRemove.filter(selectedStudent => selectedStudent._id !== student._id));
    }

    const handleRemoveStudents = () => {
        //add to rejected list
        setRejectedStudents([...rejectedStudents,...selectedStudentsToRemove]);
        //move to not enrolled students list
        setStudentsNotInCourse([...studentsNotInCourse,...selectedStudentsToRemove]);
        //remove from enrolled students list
        setStudentsInCourse(studentsInCourse.filter(id=>{
            for(let studentId of selectedStudentsToRemove) 
                if(id === studentId) return false;
            return true;
        }))
        setSelectedStudentsToRemove([]);
    }
    
    const handleAddStudents = () => {
        //add to enrolled students list
        setStudentsInCourse([...studentsInCourse,...selectedStudentsToAdd]);
        //remove from not enrolled students list
        setStudentsNotInCourse(studentsNotInCourse.filter(student=>{
            for(let selectedStudent of selectedStudentsToAdd)
                if(selectedStudent._id === student._id) return false;
            return true;
        }))
        //remove from rejected list if rejected before
        setRejectedStudents(rejectedStudents.filter(student=>{
            for(let selectedStudent of selectedStudentsToAdd)
                if(selectedStudent._id === student._id) return false;
            return true;
        }))
        setSelectedStudentsToAdd([]);
    }

    const handleSaveChanges = () => {
        editStudentsInCourse(courseId,studentsInCourse,rejectedStudents)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
    }


    return (
        <div className="edit-students-panel">
            <div className="panel__section">
                <div className="panel__section__title">Enrolled Students</div>
                <div className="panel__section__content">
                    {studentsInCourse.map(student=>{
                        let cn = "student-name";
                        for(let selectedStudent of selectedStudentsToRemove) {
                            if(selectedStudent._id === student._id) cn += " selected";
                        }
                        return(
                            <div className={cn} key={student._id}
                            onClick={()=>{handleStudentToRemove(student)}}>{student.name}</div>
                        )
                    })}
                </div>
            </div>
            <div className="panel__section buttons">
                <div className="panel__section__content buttons">
                    <div className="insert arrow" onClick={handleAddStudents}>
                        <img src="arrow.png" alt="arrow" />
                    </div>
                    <div className="remove arrow" onClick={handleRemoveStudents}>
                        <img src="arrow.png" alt="arrow" />
                    </div>
                    <div className="save" onClick={handleSaveChanges}>
                        <img src="save.png" alt="save" />
                    </div>
                </div>
            </div>
            <div className="panel__section">
                <div className="panel__section__title">Not Enrolled Students</div>
                <div className="panel__section__content">
                    {studentsNotInCourse.map(student=>{
                        let cn = "student-name";
                        for(let selectedStudent of selectedStudentsToAdd) {
                            if(selectedStudent._id === student._id) cn += " selected";
                        }
                        return(
                            <div className={cn} key={student._id} id={student._id}
                            onClick={()=>{handleStudentToAdd(student)}}>{student.name}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default EditStudentsPanel;