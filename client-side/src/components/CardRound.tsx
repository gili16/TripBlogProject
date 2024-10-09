import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
export default function CardRound(props:{image:any,title:string, text:string,url:string}) {
  const navigate=useNavigate();
    const onClickHandler=()=>{
    navigate(props.url)
  }
    return (
        
    <Card sx={{  }} >
      <CardMedia
        sx={{ height: 140 }}
        image={props.image}
        title={props.title}
        
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {props.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClickHandler}>Learn More</Button>
      </CardActions>
    </Card>
  );
}