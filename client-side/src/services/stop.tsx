import axios from '../utils/axios'
import { Stop} from "../types/Stop"
import { ENDPOINTS } from '../api/endpoints'

export const getStops = async () => {
    const response = await axios.get(`${ENDPOINTS.stop.base}${ENDPOINTS.stop.getAll}`)
    const stops =  response.data
    
    return stops
}

export const addStop= async (stop: Omit<Stop, 'id'>) => {
    const response = await axios.post(`${ENDPOINTS.stop.base}${ENDPOINTS.stop.add}`, stop)
    return response
}

export const updateStop = async (stop: Stop) => {
    const response = await axios.put(`${ENDPOINTS.stop.base}${ENDPOINTS.stop.update}${stop.id}`, stop)
    const updatedStop = response.data
    return updatedStop
}

export const deleteStop = async (id: number) => {
    const response = await axios.delete(`${ENDPOINTS.stop.base}${ENDPOINTS.stop.delete}${id}`)
    return response
}