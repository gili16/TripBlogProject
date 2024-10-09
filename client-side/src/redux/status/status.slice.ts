import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {getUsers} from '../../services/user'
import { OptionType } from '../../types/optionType.types'
// import { Status } from '../../types/Status'

const statusSlice = createSlice({
    name: 'status',
    initialState: [] as OptionType[],
    reducers: {
        init: (state: OptionType[], action: PayloadAction<OptionType[]>) => {
            return action.payload
        }
    }
})
export const {init}=statusSlice.actions

export default statusSlice.reducer