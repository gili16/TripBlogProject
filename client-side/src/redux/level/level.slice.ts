import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {getUsers} from '../../services/user'
import { OptionType } from '../../types/optionType.types'
// import { Level } from '../../types/Level'

const levelSlice = createSlice({
    name: 'level',
    initialState: [] as OptionType[],
    reducers: {
        init: (state: OptionType[], action: PayloadAction<OptionType[]>) => {
            return action.payload
        }
    }
})
export const {init}=levelSlice.actions

export default levelSlice.reducer