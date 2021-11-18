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