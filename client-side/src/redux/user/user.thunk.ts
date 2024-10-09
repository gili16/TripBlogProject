import { AuthUser, User } from "../../types/user.types";
import { addUser as addUserApi, deleteFavorite as deleteFavoriteApi, addFavorite as addFavoriteApi, getUser } from '../../services/user'
import { AppThunk } from "../store";
import { addUser as addUserAction, logoutUser as logoutUserAction, setUser } from './user.slice'
import { getUserByToken as getUserApi, Login as LoginApi,updateUser as updateUserApi } from "../../services/user";
import { removeSession, setSession } from "../../auth/auth.utils";
import { Track } from "../../types/Track";
import { updateTrack } from "../track/track.slice";
import {updateUser as updateUserAction, deleteFavorite as deleteFavoriteAction, addFavorite as addFavoriteAction, deleteTrack as deleteTrackAction, addTrack as addTrackAction } from "./user.slice";
export const addUser = (user: FormData): AppThunk<User> => async (dispatch, getState) => {

    // const state = getState()// אם רוצים לקבל מידע מהרידקס כדי לשלוח לקריאת שרת
    try {
        const newUser = await addUserApi(user)
        dispatch(addUserAction(newUser))
        const response = await LoginApi(newUser.mail)
        dispatch(setUser(response.user))
        setSession(response)
        return newUser
    } catch (error) {

        // alert("error: "+error)
    }
}

export const Login = (mail: string): AppThunk<AuthUser | null> => async (dispatch, getState) => {
    try {
        const response = await LoginApi(mail)
        dispatch(setUser(response.user))
        setSession(response)
        return response;
    } catch (error) {
        // alert(error)
    }
    return null;


}

export const logoutUser = (user: User | null | undefined): AppThunk<User | void> => async (dispatch, getState) => {
    dispatch(logoutUserAction())
    removeSession();
}

export const deleteFavourite = (userId: number, track: Track): AppThunk<void> => async (dispatch, getState) => {
    await deleteFavoriteApi(userId, track)
    let newTrack = { ...track }
    newTrack.favourites -= 1;
    dispatch(updateTrack({ ...newTrack }))
    dispatch(deleteFavoriteAction(track.id))

}
export const addFavorite = (userId: number, track: Track): AppThunk<void> => async (dispatch, getState) => {
    await addFavoriteApi(userId, track)
    let newTrack = { ...track }
    newTrack.favourites += 1;
    dispatch(updateTrack({ ...newTrack }))
    dispatch(addFavoriteAction(track))

}

export const updateUser=(user: FormData,userJson:User): AppThunk<User> => async (dispatch, getState) => {

    try {
        const newUser = await updateUserApi(userJson.id, user)
        dispatch(updateUserAction(newUser))
        return newUser
    } catch (error) {

        alert("please try another email address")
    }
}
