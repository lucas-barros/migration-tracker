import React from "react";
import { Text, Box, Button, Flex, TextField, Skeleton } from "@radix-ui/themes";
import * as RadixForm from "@radix-ui/react-form";
import { Form, SetForm } from "../hooks/useAuthForm";

interface Props {
  form: Form;
  reversedLocation: string;
  setForm: SetForm;
  onSubmit: () => void;
}

export const SignUp = ({
  form,
  reversedLocation,
  setForm,
  onSubmit,
}: Props) => {
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <RadixForm.Root onSubmit={submit}>
      <Box mb="5">
        <Flex direction="column">
          <Text as="label" size="2" weight="medium" mb="2" htmlFor="name">
            <Skeleton loading={form.isLoading}>Name</Skeleton>
          </Text>
          <Skeleton loading={form.isLoading}>
            <RadixForm.Field name="name">
              <RadixForm.Control asChild required>
                <TextField.Root
                  id="name"
                  type="text"
                  variant="classic"
                  placeholder="Enter your name"
                  value={form.data.name}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      data: { ...state.data, name: e.target.value },
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
            <Skeleton loading={form.isLoading}>Email address</Skeleton>
          </Text>
          <Skeleton loading={form.isLoading}>
            <RadixForm.Field name="email">
              <RadixForm.Control asChild required>
                <TextField.Root
                  id="email"
                  type="email"
                  variant="classic"
                  placeholder="Enter your email"
                  value={form.data.email}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      data: { ...state.data, email: e.target.value },
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
            <Skeleton loading={form.isLoading}>Password</Skeleton>
          </Text>
          <Skeleton loading={form.isLoading}>
            <RadixForm.Field name="password">
              <RadixForm.Control asChild required>
                <TextField.Root
                  id="password"
                  variant="classic"
                  type="password"
                  placeholder="Enter your password"
                  value={form.data.password}
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      data: { ...state.data, password: e.target.value },
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
            <Skeleton loading={form.isLoading}>Location</Skeleton>
          </Text>
          <Skeleton loading={form.isLoading}>
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
        {form.error && (
          <Text color="red" size="1">
            {form.error}
          </Text>
        )}
      </Box>

      <Box mt="6">
        <Skeleton loading={form.isLoading}>
          <RadixForm.Submit asChild>
            <Button variant="solid" type="submit">
              Create an account
            </Button>
          </RadixForm.Submit>
        </Skeleton>
      </Box>
    </RadixForm.Root>
  );
};
