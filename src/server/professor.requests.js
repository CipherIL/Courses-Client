import axios from "axios";

const DOMAIN  = process.env.REACT_APP_DOMAIN;
const PORT = process.env.REACT_APP_PORT;

export const getAllCourses = async () => {
    const link = `${DOMAIN}:${PORT}/course/get-courses`
    try {
        const response = await axios.get(link,{withCredentials:true});
        return response.data;
    }catch(err){
        return false;
    }
}

export const addNewCourse = async (course) => {
    const link = `${DOMAIN}:${PORT}/professor/new-course`;
    try {
        const response = await axios.post(link,{...course.values},{withCredentials:true});
        return response.data;
    }catch(err) {
        return err.response;
    }
}

export const addNewStudent = async (student) => {
    const link = `${DOMAIN}:${PORT}/professor/new-student`;
    try {
        const response = await axios.post(link,{...student.values},{withCredentials:true});
        return response.data;
    }catch(err) {
        return err.response;
    }
}