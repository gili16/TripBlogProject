import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../../services/user'
import { User } from '../../types/user.types'
import { Track } from '../../types/Track'
type AuthStateType = {
    user: User | null,
    isAuthanticated: boolean,
    isInitialized: boolean
}

const initialState = {
    user: null as User|null,
    isAuthanticated: false,
    isInitialized: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: AuthStateType, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthanticated = true;
            state.isInitialized = true;
        },
        setInitialize: (state: AuthStateType) => {
            state.isInitialized = true
        },
        addUser: (state: AuthStateType, action) => {
            state.user=action.payload
        },
        setFavorite: (state: AuthStateType, action:PayloadAction<void>) => {
            state.user!.favourites=[];
        },
        setMyTracks: (state: AuthStateType, action:PayloadAction<void>) => {
            state.user!.myTracks=[];
        },
        logoutUser: (state: AuthStateType) => {
            state.user= null;
            state.isAuthanticated= false;
            state.isInitialized=false;
        },
        addFavorite: (state: AuthStateType, action: PayloadAction<Track>) => {
            if (state) {
                if (state.user) {
                    state.user.favourites?.push(action.payload)
                }
            }
        },
        deleteFavorite: (state: AuthStateType, action: PayloadAction<number>) => {
            if (state) {
                if (state.user) {
                    let index = state.user.favourites?.findIndex(value => {
                        return value.id === action.payload;
                    })
                    if (index !== undefined) {
                        state.user.favourites?.splice(index, 1);
                    }
                }
            }
        },
        addTrack: (state: AuthStateType, action: PayloadAction<Track>) => {
            if (state) {
                if (state.user) {
                    state.user.myTracks?.push(action.payload)
                }
            }
        },
        deleteTrack: (state: AuthStateType, action: PayloadAction<number>) => {
            if (state) {
                if (state.user) {
                    let index = state.user.myTracks?.findIndex(value => {
                        return value.id === action.payload;
                    })
                    if (index !== undefined) {
                        state.user.myTracks?.splice(index, 1);
                    }
                }
            }
        },
        updateUser: (state: AuthStateType, action) => {
            if (state) {
                state.user!.addressX = action.payload.addressX;
                state.user!.addressY = action.payload.addressY
                state.user!.statusId = action.payload.statusId
                state.user!.experienceId = action.payload.experienceId
                state.user!.birthDate = action.payload.birthDate
                state.user!.name = action.payload.name
                state.user!.pictureFile = action.payload.pictureFile
                state.user!.profilePicture = action.payload.profilePicture
            }
        }
    }
})
// async function InitialAllUsers(){
//     userSlice.actions.getAllUsers();
// }
export const { addUser, logoutUser, updateUser ,setInitialize,setUser,addFavorite,addTrack,deleteFavorite,deleteTrack,setFavorite,setMyTracks} = userSlice.actions
export default userSlice.reducer