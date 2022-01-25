import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import { Text } from "../../../components/typography/text.component";

import { useEffect, useContext, useState } from "react";

import { LocationContext } from "../../../services/location/location.context";
import { LinearGradient } from "expo-linear-gradient";

import { SvgXml } from "react-native-svg";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import {
  Map,
  SearchContainer,
  Container,
  PlaceContainer,
  ContainerEnd,
  TextContainer,
  styles,
  PlaceNameContainer,
} from "./map.screen.styles";

//assets
import cloud from "../../../../assets/cloud.png";
import write from "../../../../assets/write";
import LocationSelected from "../../../../assets/LocationSelected";
import currentLocation from "../../../../assets/currentLocation";

import currentLocationIcon from "../../../../assets/currentLocationIcon";

//아래부터 맵 불러오는 단

export const MapScreen = ({ navigation, route }) => {
  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.008; //Very high zoom level
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const { location } = useContext(LocationContext);
  const [writeMode, setWriteMode] = useState(false);
  const [pressedLocation, setPressedLocation] = useState({
    latitude: location[0],
    longitude: location[1],
  });
  const [pressedAddressID, setPressedAddressID] = useState(null);
  const [pressedAddress, setPressedAddress] = useState(null);
  const [pressedAddressName, setPressedAddressName] = useState("새로운 장소");
  // 위치 주소 구하는 함수
  const getAddress = () => {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        pressedLocation.latitude +
        "," +
        pressedLocation.longitude +
        "&key=AIzaSyDQqeh7m2DxLefbyzLfl4DK96j0-2NZASY"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setPressedAddressID(responseJson.results[0].place_id);
      });
  };

  const getPlaceDetail = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${pressedAddressID}&key=AIzaSyBYyWlYdAIT4Ur2d2QsPfD_OcZKutxOl0c`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setPressedAddress(responseJson.result.formatted_address);
        setPressedAddressName(responseJson.result.name);
      })
      .then(fetch());
  };
  getAddress();
  getPlaceDetail();

  return (
    <>
      <ExpoStatusBar style="auto"></ExpoStatusBar>

      <SearchContainer>
        <LinearGradient
          colors={[
            "rgba(166, 110, 159, 0.9)",
            "rgba(166, 110, 159, 0.65)",
            "rgba(166, 110, 159, 0.15)",
            "rgba(166, 110, 159, 0.0)",
          ]}
          style={styles.background}
          locations={[0.1, 0.45, 0.77, 1.0]}
        >
          {/* writeMode이지 않을 경우에 cloud */}
          {!writeMode ? (
            <Image source={cloud} height={542} width={158}></Image>
          ) : null}
        </LinearGradient>

        {writeMode && (
          <TextContainer>
            <Text variant="hint">드롭을 남길 장소를 눌러주세요</Text>
          </TextContainer>
        )}
      </SearchContainer>
      <Map
        provider={PROVIDER_GOOGLE}
        onPress={(event) => {
          setPressedLocation(event.nativeEvent.coordinate);
        }}
        region={{
          // 지도의 센터값 위도 경도
          latitude: location[0],
          longitude: location[1],
          //ZoomLevel 아래에 있는 것은 건드리지 않아도 됨
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <MapView.Marker
          //맵 마커의 위치
          coordinate={{
            latitude: location[0],
            longitude: location[1],
          }}
        >
          <SvgXml xml={currentLocationIcon} width={30} height={30}></SvgXml>
        </MapView.Marker>
        {writeMode ? (
          <MapView.Marker
            //장소선택 마커의 위치
            coordinate={{
              latitude: pressedLocation.latitude,
              longitude: pressedLocation.longitude,
            }}
          >
            <SvgXml xml={LocationSelected} width={33} height={45}></SvgXml>
          </MapView.Marker>
        ) : null}
      </Map>
      {/* 아래부터 writemode일경우에 아래에 박스 뜨게 하는 코드 */}
      {!writeMode ? (
        <Container>
          <TouchableOpacity
            onPress={() => {
              setWriteMode(true);
            }}
          >
            <SvgXml xml={write} width={56} height={65} />
          </TouchableOpacity>

          <ContainerEnd>
            <TouchableOpacity>
              <SvgXml xml={currentLocation} width={50} height={50} />
            </TouchableOpacity>
          </ContainerEnd>
        </Container>
      ) : (
        <PlaceContainer>
          <TouchableOpacity
            onPress={() => {
              setWriteMode(false);
            }}
          >
            <SvgXml xml={write} width={56} height={65} />
          </TouchableOpacity>

          <PlaceNameContainer>
            <Text variant="label">{pressedAddressName}</Text>
            <Text variant="caption">{pressedAddress}</Text>
          </PlaceNameContainer>
        </PlaceContainer>
      )}
    </>
  );
};
