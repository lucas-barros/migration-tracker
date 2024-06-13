import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button, Card, IconButton } from "@radix-ui/themes";
import "./styles.css";

interface Props {
  onLogOut: () => void;
}

export const LogoutPopover = ({ onLogOut }: Props) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <IconButton radius="full" variant="outline">
        <MixerHorizontalIcon />
      </IconButton>
    </Popover.Trigger>
    <Popover.Content className="content">
      <Card>
        <Button onClick={onLogOut} variant="outline">
          Logout
        </Button>
      </Card>

      <Popover.Arrow className="arrow" />
    </Popover.Content>
  </Popover.Root>
);
