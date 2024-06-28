import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";

import PublicRoutes from "./routes/PublicRoutes";
import LayoutContainer from "./components/layout";
import { useDispatch, useSelector } from "./store/reduxHooks";
import PrivateRoutes from "./routes/PrivateRotues";
import { removeClient, setClient } from "./store/httpSlice";
import { AuthResponse } from "./shared/interfaces/auth/authUser.interface";
import { logout, refreshToken, setAuthUser } from "./store/authSlice";

function App() {
  const { isAuthenticated, authUser } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const getAuthUser = async () => {
    const localUser = localStorage.getItem("authUser");
    const user: AuthResponse = JSON.parse(localUser || "{}");

    if (user && user.accessToken) {
      const decoded = jwtDecode(user.accessToken);
      if (decoded.exp) {
        const expiresAt = new Date(decoded.exp * 1000);

        if (expiresAt > new Date()) {
          dispatch(setClient(user.accessToken));
          dispatch(setAuthUser(user));
        } else {
          dispatch(logout());
          dispatch(removeClient());
          localStorage.clear();
        }
      }
    }
  };

  const refreshAccessToken = async () => {
    console.log("==>> refreshing the token...", new Date());
    console.log(new Date());
    await dispatch(refreshToken(authUser.refreshToken));
  };

  useEffect(() => {
    getAuthUser();
  }, []);

  useEffect(() => {
    let refreshTimerId: any;

    if (isAuthenticated) {
      const decoded = jwtDecode(authUser.accessToken);

      if (decoded.exp) {
        const expiresIn = new Date(decoded.exp).getTime();
        const refreshIn = expiresIn * 1000 - Date.now() - 60 * 1000; // 1 minute before expiration
        console.log("refreshIn in min...", refreshIn / 60000);

        refreshTimerId = setTimeout(() => {
          refreshAccessToken();
        }, refreshIn);
      }
    }

    return () => {
      if (isAuthenticated && refreshTimerId) {
        clearTimeout(refreshTimerId);
      }
    };
  }, [isAuthenticated, authUser]);

  return (
    <ChakraProvider>
      <LayoutContainer>
        {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
      </LayoutContainer>
    </ChakraProvider>
  );
}

export default App;
