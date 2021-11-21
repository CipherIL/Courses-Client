import axios from "axios";

const DOMAIN  = process.env.REACT_APP_DOMAIN;
const PORT = process.env.REACT_APP_PORT;


export const userLogin = async (email,password) => {
    const link = `${DOMAIN}:${PORT}/user/login`;
    try{
        const response = await axios.post(link ,{
            email,
            password
        },{withCredentials:true});
        return {
            status: response.status,
            data: response.data
        }
    }catch(err){
        if(err.response.status === 400) return {
            status: 400,
            data: "Invalid email or password, try again",
        }
        if(err.response.status === 500) return {
            status: 500,
            data: "Internal Server Error, try again later",
        }
    }
}

export const userLogout = async () => {
    const link = `${DOMAIN}:${PORT}/user/logout`;
    try{
        const response = await axios.get(link,{withCredentials:true});
        return response.data;
    }catch(err){
        return err.response;
    }
}

export const checkValidToken = async () => {
    const link = `${DOMAIN}:${PORT}/user/check-token`;
    try{
        const response = await axios.get(link,{withCredentials:true});
        if(response.status === 200) return {
            valid: true,
            isProfessor: response.data.isProfessor,
            isFirstLogin: response.data.isFirstLogin,
        }
        else return undefined;
    }catch(err){
        return {
            valid: false,
            data: err.response.status,
        }
    }
}