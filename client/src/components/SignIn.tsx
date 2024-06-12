import React from "react";
import {
  Text,
  Box,
  Button,
  Flex,
  Heading,
  TextField,
  Skeleton,
} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

interface Props {
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const SignIn = ({ isLoading, onSubmit }: Props) => {
  return (
    <Form.Root onSubmit={onSubmit}>
      <Box height="40px" mb="4">
        <Heading as="h3" size="6" mt="-1">
          <Skeleton loading={isLoading}>Sign in</Skeleton>
        </Heading>
      </Box>
      <Box mb="5">
        <Flex direction="column">
          <Text as="label" size="2" weight="medium" mb="2" htmlFor="email">
            <Skeleton loading={isLoading}>Email address</Skeleton>
          </Text>
          <Skeleton loading={isLoading}>
            <Form.Field name="email">
              <Form.Control asChild required>
                <TextField.Root
                  id="email"
                  type="email"
                  variant="classic"
                  placeholder="Enter your email"
                />
              </Form.Control>
              <Form.Message match="valueMissing">
                <Text as="span" size="1" mb="2" color="red">
                  Email is required
                </Text>
              </Form.Message>
              <Form.Message match="typeMismatch">
                <Text as="span" size="1" mb="2" color="red">
                  Please enter a valid email
                </Text>
              </Form.Message>
            </Form.Field>
          </Skeleton>
        </Flex>
      </Box>

      <Box mb="5" position="relative">
        <Flex direction="column">
          <Text as="label" size="2" weight="medium" mb="2" htmlFor="password">
            <Skeleton loading={isLoading}>Password</Skeleton>
          </Text>
          <Skeleton loading={isLoading}>
            <Form.Field name="password">
              <Form.Control asChild required>
                <TextField.Root
                  id="password"
                  variant="classic"
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Control>
              <Form.Message match="valueMissing">
                <Text as="span" size="1" mb="2" color="red">
                  Password is required
                </Text>
              </Form.Message>
            </Form.Field>
          </Skeleton>
        </Flex>
      </Box>

      <Box mt="6">
        <Skeleton loading={isLoading}>
          <Form.Submit asChild>
            <Button variant="solid" type="submit">
              Sign in
            </Button>
          </Form.Submit>
        </Skeleton>
      </Box>
    </Form.Root>
  );
};
