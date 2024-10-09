import React, { useEffect, useState } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, OverlayView } from '@react-google-maps/api';

interface Coordinate {
  lat: number;
  lng: number;
}

interface Stop {
  x: number;
  y: number;
}

interface Track {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  stops: Stop[];
}

interface MapProps {
  track: Track;
  apiKey: string;
}

const MapComponent: React.FC<MapProps> = ({ track, apiKey }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}?v=beta`;
    script.async = true;
    script.onload = () => {
      fetchDirections();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey]);

  const fetchDirections = () => {
    const directionsService = new google.maps.DirectionsService();

    const waypoints = track.stops.map(stop => ({
      location: new google.maps.LatLng(stop.x, stop.y),
      stopover: true,
    }));

    const origin = new google.maps.LatLng(track.startX, track.startY);
    const destination = new google.maps.LatLng(track.endX, track.endY);

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Directions service failed due to ${status}`);
        }
      }
    );
  };

  const renderMarkers = () => (
    <>
      {/* Marker for the start point */}
      <OverlayView
        position={{ lat: track.startX, lng: track.startY }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={(width, height) => ({ x: -(width / 2), y: -height })}
      >
        <div style={{ position: 'absolute', background: 'red', color: 'white', padding: '5px', borderRadius: '50%' }}>
          S
        </div>
      </OverlayView>
      {/* Marker for the end point */}
      <OverlayView
        position={{ lat: track.endX, lng: track.endY }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={(width, height) => ({ x: -(width / 2), y: -height })}
      >
        <div style={{ position: 'absolute', background: 'blue', color: 'white', padding: '5px', borderRadius: '50%' }}>
          E
        </div>
      </OverlayView>
      {track.stops.map((stop, index) => (
        <OverlayView
          key={index}
          position={{ lat: stop.x, lng: stop.y }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={(width, height) => ({ x: -(width / 2), y: -height })}
        >
          <div style={{ position: 'absolute', background: 'green', color: 'white', padding: '5px', borderRadius: '50%' }}>
            {index + 1}
          </div>
        </OverlayView>
      ))}
    </>
  );

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMap center={{ lat: track.startX, lng: track.startY }} zoom={10} mapContainerStyle={{ height: '100%', width: '100%' }}>
        {directions && <DirectionsRenderer directions={directions} />}
        {renderMarkers()}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;

