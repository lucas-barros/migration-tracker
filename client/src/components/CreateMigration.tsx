import React from "react";
import {
  Section,
  Text,
  Box,
  Button,
  Flex,
  Heading,
  TextField,
  Skeleton,
  Grid,
} from "@radix-ui/themes";
import { Map } from "./Map";
import { useReverseGeocoding } from "../hooks/useReverseGeocoding";

export const CreateMigration = () => {
  const [isLoading] = React.useState(false);
  const [location, setLocation] = React.useState<{
    lat: number;
    lng: number;
  }>();
  const [locationText, setLocationText] = React.useState<string>("");
  const { location: reversedLocation } = useReverseGeocoding(location ?? {});

  return (
    <Grid columns="2" gap="3" width="auto" height="100vh">
      <Section>
        <form>
          <Box height="40px" mb="4">
            <Heading as="h3" size="6" mt="-1">
              <Skeleton loading={isLoading}>Create Migration</Skeleton>
            </Heading>
          </Box>

          <Box mb="5">
            <Flex direction="column">
              <Text as="label" size="2" weight="medium" mb="2" htmlFor="email">
                <Skeleton loading={isLoading}>Species</Skeleton>
              </Text>
              <Skeleton loading={isLoading}>
                <TextField.Root
                  id="species"
                  type="text"
                  variant="classic"
                  placeholder="Enter the species"
                />
              </Skeleton>
            </Flex>
          </Box>

          <Box mb="5">
            <Flex direction="column">
              <Text as="label" size="2" weight="medium" mb="2" htmlFor="date">
                <Skeleton loading={isLoading}>Date</Skeleton>
              </Text>
              <Skeleton loading={isLoading}>
                <TextField.Root
                  id="date"
                  type="datetime-local"
                  variant="classic"
                  placeholder="Enter the date"
                />
              </Skeleton>
            </Flex>
          </Box>

          <Box mb="5">
            <Flex direction="column">
              <Text
                as="label"
                size="2"
                weight="medium"
                mb="2"
                htmlFor="location"
              >
                <Skeleton loading={isLoading}>Location</Skeleton>
              </Text>
              <Skeleton loading={isLoading}>
                <TextField.Root
                  id="location"
                  type="text"
                  variant="classic"
                  placeholder="Enter the location"
                  value={locationText || reversedLocation || ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setLocationText(value);
                  }}
                />
              </Skeleton>
            </Flex>
          </Box>

          <Flex mt="6" justify="end" gap="3">
            <Skeleton loading={isLoading}>
              <Button variant="surface" highContrast color="gray">
                Create migration
              </Button>
            </Skeleton>
          </Flex>
        </form>
      </Section>
      <Box mt="-8px" mb="8px" mr="-8px">
        <Map
          lat={location?.lat}
          lng={location?.lng}
          onClick={(e) => {
            setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
          }}
          onLocationfound={(e) => {
            setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
          }}
        />
      </Box>
    </Grid>
  );
};
