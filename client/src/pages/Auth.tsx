import React from "react";
import { Box, Tabs, Grid } from "@radix-ui/themes";
import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/SignUp";
import { Map } from "../components/Map";
import { useReverseGeocoding } from "../hooks/useReverseGeocoding";
import { useAuthForm } from "../hooks/useAuthForm";
import { Location } from "../types/location";

export const AuthPage = () => {
  const { form, setForm, onSignIn, onSignUp } = useAuthForm();
  const { reversedLocation } = useReverseGeocoding(form.data.location);
  const setLocation = (location: Location) => {
    setForm((state) => ({
      ...state,
      data: {
        ...state.data,
        location,
      },
    }));
  };

  return (
    <Grid columns="2" gap="3" width="auto" height="100vh">
      <Box p="4">
        <Tabs.Root defaultValue="signIn" orientation="vertical">
          <Tabs.List>
            <Tabs.Trigger value="signIn">Sign In</Tabs.Trigger>
            <Tabs.Trigger value="signUp">Sign Up</Tabs.Trigger>
          </Tabs.List>
          <Box mt="4">
            <Tabs.Content value="signIn">
              <SignIn form={form} setForm={setForm} onSubmit={onSignIn} />
            </Tabs.Content>
            <Tabs.Content value="signUp">
              <SignUp
                form={form}
                setForm={setForm}
                reversedLocation={reversedLocation}
                onSubmit={onSignUp}
              />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Box>
      <Map
        migrations={[]}
        location={form.data.location}
        onClick={setLocation}
        onLocationFound={setLocation}
      />
    </Grid>
  );
};
