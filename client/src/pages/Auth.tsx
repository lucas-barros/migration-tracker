import React from "react";
import { Box, Card, Container, Section, Tabs, Grid } from "@radix-ui/themes";
import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/SignUp";
import { config } from "../config";
import { Map } from "../components/Map";
console.log(config);

enum FormType {
  SignIn = "sign-in",
  SignUp = "sign-up",
}

export const AuthPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const makeOnSubmit =
    (type: FormType) => async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget));
      console.log(data);

      try {
        const response = await fetch(`${config.serverHost}/auth/${type}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setIsLoading(false);
      }
    };
  return (
    <Grid columns="2" gap="3" width="auto" height="100vh">
      <Container size="1">
        <Section>
          <Card variant="classic" size="4">
            <Tabs.Root defaultValue="signIn" orientation="vertical">
              <Tabs.List>
                <Tabs.Trigger value="signIn">Sign In</Tabs.Trigger>
                <Tabs.Trigger value="signUp">Sign Up</Tabs.Trigger>
              </Tabs.List>
              <Box mt="4">
                <Tabs.Content value="signIn">
                  <SignIn
                    isLoading={isLoading}
                    onSubmit={makeOnSubmit(FormType.SignIn)}
                  />
                </Tabs.Content>
                <Tabs.Content value="signUp">
                  <SignUp
                    isLoading={isLoading}
                    onSubmit={makeOnSubmit(FormType.SignUp)}
                  />
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Card>
        </Section>
      </Container>
      <Map />
    </Grid>
  );
};
