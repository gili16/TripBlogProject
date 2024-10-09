import axios from '../utils/axios'
import { Comment} from "../types/Comment"
import { ENDPOINTS } from '../api/endpoints'

export const getComments = async () => {
    const response = await axios.get(`${ENDPOINTS.comment.base}${ENDPOINTS.comment.getAll}`)
    const comments =  response.data
    return comments
}

export const getCommentsByTrackId = async (trackId:number) => {
    const response = await axios.get(`${ENDPOINTS.comment.base}${ENDPOINTS.comment.getByTrackId}${trackId}`)
    const comments =  response.data
    return comments
}


export const addComment= async (comment: Omit<Comment, 'id'>) => {
    const response = await axios.post(`${ENDPOINTS.comment.base}${ENDPOINTS.comment.add}`, comment)
    const newComment = response.data
    return newComment
}

export const updateComment = async (comment: Comment) => {
    const response = await axios.put(`${ENDPOINTS.comment.base}${ENDPOINTS.comment.update}${comment.id}`, comment)
    const updatedComment = response.data
    return updatedComment
}

export const deleteComment = async (id: number) => {
    const response = await axios.delete(`${ENDPOINTS.comment.base}${ENDPOINTS.comment.delete}${id}`)
    return response
}