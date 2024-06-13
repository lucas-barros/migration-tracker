import React, { useState } from "react";
import { Box, Grid, Heading } from "@radix-ui/themes";
import { Map } from "../components/Map";
import { useMigrations } from "../hooks/useMigrations";
import { Location } from "../types/location";

export const Citizen = () => {
  const [location, setLocation] = useState<Location | undefined>();
  const { data = [] } = useMigrations();

  return (
    <Grid columns="2" gap="3" width="auto" height="100vh">
      <Box p="4">
        <Heading as="h3" size="6">
          Citizen
        </Heading>
      </Box>
      <Map
        migrations={data}
        location={location}
        onLocationFound={(location) => {
          setLocation(location);
        }}
      />
    </Grid>
  );
};
