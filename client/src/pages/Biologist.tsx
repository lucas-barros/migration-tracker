import React, { useEffect, useState } from "react";
import { Box, Callout, Grid, Heading } from "@radix-ui/themes";
import { Map } from "../components/Map";
import { useReverseGeocoding } from "../hooks/useReverseGeocoding";
import { useMigrationForm } from "../hooks/useMigrationForm";
import { CreateMigration } from "../components/CreateMigration";
import { useMigrations } from "../hooks/useMigrations";
import { Location } from "../types/location";

export const Biologist = () => {
  const [visible, setVisible] = useState(false);
  const { migration, setMigration, mutation } = useMigrationForm();
  const { reversedLocation } = useReverseGeocoding(migration.location);
  const { data = [] } = useMigrations();
  const setLocation = (location: Location) => {
    setMigration((state) => ({
      ...state,
      location,
    }));
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [mutation.isSuccess]);

  return (
    <Grid columns="2" gap="3" width="auto" height="100vh">
      <Box p="4">
        <Box mb="2">
          <Heading as="h2" size="6">
            Biologist
          </Heading>
        </Box>
        <CreateMigration
          migration={migration}
          setMigration={setMigration}
          reversedLocation={reversedLocation}
          mutation={mutation}
        />
        {visible && (
          <Box mt="6">
            <Callout.Root variant="surface">
              <Callout.Text>Migration Created</Callout.Text>
            </Callout.Root>
          </Box>
        )}
      </Box>
      <Map
        migrations={data}
        location={migration.location}
        onClick={setLocation}
        onLocationFound={setLocation}
      />
    </Grid>
  );
};
