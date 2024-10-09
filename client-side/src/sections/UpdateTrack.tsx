import { Autocomplete, Avatar, Box, Button, FormControl, FormControlLabel, Grid, RadioGroup, Slider, TextField } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
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
import { addTrack as addTrackApi, updateTrack as updateTrackApi } from "../services/track";
import { addTrack as addTrackSlice, updateTrack as updateTrackSlice } from "../redux/track/track.slice";
import { getUserByToken } from "../services/user";
import { useNavigate } from "react-router-dom";
import { addStop, deleteStop } from "../services/stop";
import { useLoaderData, useParams } from "react-router-dom"
import { k as apikey } from '../utils/projectdata'
import getAddressByCoordinates from "../services/GoogleMaps.services";
import { useJsApiLoader } from "@react-google-maps/api";
import { isValidStopToAdd, isValidTrackToAdd, isValidTrackToUpdate } from "../utils/validation.utils";
import { useAppSelector } from "../redux/store";
import { selectUser } from "../redux/user/user.selector";
import BasicModal from "../components/Modal.component";
import { isValidToken } from "../auth/auth.utils";
import { stringToBlob } from "../utils/stringToBlob.utils";
import { getDescriptionArray, getOptionByDescription, getOptionById } from "../utils/Mapper";
import { PATHS } from "../routes/paths";

const marks = [
  {
    value: 24,
    label: '1 day'
  },
  {
    value: 48,
    label: '2 days'
  },
  {
    value: 72,
    label: '3 days'
  },
  {
    value: 96,
    label: '4 days'
  }
]

