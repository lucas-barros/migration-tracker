import { useState, useEffect } from "react";
import { name as appName, version as appVersion } from "../../package.json";

interface Response {
  address: {
    city: string;
    country: string;
    road: string;
    state: string;
    house_number: string;
  };
}

export const useReverseGeocoding = ({
  lat,
  lng,
}: {
  lat?: number;
  lng?: number;
}) => {
  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (lat && lng) {
      const fetchLocationData = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            {
              headers: {
                "User-Agent": `${appName}v${appVersion}`,
              },
            },
          );
          if (!response.ok) {
            throw new Error("Failed reverse geocoding");
          }
          const {
            address: {
              city = "",
              country = "",
              house_number = "",
              road = "",
              state = "",
            },
          }: Response = await response.json();
          setLocation(`${house_number} ${road}, ${city}, ${state}. ${country}`);
        } catch (error) {
          setError(error as Error);
        }
      };

      fetchLocationData();
    }
  }, [lat, lng]);

  return { location, error };
};
