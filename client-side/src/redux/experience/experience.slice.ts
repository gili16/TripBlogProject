import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {getUsers} from '../../services/user'
import { OptionType } from '../../types/optionType.types'
// import { Experience } from '../../types/Experience'

const experienceSlice = createSlice({
    name: 'experience',
    initialState: [] as OptionType[],
    reducers: {
        init: (state: OptionType[], action: PayloadAction<OptionType[]>) => {
            return action.payload
        }
    }
})
export const {init}=experienceSlice.actions

export default experienceSlice.reducer