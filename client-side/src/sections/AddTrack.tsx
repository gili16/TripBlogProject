import { Autocomplete, Avatar, Box, Button, FormControl, FormControlLabel, Grid, RadioGroup, Slider, TextField } from "@mui/material";
import { deepOrange,grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import Map from "../components/Map";
import { Track } from "../types/Track";
import { Stop } from "../types/Stop";
import { useDispatch, useSelector } from "react-redux";
import { selectLevel } from "../redux/level/level.selector";
import { selectDayPart } from "../redux/dayPart/dayPart.selector";
import { selectCompany } from "../redux/company/company.selector";
import { selectView } from "../redux/view/view.selector";
import { selectTrack } from "../redux/track/track.selector";
import { addTrack as addTrackApi } from "../services/track";
import { addTrack as addTrackSlice } from "../redux/track/track.slice";
import { addTrack as addTrackThunk , addStop as addStopThunk} from "../redux/track/track.thunk";
import { getUserByToken } from "../services/user";
import { useNavigate } from "react-router-dom";
import { addStop } from "../services/stop";
import { isValidStopToAdd, isValidTrackToAdd } from "../utils/validation.utils";
import BasicModal from "../components/Modal.component";
import { selectUser } from "../redux/user/user.selector";
import { iAmLoggedIn, thisIsMe } from "../utils/authorizeAccess.uril";
import { logoutUser } from "../redux/user/user.thunk";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getDescriptionArray, getOptionByDescription } from "../utils/Mapper";
import { PATHS } from "../routes/paths";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const marks=[
  {
    value:24,
    label:'1 day'
  },
  {
    value:48,
    label:'2 days'
  },
  {
    value:72,
    label:'3 days'
  },
  {
    value:96,
    label:'4 days'
  }
]

