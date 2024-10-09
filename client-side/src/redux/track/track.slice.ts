import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../../services/user'
import { Track } from '../../types/Track'
import { act } from 'react-dom/test-utils'
import { Comment } from '../../types/Comment'
const trackSlice = createSlice({
    name: 'track',
    initialState: [] as Track[],
    reducers: {
        addTrack: (state: Track[], action) => {
            state.push(action.payload)
        },
        deleteTrack: (state: Track[], action) => {
            let index = -1
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                state.splice(index, 1)
            }
            else {
                console.log("no such element to erase")
            }
        },
        getAllTracks: (state: Track[], action) => {
            return action.payload
        },
        updateTrack: (state: Track[], action) => {
            let track = state.filter(value => {
                return value.id === action.payload.id
            })[0] as Track
            console.log(track)
            if (track) {
                track.comments = action.payload.comments;
                track.companyForTripId = action.payload.companyForTripId;
                track.created = action.payload.created;
                track.dayPartId = action.payload.dayPartId;
                track.description = action.payload.description;
                track.endX = action.payload.endX;
                track.endY = action.payload.endY;
                track.favourites = action.payload.favourites;
                track.length = action.payload.length;
                track.levelId = action.payload.levelId;
                track.picture = action.payload.picture;
                track.pictureForm = action.payload.pictureForm;
                track.startX = action.payload.startX;
                track.startY = action.payload.startY;
                track.stops = action.payload.stops;
                track.title = action.payload.title;
                track.viewId = action.payload.viewId;
            }
        },
        addStop: (state: Track[], action) => {
            let track = state.find(value => {
               return value.id === action.payload.trackId;
            })
            if (track !== undefined) {
                track.stops.push(action.payload)
            } else {
                alert("stop not added")
            }
        },
        addComment: (state: Track[], action: PayloadAction<{ trackId: number, comment: Comment }>) => {
            console.log(action.payload)
            let track = state.find(value => {
                return value.id === action.payload.trackId;
            })
            if (track !== undefined) {
                if (track.comments.find(value => {
                  return  value.id === action.payload.comment.id
                }) === undefined) {
                    track.comments.push(action.payload.comment)
                }
            } else {
                alert("comment not added")
            }
        }
    }
})
export const { getAllTracks, deleteTrack, addTrack, updateTrack, addStop, addComment } = trackSlice.actions
export default trackSlice.reducer