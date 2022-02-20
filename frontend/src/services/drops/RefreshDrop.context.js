import React, { useState, useEffect } from "react";



export const DropDataContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
  const Data
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
