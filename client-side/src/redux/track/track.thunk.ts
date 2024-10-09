import { User } from "../../types/user.types";
import { Track } from "../../types/Track";
import { AppThunk } from "../store";
import { addTrack as addTrackApi, deleteTrack as deleteTrackApi } from "../../services/track";
import { addTrack as addTrackAction, addStop as addStopAction, addComment as addCommentAction, deleteTrack as deleteTrackActionForTrack } from "./track.slice";
import { Login } from "../user/user.thunk";
import { Stop } from "../../types/Stop";
import { addStop as addStopApi } from "../../services/stop";
import { Comment } from "../../types/Comment";
import { deleteTrack as deleteTrackActionForUser } from "../user/user.slice";
import { addComment as addCommentApi, getCommentsByTrackId } from "../../services/comment";
export const addTrack = (track: FormData): AppThunk<Track> => async (dispatch, getState) => {

    try {
        let response = await addTrackApi(track);
        if (response.status === 401) {
            const state = getState()
            Login(state.user!.user!.mail)
            response = await addTrackApi(track);
        }
        const newTrack = response.data
        dispatch(addTrackAction(newTrack))
        return newTrack;
    } catch (error) {

        alert("failed to add")
        return null;
    }
}
export const addStop = (stop: Omit<Stop, 'id'>): AppThunk<Track> => async (dispatch, getState) => {

    try {
        let response = await addStopApi(stop);
        if (response.status === 401) {
            const state = getState()
            Login(state.user!.user!.mail)
            response = await addStopApi(stop);
        }
        const newStop = response.data
        dispatch(addStopAction(newStop))
        return newStop;
    } catch (error) {

        alert("failed to add")
        return null;
    }
}
export const addComment = (comment: Omit<Comment, 'id'>): AppThunk<Comment> => async (dispatch, getState) => {
    let response = await addCommentApi(comment) as Comment
    console.log(response)
    dispatch(addCommentAction({ trackId: response.trackId, comment: response }))
    return response

}
export const initComments = (trackId: number): AppThunk<Comment[]> => async (dispatch, getState) => {
    let response = await getCommentsByTrackId(trackId) as Comment[]
    response.forEach(value => {
        dispatch(addCommentAction({ trackId: trackId, comment: value }))
    })
    return response

}

export const deleteTrack = (trackId: number): AppThunk<void> => async (dispatch, getState) => {
    await deleteTrackApi(trackId)
    alert("delete was successfull")
    dispatch(deleteTrackActionForTrack(trackId))
    dispatch(deleteTrackActionForUser(trackId))
}
