import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Track } from '../types/Track';
// import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Autocomplete, Button, Grid, Paper, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLevel } from '../redux/level/level.selector';
import { selectView } from '../redux/view/view.selector';
import { selectDayPart } from '../redux/dayPart/dayPart.selector';
import { selectCompany } from '../redux/company/company.selector';
import { Filter } from '../types/Filter.types';
import CardTrack from '../components/CardTrack';
import { getDescriptionArray } from '../utils/Mapper';

import { isValidToken } from "../auth/auth.utils";
const areas = [
  "north"
  , "center"
  , "south"
]
const drawerWidth = 240;

export default function TrackFind(props: { tracks: Track[] | null, setDesc: (desc: string) => void, setFilter: (filter: Filter) => void, setDecFavIndex: undefined | ((index: number) => void), setIncFavIndex: undefined | ((index: number) => void) }) {
  const [page, setPage] = React.useState(1);
  const levels = useSelector(selectLevel)
  const views = useSelector(selectView)
  const token = localStorage.getItem('user')
  const dayParts = useSelector(selectDayPart)
  const companies = useSelector(selectCompany)

  const [tracks, setTracks] = useState<Track[]>([])
  const [filter, setFilter] = useState<Filter>({
    area: "north",
    level: "",
    company: "",
    dayPart: "",
    view: ""
  })

  const [desc, setDesc] = useState("")
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  
  const onChangeEndler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if(isValidToken(localStorage.getItem('user'))){
      setDesc(value)
    }else{
      alert("please login for more options!")
    }
  }
  const handleFilterSubmit = () => {
    if (filter.area === undefined) {
      alert("area is required")
    } else {


      props.setFilter({ ...filter })
    }
  }
  const handleDescSubmit = () => {
    props.setDesc(desc)
  }

  return <>




    <Box sx={{ display: 'flex' }}>
      <CssBaseline />




      <Paper sx={{ position: "static", height: "100vh", paddingBottom: "10px" }} elevation={1} >
        <Toolbar sx={{ zIndex: -1 }} >

        </Toolbar>
        <List >
          <ListItem>
            <TextField id="outlined-basic" label="enter your description here" variant="outlined"
              value={desc}
              onChange={onChangeEndler}
              fullWidth
            /></ListItem>
          <ListItem>
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={handleDescSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Submit filter
            </Button>
          </ListItem>
          <Divider />
          <ListItem>
            <Autocomplete


              disablePortal
              id="combo-box-demo"
              defaultValue={filter.area}
              options={areas}
              inputValue={filter.area}
              aria-label="area"
              onInputChange={(event, value) => {
                setFilter({ ...filter, ["area"]: value })
                console.log(filter)
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Areas" />}
            />
          </ListItem>
        </List>
        <Divider />
        <List sx={{}}>
          <ListItem>
            <Autocomplete
              disablePortal
              id="level"

              options={getDescriptionArray(levels)}
              inputValue={filter.level}
              onInputChange={(event, value) => {
                setFilter({ ...filter, ["level"]: value })
                console.log(filter)
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Levels" />}
            />

          </ListItem>
          <ListItem>
            <Autocomplete
              disablePortal
              id="view"
              defaultValue={filter.view}
              options={getDescriptionArray(views)}
              inputValue={filter.view}
              onInputChange={(event, value) => {
                setFilter({ ...filter, ["view"]: value })
                console.log(filter)
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Views" />}
            />
          </ListItem>
          <ListItem>
            <Autocomplete
              disablePortal
              id="dayPart"
              options={getDescriptionArray(dayParts)}
              inputValue={filter.dayPart}
              onInputChange={(event, value) => {
                setFilter({ ...filter, ["dayPart"]: value })
                console.log(filter)
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Day Parts" />}
            />
          </ListItem>
          <ListItem>
            <Autocomplete
              disablePortal
              id="company"
              options={getDescriptionArray(companies)}
              inputValue={filter.company}
              onInputChange={(event, value) => {
                setFilter({ ...filter, ["company"]: value })
                console.log(filter)
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Companies" />}
            />
          </ListItem>
          <ListItem>
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={handleFilterSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Submit filter
            </Button>
          </ListItem>
        </List>
        <List>

        </List>
      </Paper>
      <Box>
        <Grid container gap={2}>
          {(props.tracks !== null && props.tracks !== undefined && props.tracks.length > 0) ? props.tracks.map((track: any) => {
            return (<Grid item xs={12} md={3} key={track.id}>
              <CardTrack track={track} myTrack={false} hasToken={token !== undefined && token !== null && token !== ""} setIndexToDelete={undefined} setDecFavIndex={props.setDecFavIndex} setIncFavIndex={props.setIncFavIndex} />
            </Grid>);
          }) : <></>}
        </Grid>
      </Box>
    </Box>

  </>
}