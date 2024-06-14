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
import { Badge, Box, Text } from "@radix-ui/themes";
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
      {migrations.map((migration) => {
        const date = new Date(migration.date);
        const now = new Date();
        return (
          <Circle key={migration.id} center={migration.location} radius={100}>
            <Popup>
              {date < now ? (
                <Badge color="green" variant="solid">
                  Completed
                </Badge>
              ) : (
                <Badge color="orange" variant="solid">
                  in progress
                </Badge>
              )}
              <Box>
                <Text>Date: {date.toDateString()}</Text>
              </Box>
              <Box>
                <Text>Species: {migration.species}</Text>
              </Box>
            </Popup>
          </Circle>
        );
      })}
    </MapContainer>
  );
};
