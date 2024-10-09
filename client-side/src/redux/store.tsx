import {ThunkAction, UnknownAction, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import trackSlice from './track/track.slice'
import userSlice from './user/user.slice'
import viewSlice from './view/view.slice'
import categorySlice from './category/category.slice'
import thunk from 'redux-thunk';
import dayPartSlice from './dayPart/dayPart.slice'
import statusSlice from './status/status.slice'
import levelSlice from './level/level.slice'
import companySlice from './company/company.slice'
import experienceSlice from './experience/experience.slice'
export const store = configureStore({
    reducer: {
        user: userSlice,
        track:trackSlice,
        view:viewSlice,
        category:categorySlice,
        dayPart:dayPartSlice,
        status:statusSlice,
        level:levelSlice,
        experience:experienceSlice,
        company:companySlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<
    Promise<ReturnType> | ReturnType,
    RootState,
    unknown,
    UnknownAction
>