import React from 'react';
import GoogleMapReact from 'google-map-react';
import  { useParams } from "react-router-dom";
import { database } from 'src/lib/firebase';
import { string } from 'prop-types';

const AnyReactComponent = ({ text, lat, lng }: { text: string, lat: number, lng: number }) => <div>{text}</div>;

interface ITrackingInfo {
  current_location: {
    lat: number
    lng: number
  }
  location_detail: {
    distance: string
    duration: string
    star_address: string
    end_address: string
  }
}

const Map =() => { 
const { tracking_number } = useParams();
const [trackingInfo, setTrackingInfo] = React.useState<ITrackingInfo | null>(null);
const getTrackerData = () => { 

    const starCountRef = database.ref(`/order_tracker/`).child(tracking_number);

    starCountRef.on('value', function(snapshot) {
        console.log( snapshot.val())
        if(snapshot.val()){
          setTrackingInfo(snapshot.val())
        }
    }); 
}

React.useEffect(()=>{
    getTrackerData()
},[]);

  const mapConfig = {
    center: {
      lat: trackingInfo?.current_location?.lat || 0,
      lng: trackingInfo?.current_location?.lng || 0
    },
    zoom: 13
  };  

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        {trackingInfo && <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API || "" }}
          defaultCenter={mapConfig.center}
          defaultZoom={mapConfig.zoom}
        >
          <AnyReactComponent
            lat={trackingInfo?.current_location?.lat}
            lng={trackingInfo?.current_location?.lng}
            text="Driver"
          />
        </GoogleMapReact>}
      </div>
    ); 
}

export default Map;