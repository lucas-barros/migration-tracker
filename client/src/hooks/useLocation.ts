import { LocationEvent, Map } from "leaflet";
import { useEffect, useState } from "react";

export const useCurrentLocation = (
  map: Map,
): LocationEvent["latlng"] | undefined => {
  const [currentLocation, setCurrentLocation] =
    useState<LocationEvent["latlng"]>();
  useEffect(() => {
    map.locate().on("locationfound", (e: LocationEvent) => {
      setCurrentLocation(e.latlng);
    });
  }, [map]);

  return currentLocation;
};
