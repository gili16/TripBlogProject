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
import { addUser as addUserApi, Login } from '../services/user';
import { addUser as addUserSlice } from '../redux/user/user.slice';
import { isValidEmail, isValidUsername, isValidUserToAdd } from '../utils/validation.utils';
import { useAppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../routes/paths';
import { getDescriptionArray, getOptionByDescription } from '../utils/Mapper';
const defaultTheme = createTheme();

export default function SignUpForm() {
  const [email, setEmail] = useState("")
  const experiences = useSelector(selectExperience)
  const statuses = useSelector(selectStatus)
  const [address, setAddress] = useState("")
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const user = useSelector(selectUser).user
  const [imageToShow, setImageToShow] = useState<string | undefined>(undefined)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [userName, setUserName] = useState("")
  const [st, setSt] = useState<string>("single")
  const [ex, setEx] = useState<string>("junior")
  const [image, setImage] = useState();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataToSend = {
      mail: data.get('mail'),
      profilePicture: imageToShow,
      experienceId: getOptionByDescription(experiences,ex),
      statusId: getOptionByDescription(statuses,st),
      birthDate: data.get('birthDate'),
      name: data!.get('Name'),
      addressX: x,
      addressY: y,
      pictureFile: image!
    } as Omit<User, 'id'>;
    if (isValidUserToAdd(dataToSend)) {
      const formData = new FormData(event.currentTarget);

      formData.append('pictureFile', image!);
      formData.append('experienceId', getOptionByDescription(experiences,ex).toString());
      formData.append('statusId', getOptionByDescription(statuses,st).toString());

      formData.append('adressX', x.toString());
      formData.append('adressY', y.toString());


      try {
        dispatch(addUser(formData))
        navigate(PATHS.home)
      } catch (error: any) {
        alert(error)
        console.error('Error sending data:', error);
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>

              </Grid>
              <Grid item xs={12} >
                <TextField
                  error={userName !== "" && !isValidUsername(userName)}
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  value={userName}
                  onChange={(event) => {
                    setUserName(event.target.value)
                  }}
                  id="Name"
                  label="Name"
                  autoFocus
                  helperText="user name may contain only numbers and character"
                />
              </Grid>

              <Grid item xs={12} >
                <Autocomplete
                  disablePortal
                  id="experience"
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
                  error={email !== "" && !isValidEmail(email)}
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                  }}
                  label="Email Address"
                  name="mail"
                  autoComplete="email"
                  helperText="please enter a valid email address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"

              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}