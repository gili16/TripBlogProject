import React, { useState, useEffect } from 'react';
import {getUsers} from '../services/user';
import Avatar from "@mui/material/Avatar";
import axios from '../utils/axios';
import { useAppSelector } from '../redux/store';
import { selectUser } from '../redux/user/user.selector';
import { stringToBlob } from '../utils/stringToBlob.utils';
interface PictureProps {
  id: number;
}

const Picture: React.FC<PictureProps> = (props:{ id:number }) => {
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);
  const user=useAppSelector(selectUser).user
 
  useEffect(() => {
    const fetchPicture = async () => {
        if(props.id!=0){
          const blob =  stringToBlob(user?.pictureBytes,null,null);
          const url = URL.createObjectURL(blob);
          setPictureUrl(url);
    }
    };

    fetchPicture();

    // Clean up URL object when component unmounts
    return () => {
      if (pictureUrl) {
        URL.revokeObjectURL(pictureUrl);
      }
    };
  },[props.id]);

  if (!pictureUrl) {
    return <div>Loading...</div>;
  }

  return <>
  <Avatar alt="Remy Sharp" src={pictureUrl} >
    <img  src={pictureUrl}/></Avatar></>;
};

export default Picture;
