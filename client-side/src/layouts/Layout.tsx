import { Outlet } from "react-router-dom"
import Header from './Header';
import Footer from "./Footer";
import { getUser as getUserApi, getUserByToken } from "../services/user"
import { selectUser } from '../redux/user/user.selector'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addUser } from "../redux/user/user.slice";
import { useAppDispatch } from "../redux/store";
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
import InitializeAuth from "../auth/InitializeAuth";
export default function Layout() {
    const user: any = useSelector(selectUser).user
    const dispatch = useAppDispatch();
    const [component, setComponent] = useState(<Header id={undefined} />)

    useEffect(() => {
        if (user !== null && user !== undefined && user.id !== 0) {
            try {
                setComponent(<Header id={user!.id} />)

            } catch {

            }
        } else {
            setComponent(<Header id={undefined} />)
        }
    }, [user])
    return <>
        <InitializeAuth>
            <header>{component}</header>
            <main>
                <Outlet />
            </main>
            <footer><Footer /></footer>
        </InitializeAuth>
    </>
}