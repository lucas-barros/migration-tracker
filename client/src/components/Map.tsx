import React from "react";
import { LeafletMouseEvent, LocationEvent } from "leaflet";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { LocationMarker } from "./Location";

interface Props {
  lat?: number;
  lng?: number;
  onClick?: (event: LeafletMouseEvent) => void;
  onLocationfound?: (event: LocationEvent) => void;
}

const Click = ({ onClick, onLocationfound }: Props) => {
  useMapEvents({
    click: (e) => {
      onClick?.(e);
    },
    locationfound: (location) => {
      onLocationfound?.(location);
    },
  });
  return <></>;
};

export const Map = ({
  lat = -2.163106,
  lng = -55.126648,
  onClick = () => {},
  onLocationfound = () => {},
}: Props) => {
  return (
    <MapContainer center={[lat, lng]} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker lat={lat} lng={lng} />
      <Click onClick={onClick} onLocationfound={onLocationfound} />
    </MapContainer>
  );
};
