import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {getUsers} from '../../services/user'
import { OptionType } from '../../types/optionType.types'
// import { View } from '../../types/View'

const viewSlice = createSlice({
    name: 'view',
    initialState: [] as OptionType[],
    reducers: {
        init: (state: OptionType[], action: PayloadAction<OptionType[]>) => {
            return action.payload
        }
    }
})
export const {init}=viewSlice.actions

export default viewSlice.reducer