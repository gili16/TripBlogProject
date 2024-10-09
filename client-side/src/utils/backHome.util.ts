import { useNavigate } from "react-router-dom"
import { selectUser } from "../redux/user/user.selector"
import { useSelector } from "react-redux"
import { PATHS } from "../routes/paths"

export function backHome(){
    const user=useSelector(selectUser).user
    const token=localStorage.getItem('user')
    if(token===undefined||token===null||token===""||user===null||user===undefined||user.id===0){
        alert("please login")
        localStorage.clear()
        const navigate=useNavigate()
        navigate(`${PATHS.home}`)
    }

}