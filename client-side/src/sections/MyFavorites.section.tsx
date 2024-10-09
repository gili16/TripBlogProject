import { Avatar, Box, Button, Grid, IconButton, Pagination, Stack, Typography, createSvgIcon } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { Track } from "../types/Track";
import CardTrack from "../components/CardTrack";
import { useDispatch, useSelector } from "react-redux";
import { selectTrack } from "../redux/track/track.selector";
import { getAllTracks } from "../redux/track/track.slice";
import { useNavigate } from "react-router-dom";
import CardFavorite from "../components/CardFavorite";
import { selectUser } from "../redux/user/user.selector";
import { thisIsMe } from "../utils/authorizeAccess.uril";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logoutUser } from "../redux/user/user.thunk";
export default function MyFavorites(props:{tracks:Track[],setIndex:(index:number)=>void}){
  const[tracks,setTracks]=useState<Track[]|null>(null)
    const[indexToErase,setIndexToErase]=useState<number|undefined>(undefined)
    const user=useAppSelector(selectUser).user
    const navigate=useNavigate()
  const dispatch=useAppDispatch()
  useEffect(()=>{
    if(indexToErase!==undefined&&indexToErase!==null){
      props.setIndex(indexToErase)
      setIndexToErase(undefined)
    }
  },[indexToErase])

    useEffect(()=>{
    
      if(!thisIsMe(user!)){
        dispatch(logoutUser(user))
      }
  },[]);
    
    
    return <>
    
    <Grid container gap={2}>
      {(props.tracks!==null&&props.tracks!==undefined&&props.tracks.length>0)?props.tracks.map((track:any)=>{
        return(<Grid xs={12} md={3} key={track.id}>
          <CardFavorite track={track} setIndexToErase={setIndexToErase}/>
        </Grid>);
      }):<></>}

    </Grid>
    </>
}