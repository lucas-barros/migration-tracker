import React, { useState } from "react";
import { Box, Button, Grid, Heading, Table } from "@radix-ui/themes";
import { Map } from "../components/Map";
import { useMigrations } from "../hooks/useMigrations";
import { Location } from "../types/location";

export const Citizen = () => {
  const [location, setLocation] = useState<Location | undefined>();
  const { data = [] } = useMigrations();

  return (
    <Grid columns="2" gap="3" width="auto" height="100vh">
      <Box p="4">
        <Heading as="h3" size="6" mb="2">
          Citizen
        </Heading>
        <Heading as="h2" size="3" mb="4">
          Migrations
        </Heading>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Species</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((migration) => (
              <Table.Row>
                <Table.Cell>{migration.species}</Table.Cell>
                <Table.Cell>
                  {new Date(migration.date).toDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    variant="surface"
                    onClick={() => {
                      setLocation(migration.location);
                    }}
                  >
                    Go to location
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
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