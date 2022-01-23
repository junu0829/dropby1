import * as React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useEffect, useContext, useState } from "react";
import { LocationContext } from "../../../services/location/location.context";

import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import cloud from "../../../../assets/cloud.png";
import write from "../../../../assets/write";
import currentLocationn from "../../../../assets/currentLocation";
import currentLocation from "../../../../assets/currentLocation";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
const SearchContainer = styled.View`
  position: absolute;
  z-index: 999;
top: 5px
  width: 100%;
`;

const Container = styled.View`
position: absolute
flex-direction: row
padding: ${(props) => props.theme.space[3]};
  z-index: 999;
  bottom: 67px

  width: 100%;
`;

const ContainerEnd = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  z-index: 999;
  bottom: -8px
  flex: 1;
  width: 100%;
`;

export const MapScreen = ({ navigation, route }) => {
  const { location } = useContext(LocationContext);

  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.008; //Very high zoom level
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  return (
    <>
      <ExpoStatusBar style="auto"></ExpoStatusBar>

      <SearchContainer>
        <Image source={cloud} height={542} width={158}></Image>
      </SearchContainer>
      <Map
        provider={PROVIDER_GOOGLE}
        onPress={(event) => {
          console.log(event.nativeEvent.coordinate);
        }}
        region={{
          latitude: location[0],
          longitude: location[1],
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <MapView.Marker
          key={"you"}
          title={"you"}
          coordinate={{
            latitude: location[0],
            longitude: location[1],
          }}
        ></MapView.Marker>
      </Map>

      <Container>
        <TouchableOpacity>
          <SvgXml xml={write} width={56} height={65} />
        </TouchableOpacity>

        <ContainerEnd>
          <TouchableOpacity>
            <SvgXml xml={currentLocation} width={50} height={50} />
          </TouchableOpacity>
        </ContainerEnd>
      </Container>
    </>
  );
};
