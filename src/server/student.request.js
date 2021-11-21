import axios from "axios";

const DOMAIN  = process.env.REACT_APP_DOMAIN;
const PORT = process.env.REACT_APP_PORT;

export const getStudentCourses = async () => {
    const link = `${DOMAIN}:${PORT}/course/get-student-courses`;
    try {
        const response = await axios.get(link,{withCredentials:true});
        return response.data;
    } catch(err) {
        return err.data;
    }
}

export const getStudentCourseAttendance = async (courseId) => {
    const link = `${DOMAIN}:${PORT}/course/get-student-course-attendance/${courseId}`;
    try {
        const response = await axios.get(link,{withCredentials:true});
        console.log(response.data)
        return response.data;
    } catch(err) {
        return err.data;
    }
}

export const updateAttendanceWindow = async (courseId,date,windows) => {
    const link = `${DOMAIN}:${PORT}/course/edit-student-course-attendance/${courseId}`;
    try {
        const response = await axios.patch(link,{date,windows},{withCredentials:true});
        return response.data;
    } catch(err) {
        return err.response.data;
    }
}

export const updatePassword = async (password) => {
    const link = `${DOMAIN}:${PORT}/student/update-password`;
    try {
        const response = await axios.patch(link,{password},{withCredentials:true})
        return response.data;
    } catch(err) {
        return err.response;
    }   
}