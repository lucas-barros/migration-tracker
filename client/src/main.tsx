import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" forcedTheme="dark">
      <Theme>
        <App />
      </Theme>
    </ThemeProvider>
  </React.StrictMode>,
);
