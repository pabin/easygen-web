import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import AppRoutes from "./routes/Routes";
import LayoutContainer from "./components/layout";

function App() {
  return (
    <ChakraProvider>
      <LayoutContainer>
        <AppRoutes />
      </LayoutContainer>
    </ChakraProvider>
  );
}

export default App;
