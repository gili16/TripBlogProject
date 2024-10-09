import { ReactNode, useEffect } from "react"
import { useAppDispatch } from "../redux/store"
import { AuthUser } from "../types/user.types"
import { getSession, isValidToken, setAuthorizationHeader } from "./auth.utils"
import { setInitialize, setUser } from "../redux/user/user.slice"
import { initCategory } from "../redux/category/category.thunk"
import { initCompany } from "../redux/company/company.thunk"
import { initDayPart } from "../redux/dayPart/dayPart.thunk"
import { initExperience } from "../redux/experience/experience.thunk"
import { init } from "../redux/view/view.slice"
import { initStatus } from "../redux/status/status.thunk"
import { initLevel } from "../redux/level/level.thunk"
import { initViews } from "../redux/view/view.thunk"
import { useSelector } from "react-redux"
import { selectUser } from "../redux/user/user.selector"

type Props = {
    children: ReactNode
}

export default function InitializeAuth({ children }: Props) {
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser)
    useEffect(() => {
        loadGetSession();

    }, [])
    async function loadGetSession() {
        const authUser: AuthUser | null = await getSession()
        if (authUser?.token && isValidToken(authUser.token)) {
            dispatch(setUser(authUser.user))
            setAuthorizationHeader(authUser.token)
        }
        if (user.isInitialized === false) {
            
            dispatch(initCompany())
            dispatch(initDayPart())
            dispatch(initExperience())
            dispatch(initStatus())
            dispatch(initLevel())
            dispatch(initViews())
        }
        dispatch(setInitialize())

    }
    return <>{children}</>
}