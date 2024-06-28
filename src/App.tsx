import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import PublicRoutes from "./routes/PublicRoutes";
import LayoutContainer from "./components/layout";
import { useSelector } from "./store/reduxHooks";
import PrivateRoutes from "./routes/PrivateRotues";

function App() {
  const { isAuthenticated } = useSelector((s) => s.auth);

  return (
    <ChakraProvider>
      <LayoutContainer>
        {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
      </LayoutContainer>
    </ChakraProvider>
  );
}

export default App;
