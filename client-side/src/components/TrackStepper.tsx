import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Track } from '../types/Track';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { k as apiKey } from '../utils/projectdata';
import { useEffect, useState } from 'react';
import getAddressByCoordinates from '../services/GoogleMaps.services';

export default function TrackStepper(props:{track:Track}) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        language: 'he',
      });
      const [geocoder, setGeocoder] = useState<google.maps.Geocoder|null>(null);
      const[steps, setSteps]=useState<string[]|null>(null)
      useEffect(() => {
        if (isLoaded) {
          // Initialize the geocoder
          setGeocoder(new window.google.maps.Geocoder());
        }
      }, [isLoaded]);
      useEffect(()=>{
        fillMySteps();
      },[geocoder])
      async function fillMySteps() {
        try {
            let fillSteps = [] as string[];
    
            const startAddress = await getAddressByCoordinates(geocoder, { lat: props.track.startX, lng: props.track.startY });
            fillSteps.push(startAddress);
            if (props.track.stops) {
              for (const value of props.track.stops) {
                  const address = await getAddressByCoordinates(geocoder, { lat: value.x, lng: value.y });
                  fillSteps.push(address);
              }
          }
            const endAddress = await getAddressByCoordinates(geocoder, { lat: props.track.endX, lng: props.track.endY });
            fillSteps.push(endAddress);
    
            
    
            setSteps(fillSteps);
        } catch (error) {
        }
    }
    

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={steps?.length} orientation="vertical">
        {steps&&steps.map((label,index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}