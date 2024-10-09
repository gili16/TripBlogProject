import { ReactNode } from "react"
import { useAppSelector } from "../redux/store"
import { selectUser } from "../redux/user/user.selector"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { PATHS } from "../routes/paths"

type Props = {
    children: ReactNode
}

export default function AuthGuard() {
    const { isAuthanticated, isInitialized } = useAppSelector(selectUser)
    const { pathname } = useLocation()

    if (!isInitialized) {
        return <h1>Loading...</h1>
    }

    if (!isAuthanticated) {
        return <Navigate to={PATHS.home} state={pathname} />
    }

    return <Outlet/>
}