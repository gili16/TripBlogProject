import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../../services/user'
import { OptionType as Category, OptionType } from '../../types/optionType.types'

const categorySlice = createSlice({
    name: 'category',
    initialState: [] as OptionType[],
    reducers: {
        init: (state: OptionType[], action: PayloadAction<OptionType[]>) => {
            return action.payload
        }
    }
})
export const {init}=categorySlice.actions
export default categorySlice.reducer