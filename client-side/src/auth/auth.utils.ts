import { PATHS } from "../routes/paths";
import { getUserByToken } from "../services/user";
import { AuthUser } from "../types/user.types";
import axios from "../utils/axios";

export const setSession = (user: AuthUser) => {
    localStorage.setItem('user', user.token)
    console.log(user.token)
    axios.defaults.headers.common.Authorization = `Bearer ${user.token}`
}

export const setAuthorizationHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const getSession = async (): Promise<AuthUser | null> => {
    const user = localStorage.getItem('user')

    let finalresponse=null;
    if (user&&user!=="undefined") {
        setAuthorizationHeader(user)
        let response = await getUserByToken();
        if (response.status === 200) {
            let myUser = response.data
            finalresponse= {token:user, user:myUser};
        }
    } else {
        return null;
    }
    return finalresponse;
}

export const removeSession = () => {
    localStorage.removeItem('user');
    axios.defaults.headers.common.Authorization = undefined;
    window.location.href = PATHS.home;
}

export function jwtDecode(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );

    return JSON.parse(jsonPayload);
}


export const isValidToken = (token: string | null) => {
    if (!token) {
        return false;
    }

    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};