export default function AddTrack(){
  const [open, setOpen] = useState(false);
  const[text,setText]=useState("");
  const [image, setImage]=useState()
  const[imageToShow, setImageToShow]=useState<string>("")
  const [selectedValue, setSelectedValue] = useState('start');
  const [token, setToken] =useState(localStorage.getItem('user'))
  const[addressStart, setAddressStart]=useState("")
  const[addressEnd, setAddressEnd]=useState("")
  const[addressStop, setAddressStop]=useState<string[]>([])
  const [address, setAddress]=useState<string>("")
  const[x,setX]=useState(0)
  const[y,setY]=useState(0)
  const[level, setLevel]=useState("")
  const[dayPart, setDayPart]=useState("")
  const[company, setCompany]=useState("")
  const[view, setView]=useState("")
  const[stops, setStops]=useState<Omit<Stop,'id'>[]>([])
  const levels=useSelector(selectLevel)
  const dayParts=useSelector(selectDayPart)
  const companies =useSelector(selectCompany)
  const views=useSelector(selectView)
  const tracks=useSelector(selectTrack)
  const dispatch=useAppDispatch()
  const navigate=useNavigate()
  const user=useAppSelector(selectUser).user
  

  const[track, setTrack]=useState<Omit<Track,'id'>>({
    companyForTripId:1,
    created:new Date(),
    dayPartId:1,
    description:"",
    endX:0,
    endY:0,
    startX:0,
    startY:0,
    stops:[],
    favourites:0,
    length:0,
    levelId:1,
    userId:0,
    picture:'',
    comments:[],
    title:'',
    viewId:1
  })
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    
  };
    const handleFileChange = (event:any) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
        setImageToShow(URL.createObjectURL(selectedImage))
      };

    useEffect(()=>{
      let tempTrack={...track}
      if(selectedValue==="start"){
        setAddressStart(address)
        tempTrack.startX=x;
        tempTrack.startY=y;
      }else{
        if(selectedValue==="end"){
          setAddressEnd(address)
          tempTrack.endX=x;
          tempTrack.endY=y;
        }else{
          if(selectedValue==="stop"){
            
            setAddressStop([...addressStop,address])
            setStops([...stops,{x:x, y:y, trackId:0}])
          }
        }
      }
      setTrack({...tempTrack})
    },[address])
    // useEffect(()=>{
    //   if(!iAmLoggedIn(token,user)){
    //     alert("you are not logged in")
    //     dispatch(logoutUser(user));        
    //     navigate('/')
    //   }
    // },[token])
    function handleMinusStop(index:number){
      let newAddressesStop=addressStop.slice(0,index).concat(addressStop.slice(index+1))
      let newStops=stops.slice(0,index).concat(stops.slice(index+1))
      setAddressStop(newAddressesStop)
      setStops(newStops)
    }
    async function handleLengthChange(value:number,index:any){
      let tempTrack={...track}
      tempTrack.length=value
      setTrack({...tempTrack})
      return value.toString();
    }
    const handleSubmit=async(event: React.FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      
      
        const dataToSend={
          companyForTripId: getOptionByDescription(companies,company),
          pictureForm:image,
          viewId:getOptionByDescription(views,view),
          dayPartId:getOptionByDescription(dayParts,dayPart),
          levelId:getOptionByDescription(levels,level),
          created:track.created,
          title:track.title,
          description:track.description,
          startX:track.startX,
          startY:track.startY,
          stops:[],
          comments:[],
          endX:track.endX,
          endY:track.endY,
          length:track.length,
          favourites:0,
          userId:0
        }as Omit<Track,'id'>;
        if(isValidTrackToAdd(dataToSend)){
            const formData = new FormData(event.currentTarget);
                console.log(formData)
                formData.append('pictureForm', image!);
                formData.append('companyForTripId', dataToSend.companyForTripId.toString());
                formData.append('viewId', dataToSend.viewId.toString());
                formData.append('dayPartId', dataToSend.dayPartId.toString());
                formData.append('levelId', dataToSend.levelId.toString());
                formData.append('length', dataToSend.length.toString());
                formData.append('startX', dataToSend.startX.toString());
                formData.append('startY', dataToSend.startY.toString());
                formData.append('endX', dataToSend.endX.toString());
                formData.append('endY', dataToSend.endY.toString());
                formData.append('favourites', dataToSend.favourites.toString());                
                formData.append('created', dataToSend.created.toDateString());
                formData.append('length', dataToSend.length.toString());

            try{
              
              formData.append('userId', user!.id.toString());

              try{
                setOpen(true)
                setText("שומר מסלול")
                const newTrack=await dispatch(addTrackThunk(formData))
                if(newTrack!==null){
                // 
                setText("נשמר בהצלחה")
                stops.forEach(async(value:Omit<Stop,'id'>,index)=>{
                  try{
                    setText("keeping stop: "+index.toString())
                    if(isValidStopToAdd(value)){
                    value.trackId=newTrack.id;
                    dispatch(addStopThunk(value))
                    setText("success!")
                    }else{
                      alert("העצירה לא התווספה")

                    }
                  }catch(error){
                      console.log(error)
                  }
                });
                setOpen(false)
                setText("")

              }
              }catch(error){
                setOpen(false)
              }
            } catch (error) {
              setOpen(false)
            }
            navigate(`${PATHS.myTracks}`)
          }
          else{
            alert("הנתונים שהזנת שגואים,\nאנא בדוק שנית את הפרטים")
          }
        
    }
    useEffect(()=>{
    

      if(!thisIsMe(user!)){
        dispatch(logoutUser(user))
      }
  },[]);
    return<>
    <Box component={'form'} noValidate onSubmit={handleSubmit}>
      <BasicModal open={open} text={text}/>
      <Grid container gap={2} alignItems={"center"} justifyContent={"center"}>
          <Grid xs={12} alignItems={"center"} alignContent={"center"} marginTop={'100px'} gap={3} justifyContent={"space-around"}>
              <Avatar  sx={{ bgcolor: grey[500],marginLeft:'35%',marginRight:'50%',marginBottom:'50px', width:'400px', height:'400px' }} src={imageToShow} variant="rounded"/>
              <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                      Upload Image
                    </Button>
                  </label>
          </Grid>
          <Grid item xs={12} sx={{display:"block", marginTop:'0px'}}>
                <TextField
                  autoComplete="title"
                  name="title"
                  required
                  onChange={(event )=>{
                    let tempTrack={...track}
                    tempTrack.title=event.target.value
                    setTrack({...tempTrack})
                  }}
                  id="title"
                  label="title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} display={"block"}>
                <TextField
                  autoComplete="description"
                  name="description"
                  required
                  multiline
                  onChange={(event )=>{
                    let tempTrack={...track}
                    tempTrack.description=event.target.value
                    setTrack({...tempTrack})
                  }}
                  rows={4}
                  id="description"
                  label="description"
                  autoFocus
                />
              </Grid>
          <Grid xs={3} >
          <TextField
          sx={{paddingBottom:'15px'}}
                    required
                    fullWidth
                    name="addressStart"
                    label="Address Start"
                    type="address"
                    id="addressStart"
                    autoComplete="new-address"
                    value={addressStart}
                  />
                  
          {addressStop&&addressStop.map((stop,index)=>{
            return <><div style={{display:"inline"}}><TextField
                      required
                      fullWidth
                      
                      name="addressStop"
                      label="Address Stop"
                      type="address"
                      id={index.toString()}
                      key={index}
                      autoComplete="new-address"
                      value={stop}
                      sx={{display:"inline",marginBottom:'5px'}}
                    /></div>
                    <div style={{display:"inline"}}><Button onClick={()=>{handleMinusStop(index)}} sx={{display:"inline"}}>-</Button></div>
                    </>
          })}
          <TextField
          sx={{marginBottom:'5px'}}
                    required
                    fullWidth
                    name="addressEnd"
                    label="Address End"
                    type="address"
                    id="addressEnd"
                    autoComplete="new-address"
                    value={addressEnd}
                  />
          </Grid>
          <Grid xs={3}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Choose track points</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="start"
                  name="radio-buttons-group"
                  onChange={handleChange}
                >
                  <FormControlLabel value="start" control={<Radio />} label="Start" />
                  <FormControlLabel value="stop" control={<Radio />} label="Stop" />
                  <FormControlLabel value="end" control={<Radio />} label="End" />
                </RadioGroup>
              </FormControl>
          </Grid>
          <Grid xs={3}>
              <Map setAddress={setAddress} setX={setX} setY={setY}/>
          </Grid>
          <Grid item xs={12} >
                <Autocomplete
                disablePortal
                id="level"

                inputValue={level}
                onInputChange={(event, newInputValue) => {
                  setLevel(newInputValue);
                }}

                options={getDescriptionArray(levels)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Level" />}
                />
           </Grid>
           <Grid item xs={12} >
                <Autocomplete
                disablePortal
                id="dayPart"
                inputValue={dayPart}
                onInputChange={(event, newInputValue) => {
                  setDayPart(newInputValue);
                }}
                options={getDescriptionArray(dayParts)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Day Part" />}
                />
           </Grid>
           <Grid item xs={12} >
                <Autocomplete
                disablePortal
                id="company"
                inputValue={company}
                onInputChange={(event, newInputValue) => {
                  setCompany(newInputValue);
                }}
                options={getDescriptionArray(companies)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Company" />}
                />
           </Grid>
           <Grid item xs={12} >
                <Autocomplete
                disablePortal
                id="view"
                inputValue={view}
                onInputChange={(event, newInputValue) => {
                  setView(newInputValue);
                }}
                options={getDescriptionArray(views)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="View" />}
                />
           </Grid>
          <Grid xs={12}>
            <Slider
              aria-label="length"
              defaultValue={5}
              valueLabelDisplay="auto"
              shiftStep={1}
              step={1}
              marks={marks}
              min={1}
              max={100}
              onChange={(event:any, newInputValue:any) => {
                let tempTrack={...track}
                tempTrack.length=parseInt(newInputValue.toString());
                setTrack({...tempTrack})
              }}
            />
          </Grid>
          
      </Grid>
      <Button
        type="submit"
        variant="contained"
        
        sx={{ mt: 3, mb: 2 , width:'300px'}}
      >
        Add Track
      </Button>
    </Box>
    </>
}