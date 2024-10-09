import React, { useState, useEffect } from 'react';
import {getUsers} from '../services/user';
import Avatar from '@mui/material/Avatar';
import axios from '../utils/axios';
import { Track } from '../types/Track';
import { stringToBlob } from '../utils/stringToBlob.utils';
interface PictureProps {
  track:Track;
}

const Picture: React.FC<PictureProps> = (props:{ track:Track }) => {
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchPicture = async () => {
        if(props.track!==null&&props.track!==undefined){
          try {
              const blob = stringToBlob(props.track!.pictureData!,null,null);
              const url = URL.createObjectURL(blob);
              setPictureUrl(url);
          }catch(error){}
        }
    };

    fetchPicture();

  },[props.track.pictureData]);

  if (!pictureUrl) {
    return <div>Loading...</div>;
  }

  return <>
  <Avatar alt="Track Image" src={pictureUrl} sx={{width:'100%',height:'50%'}} variant="square" >
    <img  src={pictureUrl}/></Avatar></>;
};

export default Picture;