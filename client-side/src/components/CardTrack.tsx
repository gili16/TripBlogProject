import { Badge, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, Tooltip, Typography, styled } from "@mui/material";
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
import DeleteIcon from '@mui/icons-material/Delete';
import { isValidToken } from "../auth/auth.utils";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectUser } from "../redux/user/user.selector";
import { deleteFavourite as deleteFavoriteThunk, addFavorite as addFavoriteThunk } from "../redux/user/user.thunk";
import { selectCompany } from "../redux/company/company.selector";
import { selectLevel } from "../redux/level/level.selector";
import { selectDayPart } from "../redux/dayPart/dayPart.selector";
import { selectView } from "../redux/view/view.selector";
import { getOptionById } from "../utils/Mapper";
import { PATHS } from "../routes/paths";
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

export default function CardTrack(props: { track: Track, hasToken: boolean, myTrack: boolean, setIndexToDelete: undefined | ((index: number) => void), setDecFavIndex: undefined | ((index: number) => void), setIncFavIndex: undefined | ((index: number) => void) }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser).user
  const companies=useAppSelector(selectCompany)
  const levels=useAppSelector(selectLevel)
  const dayParts=useAppSelector(selectDayPart)
  const views=useAppSelector(selectView)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const dispatch = useAppDispatch()
  const tracks = useSelector(selectTrack)
  const handleFavoriteClick = async () => {
    let token = localStorage.getItem('user')
    if (isValidToken(token)) {
      if (user!.favourites === undefined || user!.favourites === null) {
        user!.favourites = [] as Track[];
      }
      if (user!.favourites.filter((value: Track) => {
        return value.id === props.track.id;
      }).length === 0) {
        dispatch(addFavoriteThunk(user!.id!, props.track))
        if (props.setIncFavIndex !== undefined) {
          props.setIncFavIndex(props.track.id)
        }
      } else {
        dispatch(deleteFavoriteThunk(user?.id!, props.track))
        if (props.setDecFavIndex !== undefined) {
          props.setDecFavIndex(props.track.id)
        }
      }

    } else {
      alert('please login for more actions')
    }
  }
  const handleClickEdit = () => {
    navigate(`${PATHS.updateTrack}${props.track.id}`)
  }
  const handleDelete = () => {
    if (props.setIndexToDelete !== undefined) {
      let res = window.confirm("are you sure you want to delete")
      if (res === true) {
        props.setIndexToDelete(props.track.id)
      }
    }
  }
  return <>
    <Card sx={{}}>
      <CardHeader
        title={props.track.title}
      />
      <CardMedia>
        <TrackImage track={props.track} />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.track.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        {props.hasToken && <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
          <Badge badgeContent={props.track.favourites} color="primary"><FavoriteIcon /></Badge>
        </IconButton>}
        {props.myTrack && <IconButton aria-label="edit" onClick={handleClickEdit}>
          <EditIcon />
        </IconButton>}
        {props.hasToken && <CommentsDrawer trackId={props.track.id} />}
        {props.myTrack && <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>}
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
            suitable for: {getOptionById(companies,props.track.companyForTripId)},{'\n'}
            you are expected to see on that trip:{getOptionById(views,props.track.viewId)},{'\n'}
            the best time for that track: {getOptionById(dayParts,props.track.dayPartId)},{'\n'}
            this track takes about:{getTrackLength(props.track.length)}
          </Typography>

        </CardContent>
        <TrackStepper track={props.track} />
      </Collapse>
    </Card>
  </>
}