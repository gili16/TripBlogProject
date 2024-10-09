import axios from '../utils/axios'
import { Track} from "../types/Track"
import { ENDPOINTS } from '../api/endpoints'

export const getTracks = async () => {
    const response = await axios.get(`${ENDPOINTS.track.base}${ENDPOINTS.track.getAll}`)
    const tracks = response.data
    return tracks
}
export const getTrackById = async (id:number) => {
    const response = await axios.get(`${ENDPOINTS.track.base}${ENDPOINTS.track.getById}${id}`)
    const tracks =  response.data
    return tracks
}
export const getTrackByArea = async (area:string) => {
    const response = await axios.get(`${ENDPOINTS.track.base}${ENDPOINTS.track.getTracksByArea}${area}`)
    const tracks =  response.data
    return tracks
}
export const getTrackByOption = async (option:string) => {
    const response = await axios.get(`${ENDPOINTS.track.base}${ENDPOINTS.track.getTracksByOption}${option}`)
    const tracks =  response.data
    return tracks
}
export const getMyTracks=async(id:number)=>{
    const response=await axios.get(`${ENDPOINTS.track.base}${ENDPOINTS.track.getMyTracks}${id}`);
    return response;
}
export const getTrackByText = async (text:string) => {
    const response = await axios.get(`${ENDPOINTS.track.base}${ENDPOINTS.track.getTracksByText}${text}`)
    const tracks =  response.data
    return tracks
}
export const addTrack= async (track: FormData) => {
    const response = await axios.post(`${ENDPOINTS.track.base}${ENDPOINTS.track.add}`, track)
    return response
}

export const updateTrack = async (id:number,track: FormData) => {
    const response = await axios.put(`${ENDPOINTS.track.base}${ENDPOINTS.track.update}${id}`, track)
    const updatedTrack = response.data
    return updatedTrack
}

export const deleteTrack = async (id: number) => {
    const response = await axios.delete(`${ENDPOINTS.track.base}${ENDPOINTS.track.delete}${id}`)
    return response
}