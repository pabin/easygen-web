import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import AppRoutes from "./routes/Routes";

function App() {
  return (
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
