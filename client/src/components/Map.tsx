import React from "react";
import {
  MapContainer,
  Circle,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LocationMarker } from "./Location";
import { Location } from "../types/location";
import { Box, Text } from "@radix-ui/themes";
import { Migration } from "../types/migration";

interface Props {
  location: Location | undefined;
  migrations: Migration[];
  onClick?: (location: Location) => void;
  onLocationFound?: (location: Location) => void;
}

const MapLocation = ({
  onClick,
  onLocationFound,
}: Pick<Props, "onClick" | "onLocationFound">) => {
  useMapEvents({
    click: ({ latlng: { lat, lng } }) => {
      onClick?.({ lat, lng });
    },
    locationfound: ({ latlng: { lat, lng } }) => {
      onLocationFound?.({ lat, lng });
    },
  });
  return <></>;
};

export const Map = ({
  migrations,
  location = { lat: -8.05, lng: -34.900002 },
  onClick = () => {},
  onLocationFound = () => {},
}: Props) => {
  return (
    <MapContainer
      center={location ? [location.lat, location.lng] : undefined}
      zoom={13}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker lat={location?.lat} lng={location?.lng} />
      <MapLocation onClick={onClick} onLocationFound={onLocationFound} />
      {migrations.map((migration) => (
        <Circle center={migration.location} radius={100}>
          <Popup>
            <Box>
              <Text>Date: {migration.date}</Text>
            </Box>
            <Box>
              <Text>Species: {migration.species}</Text>
            </Box>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};
