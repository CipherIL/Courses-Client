import axios from "axios";

const DOMAIN  = process.env.REACT_APP_DOMAIN;
const PORT = process.env.REACT_APP_PORT;

export const getAllCourses = async () => {
    const link = `${DOMAIN}:${PORT}/course/get-courses`;
    try {
        const response = await axios.get(link,{withCredentials:true});
        return response.data;
    }catch(err){
        return false;
    }
}

export const getAllStudents = async () => {
    const link = `${DOMAIN}:${PORT}/professor/get-all-students`;
    try {
        const response = await axios.get(link,{withCredentials:true});
        return response.data;
    }catch(err){
        return {
            status: err.response.status,
            data: err.repsonse.data,
        }
    }
}

export const addNewCourse = async (course) => {
    const link = `${DOMAIN}:${PORT}/professor/new-course`;
    try {
        const response = await axios.post(link,{...course.values},{withCredentials:true});
        return response.data;
    }catch(err) {
        return err.response.data;
    }
}

export const addNewStudent = async (student) => {
    const link = `${DOMAIN}:${PORT}/professor/new-student`;
    try {
        const response = await axios.post(link,{...student.values},{withCredentials:true});
        return response.data;
    }catch(err) {
        return err.response.data;
    }
}

export const editStudentsInCourse = async (courseId,studentsInCourse,ejectedStudents) => {
    const link = `${DOMAIN}:${PORT}/professor/edit-students/${courseId}`;
    try {
        const response = await axios.post(link,{
            courseStudents: studentsInCourse.map(student=>student._id),
            ejectedStudents: ejectedStudents.map(student=>student._id),
        },{withCredentials:true})
        return response.data;
    } catch(err) {
        return err.response.data
    }
}