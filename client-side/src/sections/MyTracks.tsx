import { Avatar, Box, Button, Grid, IconButton, Pagination, Stack, Typography, createSvgIcon } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { Track } from "../types/Track";
import CardTrack from "../components/CardTrack";
import { useDispatch, useSelector } from "react-redux";
import { selectTrack } from "../redux/track/track.selector";
import { getAllTracks } from "../redux/track/track.slice";
import { useLoaderData, useNavigate } from "react-router-dom";
import { deleteTrack } from "../services/track";
import { deleteTrack as DeleteTrackSlice } from "../redux/track/track.slice";
import { backHome } from "../utils/backHome.util";
import { selectUser } from "../redux/user/user.selector";
import { logoutUser } from "../redux/user/user.thunk";
import { useAppDispatch } from "../redux/store";
import { isValidToken } from "../auth/auth.utils";
import { PATHS } from "../routes/paths";
import { deleteTrack as deleteTrackThunk } from "../redux/track/track.thunk";
export default function MyTracks(){
  const data:any=useLoaderData()
  const tracks =useSelector(selectTrack)
  const dispatch=useAppDispatch()
  const [uploaded, setUploaded]=useState<boolean>(false)
  const navigate=useNavigate()
  const user=useSelector(selectUser).user
  const[indexToDelete,setIndexToDelete]=useState<number|undefined>(undefined)
    const[token,setToken]= useState<string|null>("")
    useEffect(()=>{
      
      const token=localStorage.getItem('user')
      if(!isValidToken(token)||user===null||user===undefined||user.id===0){
          dispatch(logoutUser(user))
      }else{
  
        setToken(localStorage.getItem('user'))
        dispatch(getAllTracks(data))
      }
    },[])
    const handleClick=()=>{
      navigate(PATHS.addTrack)
    }
    useEffect(()=>{
      mydeleteTrack();
    },[indexToDelete])
    async function mydeleteTrack(){
      if(indexToDelete!==undefined){
        let token=localStorage.getItem('user')
          try{
         dispatch(deleteTrackThunk(indexToDelete))
          }catch(error){
            console.error(error)
          }

      setIndexToDelete(undefined)
      }
    }
    const PlusIcon = createSvgIcon(
      // credit: plus icon from https://heroicons.com/
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        onClick={handleClick}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>,
      'Plus',
    );
    return <><Grid container gap={2} alignItems={"center"} justifyItems={"center"} alignContent={"center"} justifyContent={"center"}>
    <Box component="div" alignItems={"center"} alignContent={"center"} >
      <Avatar sx={{ bgcolor: grey[500] ,width:"600px", height:"300px",margin:'50px', marginLeft:"150px"}} variant="rounded">
        <IconButton onClick={handleClick}>
          <PlusIcon fontSize="large" titleAccess="add track" />
        </IconButton>
      </Avatar>
    </Box>
    <Grid container gap={2}>
      {tracks&&tracks.map((track:any)=>{
        return(<Grid item xs={12} md={3} key={track.id}>
          <CardTrack track={track} hasToken={true} myTrack={true} setIndexToDelete={setIndexToDelete} setDecFavIndex={undefined} setIncFavIndex={undefined}/>
        </Grid>);
      })}

    </Grid></Grid>
    </>
}