import React, { useEffect, useState } from 'react'
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from "react-google-maps";
import { compose, withProps } from "recompose";
import { useDispatch } from 'react-redux';

const Map = withScriptjs(withGoogleMap((props) => {
    return <GoogleMap
        onClick={ev => {
            props.setNewCoords(ev.latLng.lat(), ev.latLng.lng())
            localStorage.setItem("coords", JSON.stringify({
                lat: ev.latLng.lat(),
                lng: ev.latLng.lng()
            }))
            // props.setCoords(ev.latLng.lat(), ev.latLng.lng());
        }}
        defaultZoom={12}
        defaultCenter={{ ...props.coords }}
    >
        {props.isMarkerShown && (
            <Marker
                defaultDraggable
                clickable
                position={{ ...props.coords }}
                onClick={(e) => console.log(e.latLng.toJSON())}
            />
        )}
    </GoogleMap>
}))


const CustomGoogleMap = ({ ads, hide }) => {
    const [coords, setCoords] = useState(
        {
            lat: ads?.latitude,
            lng: ads?.longtitude
        }
    );
    const [isMarkerShown, setisMarkerShown] = useState(true);
    useEffect(() => {
        delayedShowMarker();
    })

    const delayedShowMarker = () => {
        setTimeout(() => {
            setisMarkerShown(true)
        }, 3000);
    };

    const handleMarkerClick = () => {
        setisMarkerShown(false)
        delayedShowMarker();
    };

    const setNewCoords = (lat, lng) => {
        setCoords({ ...coords, lat, lng })
        console.log(lat, lng)
        // setAds(prev => ({ ...prev, latitude: lat, longtitude: lng }));
        // hide();
    }
    return (
        <div >
            <Map
                googleMapURL=
                "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAjd3KagMprRGmE0PFOdRHLcGwN7mjKBOM"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                coords={coords}
                setCoords={setCoords}
                setNewCoords={setNewCoords}
                isMarkerShown={isMarkerShown}
                onMarkerClick={handleMarkerClick}
            />
        </div>
    )
}

export default CustomGoogleMap