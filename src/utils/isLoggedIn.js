import { checkValidToken } from '../server/general.request';

export const checkIsLoggedIn = async () => {
    const response = await checkValidToken();
    if(response.status === 200) return response.isProfessor;
    if(response.status === 400 || response.status === 500) return response.status;
}