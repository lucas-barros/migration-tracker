import * as React from "react";
import { useEffect } from "react";
import { Marker, useMap } from "react-leaflet";

interface Props {
  lat?: number;
  lng?: number;
}

export const LocationMarker = ({ lat, lng }: Props) => {
  const map = useMap();

  useEffect(() => {
    map.locate();
  }, [map]);

  useEffect(() => {
    if (lat && lng) {
      map.flyTo({ lat, lng }, map.getZoom());
    }
  }, [map, lat, lng]);

  if (!lat || !lng) {
    return <></>;
  }

  return <Marker position={{ lat, lng }}></Marker>;
};
