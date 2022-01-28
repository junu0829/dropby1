import React, { useState, useEffect } from "react";

import * as Location from "expo-location";

export const LocationContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState(
    [37.58646601781994, 127.02913699768948]
    // 37.58646601781994,127.02913699768948
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location2 = await Location.getCurrentPositionAsync();

      await setLocation([
        location2.coords.latitude,
        location2.coords.longitude,
      ]);
      await setIsLoading(false);
    })();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        errorMsg,
        isLoading,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
