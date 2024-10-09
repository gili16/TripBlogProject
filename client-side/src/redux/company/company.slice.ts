import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {getUsers} from '../../services/user'
import { OptionType } from '../../types/optionType.types'
// import { Company } from '../../types/Company'

const companySlice = createSlice({
    name: 'company',
    initialState: [] as OptionType[],
    reducers: {
        init: (state: OptionType[], action: PayloadAction<OptionType[]>) => {
            return action.payload
        }
        
    }
})
export const {init}=companySlice.actions

export default companySlice.reducer