import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { k as apikey } from '../utils/projectdata';
const containerStyle = {
  width: '400px',
  height: '500px',
};

const center = {
  lat: 32.073954,
  lng: 34.836038,
};

type MapType = google.maps.Map;
type Pos={
  lat:number,
  lng:number
}
function MyComponent(prop:{setAddress:(address:string)=>void,setX:(x:number)=>void,setY:(y:number)=>void}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apikey,
    language: 'he',
  });
  const [postion,setPosition]=useState<Pos>({lat:1,lng:1})

  const [map, setMap] = React.useState<MapType | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder|null>(null);
  const [marker, setMarker]=useState<any>(null);
  const onLoad = React.useCallback((map: MapType) => {
    setMap(map);
    map.addListener('click',(e:any)=>{
      onClickHandler({x:e.latLng.lat(),y:e.latLng.lng()})
    })
  }, []);

  const onUnmount = React.useCallback((map: MapType) => {
    setMap(null);
  }, []);
function onClickHandler({x,y}:any){
  setPosition({lat:x,lng:y})
  prop.setX(x)
  prop.setY(y)
}
 useEffect(() => {
    if (isLoaded) {
      setGeocoder(new window.google.maps.Geocoder());
    }
  }, [isLoaded]);
useEffect(()=>{
  if (geocoder) {
    geocoder.geocode({ location: {lat:postion.lat,lng:postion.lng} }, (results, status) => {
      if (status === 'OK') {
        if (results![0]) {
          prop.setAddress(results![0].formatted_address)
        } else {
          prop.setAddress('Address not found')
        }
      } else {
        prop.setAddress('Geocoder failed due to: ' + status)
      }
    });
  }
  // loadMarker();
  
    
},[postion])
async function loadMarker(){
  const {AdvancedMarkerElement} = await google.maps.importLibrary("marker")as google.maps.MarkerLibrary;
  setMarker(new AdvancedMarkerElement({
    map:map,
    position: {lat:postion.lat,lng:postion.lng},
    title: 'my Marker',
}));
}
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      onLoad={onLoad}
      onUnmount={onUnmount}
      
    >
    </GoogleMap>
  ) : (
    <>Loading...</>
  );
}

export default React.memo(MyComponent);
