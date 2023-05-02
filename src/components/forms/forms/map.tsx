import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { geocodeAddress } from "@/lib/googleMaps";
import debounce from "lodash.debounce";
import { useGoogleMapsAPIKey } from "@/hooks/useGoogleMapsApi";

import { BookmarkIcon} from '@heroicons/react/24/solid';
import { IconButtonTypeMap } from "@mui/material";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

const { apiKey } = useGoogleMapsAPIKey();
type MapInterface ={
    searchAddress:string;
    center:{lat:number,lng:number};
    markerPosition:{lat:number,lng:number};
    handleMapClick?:(e:any)=>void;
}



const Map: React.FC<MapInterface>= ({ 
    searchAddress, 
    center,
    markerPosition ,
    handleMapClick}) => {
    const [map, setMap] = useState(null);
    const [position, setPosition] = useState(center);

    const updatePosition = useCallback(
        debounce((address) => {
            geocodeAddress(address)
                .then((latLng) => {
                    setPosition(latLng);
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }, 500),
        []
    );
    
    useEffect(() => {
        
        if (typeof window === "undefined" || typeof window.google === "undefined") {
            return;
        }

        if (searchAddress) {
            updatePosition(searchAddress);
        } else {
            setPosition(center);
        }
    }, [searchAddress, updatePosition, center]);

    const onLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    const onMarkerLoad = (marker) => {
        console.log("marker: ", marker);
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries: ["places"],
    });
    
    
    return (
        <>
            {isLoaded && <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={position}
                zoom={8}
                onLoad={onLoad}
                onClick={handleMapClick}
            >
                {markerPosition && <Marker position={markerPosition} onLoad={onMarkerLoad} />}

            
                
            </GoogleMap>}
        </>
    );
};
export default Map;