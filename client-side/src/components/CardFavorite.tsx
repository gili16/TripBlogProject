import { Badge, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, Typography, styled } from "@mui/material";
import { Track } from "../types/Track";
import TrackImage from "./TrackImage";
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { getUser, getUserByToken, updateUser } from "../services/user";
import { trackForMutations } from "@reduxjs/toolkit/dist/immutableStateInvariantMiddleware";
import { useDispatch, useSelector } from "react-redux";
import { selectTrack } from "../redux/track/track.selector";
import { updateTrack } from "../redux/track/track.slice";
import { User } from "../types/user.types";
import { addFavorite, deleteFavorite } from "../services/user";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import getTrackLength from "../utils/generalFunctions.utils";
import TrackStepper from "./TrackStepper";
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import CommentsDrawer from "./CommentsDrawer";
import { useNavigate, useNavigation } from "react-router-dom";
import React from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch, useAppSelector } from "../redux/store";
import { isValidToken } from "../utils/authorizeAccess.uril";
import { selectUser } from "../redux/user/user.selector";
import { setFavorite } from "../redux/user/user.slice";
import { deleteFavourite as deleteFavoriteThunk } from "../redux/user/user.thunk";
import { getOptionById } from "../utils/Mapper";
import { selectCompany } from "../redux/company/company.selector";
import { selectLevel } from "../redux/level/level.selector";
import { selectDayPart } from "../redux/dayPart/dayPart.selector";
import { selectView } from "../redux/view/view.selector";

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardFavorite(props:{track:Track,setIndexToErase:(index:number)=>void}){
  const [expanded, setExpanded] = useState(false);
  const user=useAppSelector(selectUser).user
  const companies=useAppSelector(selectCompany)
  const levels=useAppSelector(selectLevel)
  const dayParts=useAppSelector(selectDayPart)
  const views=useAppSelector(selectView)
  
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const dispatch=useAppDispatch()
  const tracks=useAppSelector(selectTrack)
  const handleFavoriteClick=async()=>{
    let token=localStorage.getItem('user')
    if(isValidToken(token)){
      try{
        if(user?.favourites===undefined){
          dispatch(setFavorite())
        }
      if(user?.favourites!.filter((value:Track)=>{
        return value.id===props.track.id;
      }).length===0){
        alert("this track already removed from favorites")
    }else{
      await dispatch(deleteFavoriteThunk(user?.id!,props.track))
      props.setIndexToErase(props.track.id)
    }
    }catch(error){
      console.error(error)
    }
    }else{
      alert('please login for more actions')
    }
  }
  
return <>
<Card sx={{ }}>
      <CardHeader       
        title={props.track.title}       
      />
      <CardMedia>
        <TrackImage track={props.track}/>
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.track.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
          <IconButton  >
            <Badge badgeContent={props.track.favourites+1} color="primary"><FavoriteIcon /></Badge>
          </IconButton>
        
        <CommentsDrawer trackId={props.track.id}/>
        <IconButton aria-label="remove from favorites" onClick={handleFavoriteClick} >
            <HighlightOffIcon/>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
          </ExpandMore>
          
      </CardActions>
      <Collapse in={expanded} timeout="auto" >
        <CardContent>
          <Typography paragraph>Track Details:</Typography>
          <Typography paragraph>
            {props.track.description}
          </Typography>
          <Typography >
            level:{getOptionById(levels,props.track.levelId)},{'\n'}
            suitable for: {getOptionById(companies, props.track.companyForTripId)},{'\n'}
            you are expected to see on that trip:{getOptionById(views, props.track.viewId)},{'\n'}
            the best time for that track: {getOptionById(dayParts, props.track.dayPartId)},{'\n'}
            this track takes about:{getTrackLength(props.track.length)}
          </Typography>
          
        </CardContent>
        <TrackStepper track={props.track}/>
      </Collapse>
      </Card>
</>
}