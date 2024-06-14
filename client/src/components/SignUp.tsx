import React from "react";
import {
  Text,
  Box,
  Button,
  Flex,
  TextField,
  Skeleton,
  Callout,
  Code,
} from "@radix-ui/themes";
import * as RadixForm from "@radix-ui/react-form";
import { AuthForm, AuthFormMutation, SetForm } from "../hooks/useAuthForm";

interface Props {
  form: AuthForm;
  reversedLocation: string;
  setForm: SetForm;
  mutation: AuthFormMutation;
}

export const SignUp = ({
  form,
  reversedLocation,
  setForm,
  mutation,
}: Props) => {
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(form);
  };

  return (
    <RadixForm.Root onSubmit={submit}>
      <Box mb="5">
        <Flex direction="column">
          <Text as="label" size="2" weight="medium" mb="2" htmlFor="name">
            <Skeleton loading={mutation.isPending}>Name</Skeleton>
          </Text>
          <Skeleton loading={mutation.isPending}>
            <RadixForm.Field name="name">
              <RadixForm.Control asChild required>
                <TextField.Root
                  id="name"
                  type="text"
                  variant="classic"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      name: e.target.value,
                    }))
                  }
                />
              </RadixForm.Control>
              <RadixForm.Message match="valueMissing">
                <Text as="span" size="1" mb="2" color="red">
                  Name is required
                </Text>
              </RadixForm.Message>
            </RadixForm.Field>
          </Skeleton>
        </Flex>
      </Box>
      <Box mb="5">
        <Flex direction="column">
          <Text as="label" size="2" weight="medium" mb="2" htmlFor="email">
            <Skeleton loading={mutation.isPending}>Email address</Skeleton>
          </Text>
          <Skeleton loading={mutation.isPending}>
            <RadixForm.Field name="email">
              <RadixForm.Control asChild required>
                <TextField.Root
                  id="email"
                  type="email"
                  variant="classic"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      email: e.target.value,
                    }))
                  }
                />
              </RadixForm.Control>
              <RadixForm.Message match="valueMissing">
                <Text as="span" size="1" mb="2" color="red">
                  Email is required
                </Text>
              </RadixForm.Message>
              <RadixForm.Message match="typeMismatch">
                <Text as="span" size="1" mb="2" color="red">
                  Please enter a valid email
                </Text>
              </RadixForm.Message>
            </RadixForm.Field>
          </Skeleton>
        </Flex>
      </Box>

      <Box mb="5" position="relative">
        <Flex direction="column">
          <Text as="label" size="2" weight="medium" mb="2" htmlFor="password">
            <Skeleton loading={mutation.isPending}>Password</Skeleton>
          </Text>
          <Skeleton loading={mutation.isPending}>
            <RadixForm.Field name="password">
              <RadixForm.Control asChild required>
                <TextField.Root
                  id="password"
                  variant="classic"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      password: e.target.value,
                    }))
                  }
                />
              </RadixForm.Control>
              <RadixForm.Message match="valueMissing">
                <Text as="span" size="1" mb="2" color="red">
                  Password is required
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
            <RadixForm.Field name="location">
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
              <RadixForm.Message match="valueMissing">
                <Text as="span" size="1" mb="2" color="red">
                  Location is required
                </Text>
              </RadixForm.Message>
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
              Create an account
            </Button>
          </RadixForm.Submit>
        </Skeleton>
      </Flex>

      <Box mt="6">
        <Callout.Root variant="surface">
          <Callout.Text>
            Use an email from <Code>biology.com</Code> domain to create a
            Biologist account
          </Callout.Text>
        </Callout.Root>
      </Box>
    </RadixForm.Root>
  );
};
