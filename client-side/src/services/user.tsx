import axios from '../utils/axios'
import { User } from "../types/user.types"
import originalAxios from 'axios'
import { Track } from '../types/Track'
import { ENDPOINTS } from '../api/endpoints'

export const getUsers = async () => {
    const response = await axios.get(`${ENDPOINTS.user.base}${ENDPOINTS.user.getAll}`)
    const users =  response.data
    return users
}
export const getUserByToken = async () => {
    const response = await axios.get(`${ENDPOINTS.user.base}${ENDPOINTS.user.getUserByToken}`);
    return response
}

export const getUser = async (id: number) => {
    const response = await axios.get(`${ENDPOINTS.user.base}${ENDPOINTS.user.getById}${id}`)
    const user = response.data
    return user
}

export const addUser = async (user: FormData) => {
    const response = await axios.post(`${ENDPOINTS.user.base}${ENDPOINTS.user.add}`, user, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    // alert(response)
    const newUser = response.data
    return newUser
}

export const updateUser = async (id: number, user: FormData) => {
    const response = await axios.put(`${ENDPOINTS.user.base}${ENDPOINTS.user.update}${id}`, user, {
        headers: {
            "Content-Type": 'multipart/form-data',
        }
    });
    const updatedUser = response.data
    return updatedUser
}
export const addFavorite = async (id: number, favorite: Track) => {
    const response = await axios.put(`${ENDPOINTS.user.base}${ENDPOINTS.user.addFavorite}${id}`, favorite, {
        headers: {
            "Content-Type": 'application/json',
        }
    });
    const updatedUser = response.data
    return updatedUser
}
export const deleteFavorite = async (id: number, favorite: Track) => {
    const response = await axios.put(`${ENDPOINTS.user.base}${ENDPOINTS.user.deleteFavorite}${id}`, favorite, {
        headers: {
            "Content-Type": 'application/json',
        }
    });
    const updatedUser = response.data
    return updatedUser
}
export const deleteUser = async (id: number) => {
    const response = await axios.delete(`${ENDPOINTS.user.base}${ENDPOINTS.user.delete}${id}`)
    return response
}

export const Login = async (mail: string) => {
    const response = await axios.post(`${ENDPOINTS.user.base}${ENDPOINTS.user.login}${mail}`)
    return response.data
}