export default function UpdateTrack() {
  const params = useParams()
  const data: any = useLoaderData()
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apikey,
    language: 'he',
  });
  const [isAnitialized, setIsAnitialized] = useState(false)
  const [image, setImage] = useState<Blob>()
  const [imageToShow, setImageToShow] = useState<string>("")
  const [selectedValue, setSelectedValue] = useState('start');
  const token = localStorage.getItem('user')
  const [addressStart, setAddressStart] = useState("")
  const [addressEnd, setAddressEnd] = useState("")
  const [addressStop, setAddressStop] = useState<string[]>([])
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [text, setText] = useState("")
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState<string>("")
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [level, setLevel] = useState("")
  const [dayPart, setDayPart] = useState("")
  const [company, setCompany] = useState("")
  const [view, setView] = useState("")
  const [stops, setStops] = useState<Omit<Stop, 'id'>[]>([])
  const levels = useSelector(selectLevel)
  const dayParts = useSelector(selectDayPart)
  const companies = useSelector(selectCompany)
  const views = useSelector(selectView)
  const tracks = useSelector(selectTrack)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [originalStops, SetOriginalStops] = useState<Stop[]>([])
  const [track, setTrack] = useState<any | null>(data)
  const user = useAppSelector(selectUser).user
  useEffect(() => {
    const token = localStorage.getItem('user')
    if (token === undefined || token === null || token === "" || user === null || user === undefined || user.id === 0) {
      alert("please login")
      localStorage.clear()
      navigate('/')
    }
  }, [])
  useEffect(() => {
    if (isLoaded) {
      setGeocoder(new window.google.maps.Geocoder());
    }
  }, [isLoaded]);
  useEffect(() => {
    if (data) {
      setTrack({
        id: data.id,
        companyForTripId: data.companyForTripId,
        pictureForm: data.pictureForm,
        viewId: data.viewId,
        dayPartId: data.dayPartId,
        levelId: data.levelId,
        created: data.created,
        title: data.title,
        description: data.description,
        startX: data.startX,
        startY: data.startY,
        stops: data.stops,
        comments: data.comments,
        endX: data.endX,
        endY: data.endY,
        length: data.length,
        favourites: data.favourites,
        userId: data.userId,
        picture: data.picture
      } as Track);
    }
  }, [data])
  useEffect(() => {
    if (!isAnitialized && geocoder && track) {
      Initialize();
    }
    else {
    }
  }, [geocoder, track])

  async function Initialize() {

    if (track) {
      let start = ""
      let end = ""
      let tempStops = [] as Omit<Stop, "id">[]
      let tempStopAddresses = [] as string[]
      try {
        start = await getAddressByCoordinates(geocoder, { lat: data.startX, lng: data.startY });
      } catch {
        start = "start position"
      }
      try {
        end = await getAddressByCoordinates(geocoder, { lat: data.endX, lng: data.endY })
      } catch { }
      data.stops.map(async (value: any) => {
        try {
          let tempAddress = await getAddressByCoordinates(geocoder, { lat: value.x, lng: value.y })
          tempStopAddresses.push(tempAddress)
          let tempStop = {
            trackId: track.id,
            x: value.x,
            y: value.y
          } as Omit<Stop, "id">
          tempStops.push(tempStop)
          SetOriginalStops([...data.stops])
        } catch {

        }
      })
      try {
        if (data) {
          const blob = stringToBlob(data.pictureData!, null, null);
          const url = URL.createObjectURL(blob);
          setImageToShow(url)
          setImage(blob)
          setTrack({ ...track, ['picture']: url, ['pictureForm']: blob })
        } else {
          console.error('Failed to fetch picture');
        }
      } catch (error) {
        console.error('Error fetching picture:', error);
      }
      setCompany(getOptionById(companies,data.companyForTripId))
      setDayPart(getOptionById(dayParts,data.dayPartId))
      setLevel(getOptionById(levels,data.levelId))
      setView(getOptionById(views,data.viewId))
      setAddressStart(start)
      setAddressEnd(end)
      setStops(tempStops)
      setAddressStop(tempStopAddresses)
      setIsAnitialized(true)
      setTrack({
        id: data.id,
        companyForTripId: data.companyForTripId,
        viewId: data.viewId,
        dayPartId: data.dayPartId,
        levelId: data.levelId,
        created: data.created,
        title: data.title,
        description: data.description,
        startX: data.startX,
        startY: data.startY,
        stops: data.stops,
        comments: data.comments,
        endX: data.endX,
        endY: data.endY,
        length: data.length,
        favourites: data.favourites,
        userId: data.userId,
      } as Track);

    }
  }



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);

  };
  const handleFileChange = (event: any) => {
    const selectedImage = event.target.files[0];
    try {
      setImageToShow(URL.createObjectURL(selectedImage))
      setImage(selectedImage);

    } catch { }

  };
  useEffect(() => {

    let tempTrack = { ...track } as Track
    if (selectedValue === "start") {
      setAddressStart(address)
      tempTrack.startX = x;
      tempTrack.startY = y;
    } else {
      if (selectedValue === "end") {
        setAddressEnd(address)
        tempTrack.endX = x;
        tempTrack.endY = y;
      } else {
        if (selectedValue === "stop") {
          setAddressStop([...addressStop, address])
          setStops([...stops, { x: x, y: y, trackId: track.id }])

        }
      }
    }
    setTrack({ ...tempTrack })

  }, [address])
  function handleMinusStop(index: number) {
    let newAddressesStop = addressStop.slice(0, index).concat(addressStop.slice(index + 1))
    let newStops = stops.slice(0, index).concat(stops.slice(index + 1))
    setAddressStop(newAddressesStop)
    setStops(newStops)
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (track) {
      const token = localStorage.getItem('user')
      if (!isValidToken(token)) {
        alert("you are not logged in")
        navigate('/')
      }

      let dataToSend = {
        id: track.id,
        companyForTripId: (getOptionByDescription(companies,company) !== 0) ? getOptionByDescription(companies,company) : track.companyForTripId,
        pictureFile: image,
        viewId: (getOptionByDescription(views,view) !== 0) ? getOptionByDescription(views,view) : track.viewId,
        dayPartId: (getOptionByDescription(dayParts,dayPart) !== 0) ? getOptionByDescription(dayParts,dayPart) : track.dayPartId,
        levelId: (getOptionByDescription(levels,level) !== 0) ? getOptionByDescription(levels,level) : track.levelId,
        created: track.created,
        title: track.title,
        description: track.description,
        startX: track.startX,
        startY: track.startY,
        stops: [],
        comments: track.comments,
        endX: track.endX,
        endY: track.endY,
        length: track.length,
        favourites: track.favourites,
        userId: track.userId
      } as Track;
      if (isValidTrackToUpdate(dataToSend)) {
        const formData = new FormData(event.currentTarget);
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
        formData.append('id', dataToSend.id.toString());
        formData.append('created', dataToSend.created.toString());
        formData.append('length', dataToSend.length.toString());
        try {
          formData.append('userId', user!.id.toString());
          try {
            setOpen(true)
            setText("מעדכן מסלול")
            let response = await updateTrackApi(track.id, formData)
            setText("מסלול עודכן")
            stops.forEach(async (value: Omit<Stop, 'id'>, index) => {
              try {
                if (isValidStopToAdd(value)) {
                  setText("saving stop: " + index.toString())
                  value.trackId = dataToSend.id;
                  let newStop = await addStop(value);
                  dataToSend.stops = [...dataToSend.stops, newStop.data]
                  setText("העצירה נשמרה")
                } else {
                  alert("העצירה לא התווספה")
                  console.error(value)
                }

              } catch (error) {
                console.log(error)
              }
            });
            originalStops.forEach(async (value) => {
              await deleteStop(value.id)
            });

            setText("הכל נשמר בהצלחה")

            dispatch(updateTrackSlice(dataToSend))
            setOpen(false)
          } catch (error) {
            console.error(error)
            setOpen(false)
          }
         navigate(`${PATHS.myTracks}`)
        } catch (error) {
          setOpen(false)
          console.error('Error sending data:', error);
        }
      } else {
        alert("חלק מנתונים לא תקינים,\nאנא בדוק שוב את הפרטים")
      }
    }
  }

  return <>
    <Box component={'form'} noValidate onSubmit={handleSubmit}>
      <BasicModal open={open} text={text} />
      <Grid container gap={2} alignItems={"center"} justifyContent={"center"}>
        <Grid xs={12} alignItems={"center"} alignContent={"center"} marginTop={'100px'} gap={3} justifyContent={"space-around"}>
          <Avatar sx={{ bgcolor: grey[500], marginLeft: '35%', marginRight: '50%', marginBottom: '50px', width: '400px', height: '400px' }} src={imageToShow} variant="rounded" />
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
        <Grid item xs={12} sx={{ display: "block", marginTop: '0px' }}>
          <TextField
            autoComplete="title"
            name="title"
            required
            defaultValue={data?.title}
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
            defaultValue={data?.description}
            rows={4}
            id="description"
            label="description"
            autoFocus
          />
        </Grid>
        <Grid xs={3} >
          <TextField
            sx={{ paddingBottom: '15px' }}
            required
            fullWidth
            key={`start`}
            name="addressStart"
            label="Address Start"
            type="address"
            id="addressStart"
            autoComplete="new-address"
            value={addressStart}
          />

          {addressStop.length > 0 && addressStop.map((stop, index) => {
            return <><div style={{ display: "inline" }}><TextField
              required
              fullWidth

              name="addressStop"
              label="Address Stop"
              type="address"
              id={index.toString()}
              key={`stop${index}`}
              autoComplete="new-address"
              value={stop}
              sx={{ display: "inline", marginBottom: '5px' }}
            /></div>
              <div style={{ display: "inline" }}><Button onClick={() => { handleMinusStop(index) }} sx={{ display: "inline" }}>-</Button></div>
            </>
          })}
          <TextField
            sx={{ marginBottom: '5px' }}
            required
            fullWidth
            name="addressEnd"
            label="Address End"
            type="address"
            id="addressEnd"
            key={`end`}
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
          <Map setAddress={setAddress} setX={setX} setY={setY} />
        </Grid>
        <Grid item xs={12} >
          <Autocomplete
            disablePortal
            id="level"
            key={'level'}
            defaultValue={getOptionById(levels,track?.levelId)}
            inputValue={level}
            onInputChange={(event, newInputValue) => {
              console.log("level changed")
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
            key={'dayPart'}
            inputValue={dayPart}
            defaultValue={getOptionById(dayParts,track?.dayPartId)}
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
            key={'company'}
            inputValue={company}
            defaultValue={getOptionById(companies,track?.companyForTripId)}
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
            key={'view'}
            defaultValue={getOptionById(views,track?.viewId)}
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
            defaultValue={track.length}
            key={'length'}
            valueLabelDisplay="auto"
            shiftStep={1}
            step={1}
            marks={marks}
            min={1}
            max={100}
            value={track?.length}
            onChange={(event: any, newInputValue: any) => {
              let tempTrack = { ...track } as Track
              tempTrack.length = parseInt(newInputValue.toString());
              setTrack({ ...tempTrack })
            }}
          />
        </Grid>

      </Grid>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2, width: '300px' }}
      >
        Update Track
      </Button>
    </Box>
  </>
}


