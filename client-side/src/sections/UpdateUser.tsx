import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from '../utils/axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, AutocompleteChangeDetails, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectExperience } from '../redux/experience/experience.selector';
import { selectStatus } from '../redux/status/status.selector';
import { useEffect, useState } from 'react';
import Map from '../components/Map';
import exp from 'constants';
import { DoNotStepOutlined } from '@mui/icons-material';
import { User } from '../types/user.types';
import { selectUser } from '../redux/user/user.selector';
import { addUser } from '../redux/user/user.thunk';
import { addUser as addUserApi, Login, updateUser as UpdateUserApi } from '../services/user';
import { addUser as addUserSlice, updateUser as UpdateUserSlice } from '../redux/user/user.slice';
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import getAddressByCoordinates from '../services/GoogleMaps.services';
import { useJsApiLoader } from '@react-google-maps/api';
import { k as apikey } from '../utils/projectdata';
import { isValidEmail, isValidUserToAdd, isValidUserToUpdate } from '../utils/validation.utils';
import { thisIsMe } from '../utils/authorizeAccess.uril';
import { updateUser as updateUserThunk } from '../redux/user/user.thunk';
import { useAppDispatch } from '../redux/store';
import { stringToBlob } from '../utils/stringToBlob.utils';
import { getDescriptionArray, getOptionByDescription, getOptionById } from '../utils/Mapper';
import { PATHS } from '../routes/paths';
const defaultTheme = createTheme();

export default function UpdateUser() {
  const params = useParams();
  const mydata: any = useLoaderData()
  const birthDate = mydata.birthDate ? new Date(mydata.birthDate).toISOString().split('T')[0] : '';
  const experiences = useSelector(selectExperience)
  const statuses = useSelector(selectStatus)
  const [address, setAddress] = useState("")
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser).user
  const [imageToShow, setImageToShow] = useState<string | undefined>(undefined)
  const [x, setX] = useState(0)
  const navigate = useNavigate()
  const [y, setY] = useState(0)
  const [st, setSt] = useState<string>("single")
  const [ex, setEx] = useState<string>("junior")
  const [image, setImage] = useState<any>();
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [isInit, setIsInit] = useState(false)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apikey,
    language: 'he',
  });
  useEffect(() => {
    if (isLoaded) {
      setGeocoder(new window.google.maps.Geocoder());
    }
  }, [isLoaded]);
  init();
  async function init() {
    if (!isInit && mydata && geocoder) {
      let ad;
      try {
        ad = await getAddressByCoordinates(geocoder, { lat: mydata.adressX, lng: mydata.adressY });
      } catch (e) {
        console.log(e)
        ad = "pick home address"
      }
      setAddress(ad);
      setEx(getOptionById(experiences,mydata.experienceId))
      try {
        if (user) {
          const blob = stringToBlob(user!.pictureBytes, null, null);
          const url = URL.createObjectURL(blob);
          setImageToShow(url);
          setImage(blob)
        } else {
          console.error('Failed to fetch picture');
        }
      } catch (error) {
        console.error('Error fetching picture:', error);
      }
      setSt(getOptionById(statuses,mydata.statusId))
      setX(mydata.adressX)
      setY(mydata.adressY)

      setIsInit(!isInit)
    }

  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('user')
    const data = new FormData(event.currentTarget);
    const dataToSend = {
      id: mydata.id,
      pictureFile: image,
      myTracks: mydata.tracks,
      favourites: mydata.favourites,
      mail: mydata.mail,
      profilePicture: imageToShow,
      experienceId: getOptionByDescription(experiences,ex),
      statusId: getOptionByDescription(statuses,st),
      birthDate: data.get('birthDate'),
      name: data!.get('Name'),
      addressX: x,
      addressY: y,
    } as User;
    if (isValidUserToUpdate(dataToSend)) {
      const formData = new FormData();
      formData.append('name', dataToSend.name);
      formData.append('mail', mydata.mail);
      formData.append('id', mydata.id);
      formData.append('profilePicture', dataToSend.pictureFile)

      formData.append('pictureFile', image!);
      formData.append('experienceId', getOptionByDescription(experiences,ex).toString());
      formData.append('statusId', getOptionByDescription(statuses,st).toString());
      formData.append('birthDate', (data.get('birthDate') !== '' && data.get('birthDate') !== undefined && data.get('birthDate') !== null) ? data.get('birthDate') : mydata.birthDate.toString());
      formData.append('adressX', x.toString());
      formData.append('adressY', y.toString());
      try {

        dispatch(updateUserThunk(formData, dataToSend))
        navigate(`${PATHS.home}`)
      } catch (error: any) {
        console.error('Error sending data:', error);
        alert(error.response)
      }
    } else {
      alert("some of the data is invalid,\nplease double check your input.")
    }

  };
  const handleFileChange = (event: any) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    if (selectedImage === undefined || selectedImage === null) {
      setImageToShow(undefined)
    } else {
      setImageToShow(URL.createObjectURL(selectedImage))
    }

  };




  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {image && <Avatar alt="Uploaded" src={imageToShow} style={{ width: 150, height: 150 }} />}
          <Grid item xs={12}>
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
          <Typography component="h1" variant="h5">
            My Profile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* Display the selected image as Avatar */}

              </Grid>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  defaultValue={mydata.name}
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} >
                <Autocomplete
                  disablePortal
                  id="experience"
                  defaultValue={getOptionById(experiences,mydata.experienceId)}
                  inputValue={ex}
                  onInputChange={(event, newInputValue) => {
                    setEx(newInputValue);
                  }}
                  options={getDescriptionArray(experiences)}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Experience" />}
                />
              </Grid>
              <Grid item xs={12} >
                <Autocomplete
                  disablePortal
                  id="status"
                  options={getDescriptionArray(statuses)}
                  defaultValue={getOptionById(statuses,mydata.statusId)}
                  sx={{ width: 300 }}
                  inputValue={st}
                  onInputChange={(event, newInputValue) => {
                    setSt(newInputValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="Status" />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  disabled
                  defaultValue={mydata.mail}
                  id="email"
                  label="Email Address"
                  name="mail"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  defaultValue={birthDate}
                  id="birthDate"
                  label="Birth Date"
                  name="birthDate"
                  autoComplete="birthDate"
                  type="date"
                />
              </Grid>
              <Grid item xs={12}>
                <Map setAddress={setAddress} setX={setX} setY={setY} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="address"
                  id="address"
                  autoComplete="new-address"
                  value={address}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"

              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}