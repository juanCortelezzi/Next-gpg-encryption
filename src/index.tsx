import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, extendTheme, CSSReset } from "@chakra-ui/react";

const customTheme = extendTheme({
  useSystemColorMode: false,
  initialColorMode: "dark",
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
