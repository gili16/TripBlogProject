import { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getSession, isValidToken, removeSession } from "../auth/auth.utils"
import { ENDPOINTS, baseUrl } from "../api/endpoints";
import { needToken } from "./validation.utils";

export const authRequestMiddleware = async (request: InternalAxiosRequestConfig) => {
    if (request.url !== ENDPOINTS.user.base+ENDPOINTS.user.getUserByToken&&needToken(request)) {
        const user = await getSession()
            if (!user || !isValidToken(user.token)) {
                removeSession();
                Promise.reject('Unauthorized')
            }
    }
    return request
}

export const authResponseMiddleware = (response: AxiosResponse) => {
    if (response.status === 401) {
        alert("response")
        removeSession();
        Promise.reject('Unauthorized')
    }
    return response
}