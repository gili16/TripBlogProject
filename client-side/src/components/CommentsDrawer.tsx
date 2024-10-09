import * as React from 'react';
import Box from "@mui/material/Box"
import Drawer from '@mui/material/Drawer';
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Grid, IconButton, Stack, TextField } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { useEffect, useState } from 'react';
import { addComment, getCommentsByTrackId } from '../services/comment';
import { Comment } from '../types/Comment';
import Picture from './UserProfileImage';
import { Form, useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { isValidCommentToAdd } from '../utils/validation.utils';
import { selectUser } from '../redux/user/user.selector';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser as logoutUserThunk } from '../redux/user/user.thunk';
import { useAppDispatch } from '../redux/store';
import { isValidToken } from '../auth/auth.utils';
import { addComment as addCommentThunk, initComments as initCommentsThunk } from '../redux/track/track.thunk';
export default function CommentsDrawer(props:{trackId:number}) {
  const [open, setOpen] = React.useState(false);
    const [uploaded,setUploaded]=useState(true)
    const navigate=useNavigate()
    const user=useSelector(selectUser).user
    const dispatch=useAppDispatch()
    const [comments, setComments]=useState<Comment[]>([])
    const[newComment, setNewComment]=useState<string>("")
    const[drawerContext, setDrawerContext]=useState(<Box/>)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    newOpen&&uploadComments();
  };
  async function uploadComments(){
    const token=localStorage.getItem('user')
    if(isValidToken(token)){
          const commentsResponse=await dispatch(initCommentsThunk(props.trackId));
          setComments(commentsResponse)
      }else{
        alert("please login for more acions")
        dispatch(logoutUserThunk(user))
      }
  }
  const handleInputChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setNewComment(e.target.value)
  }
  async function handleOnClick(){
    const token=localStorage.getItem('user')
    if(isValidToken(token))
    {
      const commentToSend={
        trackId:props.trackId,
        postDate:new Date(),
        context:newComment
      }as Omit<Comment,'id'>
      if(isValidCommentToAdd(commentToSend)){
      let newComment=await dispatch(addCommentThunk(commentToSend))
      let temp=[...comments,newComment]
      setComments(temp!)
      }else{
        alert("הנתונים שנשלחו שגואים,\nאנא בדוק שנית את הפרטים")
      }
    }else{
      dispatch(logoutUserThunk(user))
    }
  }
  useEffect(()=>{
    if(comments){
        const DrawerList = (
            <Stack spacing={4}>
            <Box  sx={{ width: 500 }} role="presentation" onClick={toggleDrawer(false)}>
              <List >
                {comments?.map((comment:Comment, index) => (
                    <Box >
                    <Divider textAlign='right' >posted on: {comment.postDate.toString()}</Divider>
                  <ListItem key={comment.id} disablePadding dir='rtl' >
                    
                      <ListItemText  primary={comment.context}  />
                    
                  </ListItem>
                  </Box>
                ))}
              </List><Divider  />
               </Box>
               
              
              <Box component={Form}>
              <Grid container>
                <Grid item xs={1}>
                    <IconButton dir='rtl' onClick={handleOnClick}>
                        <SendIcon />
                      </IconButton>
                
                </Grid>
                <Grid item xs={11}>
                    <TextField
                    label="your comment here"
                    id="outlined-size-small"
                    defaultValue="your comment here"
                    fullWidth

                    value={newComment}
                    onChange={handleInputChange}
                    />  
                </Grid>
              </Grid>
              </Box>
           </Stack>
          );
          setDrawerContext(DrawerList);
    }
  },[comments,newComment])
  
  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} aria-label="edit">
        <CommentIcon/>
        </IconButton>
      <Drawer
      anchor={'right'} open={open} onClose={toggleDrawer(false)}>
        {drawerContext}
      </Drawer>
    </div>
  );
}
