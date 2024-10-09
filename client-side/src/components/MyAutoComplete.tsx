import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { selectStatus } from "../redux/status/status.selector";

const MyAutocomplete = (props:{ onChange:(value:any)=>void }) => {
    const status = useSelector(selectStatus)
    const handleInputChange = (event:any, value:any) => {
        if (value) {
          props.onChange(value);
        } else {
          props.onChange(null);
        }
      };

  return (
    <Autocomplete
      disablePortal
      id="status"
      options={status}
      sx={{ width: 300 }}
      onChange={handleInputChange} 
      onInputChange={handleInputChange}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default MyAutocomplete;
