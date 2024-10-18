import { useEffect } from "react";
import { useMap } from "../hooks/useMap";
import MapMarker from "./MapMarker";
import { PlaceType } from "./mapTypes";

interface MapMarkerControllerProps {
  places: PlaceType[];
  selectedPlaceId?: string;
}

const MapMarkerController = (props: MapMarkerControllerProps) => {
  const map = useMap();

  useEffect(() => {
    if (props.places.length < 1) {
      return;
    }
    const bounds = new kakao.maps.LatLngBounds();
    for (const place of props.places) {
      bounds.extend(place.position);
    }
    map.setBounds(bounds);
  }, [props.places]);

  return (
    <>
      {props.places.map((place, index) => (
        <MapMarker
          key={place.id}
          place={place}
          index={index}
          showInfo={props.selectedPlaceId === place.id}
        />
      ))}
    </>
  );
};

export default MapMarkerController;
