import React from 'react';
import GoogleMapReact from 'google-map-react';
import  { useParams } from "react-router-dom";
import { database } from 'src/lib/firebase';
 import { calculateAndDisplayRoute} from "./helpers/directions";
 
const DriverMarker = ({ text, lat, lng }: { text: string, lat: number, lng: number }) => <div><img src="https://www.cyclestreets.net/images/categories/iconsets/cyclestreets/svg/track_neutral.svg" width="30" height="30"/></div>;

interface ITrackingInfo {
  current_location: {
    lat: number
    lng: number
  }
  location_detail: {
    distance: string
    duration: string
    start_address: string
    end_address: string
  }
}

const Map =() => { 
const { tracking_number } = useParams();
const [trackingInfo, setTrackingInfo] = React.useState<ITrackingInfo | null>(null);

/**
 * Firebase database listener order_tracker
 */
const getTrackerData = () => { 
    const starCountRef = database.ref(`/order_tracker/`).child(tracking_number);
    starCountRef.on('value', function(snapshot) {
        console.log( snapshot.val())
        if(snapshot.val()){
          setTrackingInfo(snapshot.val())
        }
    }); 
}

const handleGoogleLoad = React.useCallback(({map, maps}) => { 
  const directionsService = new maps.DirectionsService();
  const directionsRenderer = new maps.DirectionsRenderer();
  const origin = trackingInfo?.location_detail?.start_address;
  const destination = trackingInfo?.location_detail?.end_address
  calculateAndDisplayRoute(directionsService, directionsRenderer, maps, origin, destination);
  directionsRenderer.setMap(map);
}, [trackingInfo])

React.useEffect(()=>{
    getTrackerData()
},[]);
 

  const mapConfig = {
    center: {
      lat: trackingInfo?.current_location?.lat || 0,
      lng: trackingInfo?.current_location?.lng || 0
    },
    zoom: 15
  };  

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        {trackingInfo && <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API || "" }}
          defaultCenter={mapConfig.center}
          defaultZoom={mapConfig.zoom}
          onGoogleApiLoaded={handleGoogleLoad}
          yesIWantToUseGoogleMapApiInternals
        >
          <DriverMarker
            lat={trackingInfo?.current_location?.lat}
            lng={trackingInfo?.current_location?.lng}
            text="DriverMarker"
          />
        </GoogleMapReact>}
      </div>
    ); 
}

export default Map;