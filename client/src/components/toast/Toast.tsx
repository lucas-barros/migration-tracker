import * as React from "react";
import * as RadixToast from "@radix-ui/react-toast";
import "./styles.css";

interface Props {
  open: boolean;
  title: string;
  setOpen: (open: boolean) => void;
}

export const Toast = ({ open, title, setOpen }: Props) => {
  return (
    <>
      <RadixToast.Root className="root" open={open} onOpenChange={setOpen}>
        <RadixToast.Title className="title">{title}</RadixToast.Title>
        <RadixToast.Description asChild></RadixToast.Description>
      </RadixToast.Root>
      <RadixToast.Viewport className="ToastViewport" />
    </>
  );
};
