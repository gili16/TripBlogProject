import { useEffect, useState } from "react";
import TrackFind from "../sections/TrackFind.section";
import { Filter } from "../types/Filter.types";
import { useLoaderData } from "react-router-dom";
import { Track } from "../types/Track";
import { getTrackByArea, getTrackByText } from "../services/track";
import { useDispatch, useSelector } from "react-redux";
import { selectTrack } from "../redux/track/track.selector";
import { getAllTracks } from "../redux/track/track.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import BasicModal from "../components/Modal.component";
import { selectCompany } from "../redux/company/company.selector";
import { selectLevel } from "../redux/level/level.selector";
import { selectDayPart } from "../redux/dayPart/dayPart.selector";
import { selectView } from "../redux/view/view.selector";
import { getOptionById } from "../utils/Mapper";
import { isValidToken } from "../auth/auth.utils";
export default function TrackPage(){
    const [desc,setDesc]=useState<string|undefined>(undefined)
    const[filter,setFilter]=useState<Filter|undefined>(undefined)
    const data:any=useLoaderData()
    const[descFavIndex,setDecFavIndex]=useState<number|undefined>(undefined)
    const[incFavIndex,setIncFavIndex]=useState<number|undefined>(undefined)
    const allTracks=useSelector(selectTrack)
    const dispatch=useAppDispatch()
    const[lastArea,setLastArea]=useState("")
    const [tracks,setTracks]=useState<Track[]>([])
    const [text, setText]=useState("")
    const [open,setOpen]=useState(false)
    const companies=useAppSelector(selectCompany)
    const levels=useAppSelector(selectLevel)
    const dayParts=useAppSelector(selectDayPart)
    const views=useAppSelector(selectView)
    useEffect(()=>{
        setTracks(data)
        dispatch(getAllTracks(data))
    },[])
    useEffect(()=>{
        if(descFavIndex!==undefined){
            let temp=[] as Track[]
            tracks.forEach((value:Track)=>{
                let val={...value}
                if(val.id==descFavIndex){
                    val.favourites-=1
                }
                temp.push(val)
            });
            setTracks([...temp])
            setDecFavIndex(undefined)
        }
    },[descFavIndex])
    useEffect(()=>{
        if(incFavIndex!==undefined){
            let temp=[] as Track[]
            tracks.forEach((value:Track)=>{
                let val={...value}
                if(val.id==incFavIndex){
                    val.favourites+=1
                }
                temp.push(val)
            });
            setTracks([...temp])
            setIncFavIndex(undefined)
        }
    },[incFavIndex])
    useEffect(()=>{
        if(desc!==undefined){
            loadByDesc();
        }
    },[desc])
    useEffect(()=>{
        if(filter!==undefined){
            loadByFilter();
        }
    },[filter])
    async function loadByDesc(){
        setOpen(true)
        setText("loading tracks from server")
        let temp=await getTrackByText(desc!)
        setTracks([...temp])
        setDesc(undefined)
        setText("tracks ready")
        setOpen(false)

    }
    async function loadByFilter(){
        setOpen(true)
        setText("loading tracks from server")
        let temp=[...allTracks]
        if(lastArea===""||lastArea!==filter!.area){
         temp=await getTrackByArea(filter!.area)
        setLastArea(filter!.area)
        dispatch(getAllTracks([...temp]))
        }
        setText("filtering tracks")

        let filtered=[...temp!.map((value:Track)=>{
            if(filter!==undefined&&filter!==null){
                if(filter.level!==undefined&&filter.level!==""&&getOptionById(levels,value.levelId)!==filter.level){
                    return false;
                }
                if(filter.dayPart!==undefined&&filter.dayPart!==""&&getOptionById(dayParts,value.dayPartId)!==filter.dayPart){
                    return false;
                }
                if(filter.company!==undefined&&filter.company!==""&&getOptionById(companies,value.companyForTripId)!==filter.company){
                    return false;
                }
                if(filter.view!==undefined&&filter.view!==""&&getOptionById(views,value.viewId)!==filter.view){
                    return false;
                }
            }
            return value;
        })];
        let filteredTracks=[]as Track[]
        for(let i=0;i<filtered.length;i++){
            if(filtered[i]){
                filteredTracks.push(temp[i])
            }
        }
        setFilter(undefined)
        setTracks([...filteredTracks])
       
        setText("tracks filtered")
        setOpen(false)
    }

    
    return <>
    <BasicModal text={text} open={open}/>
    <TrackFind tracks={tracks} setDesc={setDesc} setFilter={setFilter} setDecFavIndex={setDecFavIndex} setIncFavIndex={setIncFavIndex}/>
    </>
}