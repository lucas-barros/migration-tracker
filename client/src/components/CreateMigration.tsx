import React from "react";
import * as RadixForm from "@radix-ui/react-form";
import {
  Text,
  Box,
  Button,
  Flex,
  Heading,
  TextField,
  Skeleton,
} from "@radix-ui/themes";
import { MigrationMutation, SetMigration } from "../hooks/useMigrationForm";
import { MigrationForm } from "../types/migration";

interface Props {
  migration: MigrationForm;
  reversedLocation: string;
  setMigration: SetMigration;
  mutation: MigrationMutation;
}

export const CreateMigration = ({
  migration,
  reversedLocation,
  setMigration,
  mutation,
}: Props) => {
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(migration);
  };

  return (
    <RadixForm.Root onSubmit={submit}>
      <Box mb="4">
        <Heading as="h3" size="4">
          Create Migration
        </Heading>
      </Box>

      <Box mb="5">
        <Flex direction="column">
          <Text as="label" size="2" weight="medium" mb="2" htmlFor="species">
            <Skeleton loading={mutation.isPending}>Species</Skeleton>
          </Text>
          <Skeleton loading={mutation.isPending}>
            <RadixForm.Field name="species">
              <RadixForm.Control asChild required>
                <TextField.Root
                  id="species"
                  type="text"
                  variant="classic"
                  placeholder="Enter species"
                  value={migration.species}
                  onChange={(e) =>
                    setMigration((state) => ({
                      ...state,
                      species: e.target.value,
                    }))
                  }
                />
              </RadixForm.Control>
              <RadixForm.Message match="valueMissing">
                <Text as="span" size="1" mb="2" color="red">
                  Species is required
                </Text>
              </RadixForm.Message>
            </RadixForm.Field>
          </Skeleton>
        </Flex>
      </Box>

      <Box mb="5">
        <Flex direction="column">
          <Text as="label" size="2" weight="medium" mb="2" htmlFor="date">
            <Skeleton loading={mutation.isPending}>Date</Skeleton>
          </Text>
          <Skeleton loading={mutation.isPending}>
            <RadixForm.Field name="date">
              <RadixForm.Control asChild required>
                <TextField.Root
                  id="date"
                  type="datetime-local"
                  variant="classic"
                  placeholder="Enter the date"
                  value={migration.date}
                  onChange={(e) =>
                    setMigration((state) => ({
                      ...state,
                      date: e.target.value,
                    }))
                  }
                />
              </RadixForm.Control>
              <RadixForm.Message match="valueMissing">
                <Text as="span" size="1" mb="2" color="red">
                  Date is required
                </Text>
              </RadixForm.Message>
            </RadixForm.Field>
          </Skeleton>
        </Flex>
      </Box>

      <Box mb="5">
        <Flex direction="column">
          <Text as="label" size="2" weight="medium" mb="2" htmlFor="location">
            <Skeleton loading={mutation.isPending}>Location</Skeleton>
          </Text>
          <Skeleton loading={mutation.isPending}>
            <RadixForm.Field name="password">
              <RadixForm.Control asChild required>
                <TextField.Root
                  disabled
                  id="location"
                  variant="classic"
                  type="text"
                  placeholder="Pick a location in the map"
                  value={reversedLocation}
                />
              </RadixForm.Control>
            </RadixForm.Field>
          </Skeleton>
        </Flex>
      </Box>

      <Box mb="5">
        {mutation.isError && (
          <Text color="red" size="1">
            {mutation.error.response?.data.error}
          </Text>
        )}
      </Box>

      <Flex mt="6" justify="end" gap="3">
        <Skeleton loading={mutation.isPending}>
          <RadixForm.Submit asChild>
            <Button variant="surface" type="submit">
              Create migration
            </Button>
          </RadixForm.Submit>
        </Skeleton>
      </Flex>
    </RadixForm.Root>
  );
};
