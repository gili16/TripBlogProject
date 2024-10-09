import { ReactNode } from "react"
import { useAppSelector } from "../redux/store"
import { selectUser } from "../redux/user/user.selector"
import { Navigate, useLocation } from "react-router-dom"
import { PATHS } from "../routes/paths"

type Props = {
    children: ReactNode
}

export default function GuestGuard({ children }: Props) {
    const { isAuthanticated, isInitialized } = useAppSelector(selectUser)
    const { state } = useLocation()

    if (isAuthanticated) {
        return <Navigate to={state || PATHS.home} />
    }

    if (!isInitialized) {
        return <h1>Loading...</h1>
    }

    return <>{children}</>
}