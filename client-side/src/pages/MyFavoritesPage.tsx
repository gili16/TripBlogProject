import { useLoaderData } from "react-router-dom";
import MyFavorites from "../sections/MyFavorites.section";
import { useEffect, useState } from "react";
import { getUser, getUserByToken } from "../services/user";
import { User } from "../types/user.types";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/user.selector";
import { Track } from "../types/Track";
import { useAppSelector } from "../redux/store";

export default function MyFavoritesPage(){
    const user=useAppSelector(selectUser).user;
    const[data,setData]=useState<Track[]>([])
    const[index,setIndex]=useState<number|undefined>(undefined)
    useEffect(()=>{
        setData((user!.favourites!==undefined)?user!.favourites:[])
    },[])
    useEffect(()=>{
        if(index!==undefined){
            setData([...data.filter((value:any)=>{
                return value.id!==index
            })]);
            setIndex(undefined)
        }
    },[index])

    
    return <MyFavorites tracks={data} setIndex={setIndex}/>
}