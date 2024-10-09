import { Button, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Login, getUserByToken } from "../../services/user";
import { Login as LoginThunk } from "../../redux/user/user.thunk";
import { addUser } from "../../redux/user/user.slice";
import { useDispatch } from "react-redux";
import { isValidEmail } from "../../utils/validation.utils";
import { useAppDispatch } from '../../redux/store';
import BasicModal from "../../components/Modal.component";
import { setSession } from "../../auth/auth.utils";
export default function LoginForm() {
    const [email, setEmail] = useState("")
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [text, setText] = useState("")
    const onChangeEndler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        setEmail(value)
    }

    const onLoginHandler = async () => {
        if (email === "") {
            alert("please enter an email address")
        } else {
            try {
                if (isValidEmail(email)) {
                    setOpen(true)
                    setText("generating token")
                    let user = await dispatch(LoginThunk(email))
                    setSession(user!)
                    setText("Happy Serving!")
                    setOpen(false)
                    setText("")
                }
            } catch (error) {
                setOpen(false)
                alert("we can find you! please sign up!")
            }
        }
    }



    return <>
        <BasicModal open={open} text={text} />
        <TextField
            error={email !== "" && !isValidEmail(email)}
            size='small'
            sx={{ backgroundColor: 'whitesmoke', borderRadius: '5px' }}
            id="outlined-basic"
            label="your email here"
            variant='outlined'
            onChange={onChangeEndler}
            helperText={email === "" || isValidEmail(email) ? "" : "please enter a valid email address"}
        />
        <Button color="inherit" onClick={onLoginHandler}>Login</Button>
    </>
}