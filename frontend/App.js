import React from "react";

import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";

import { Navigation } from "./src/infrastructure/navigation";

import {
  useFonts as useNanum,
  NanumGothic_400Regular,
  NanumGothic_700Bold,
  NanumGothic_800ExtraBold,
} from "@expo-google-fonts/nanum-gothic";
import {
  useFonts as useDongle,
  Dongle_400Regular,
} from "@expo-google-fonts/dongle";

import { LocationContextProvider } from "./src/services/location/location.context";

//NanumGothic_400Regular
export default function App() {
  const [nanumLoaded] = useNanum({
    NanumGothic_400Regular,
    NanumGothic_700Bold,
    NanumGothic_800ExtraBold,
  });
  const [dongleLoaded] = useDongle({
    Dongle_400Regular,
  });

  if (nanumLoaded && dongleLoaded) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <LocationContextProvider>
            <Navigation />
          </LocationContextProvider>
        </ThemeProvider>
        <ExpoStatusBar style="light" />
      </>
    );
  } else {
    return null;
  }
}
