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
import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

//assets
import cloud from "../../../../assets/cloud.png";
import write from "../../../../assets/write";

import currentLocation from "../../../../assets/currentLocation";
import { theme } from "../../../infrastructure/theme";

import currentLocationIcon from "../../../../assets/currentLocationIcon";

//style 정의하는 부분: css style로 벡틱안에서 정의하게 됨
const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
const SearchContainer = styled.View`
  position: absolute;
  z-index: 999;

  width: 100%;
`;

const Container = styled.View`
position: absolute
flex-direction: row
padding: ${(props) => props.theme.space[3]};
  z-index: 998;
  bottom: 67px

  width: 100%;
 
`;

const PlaceContainer = styled.View`
position: absolute
backgroundColor: #FAFAFA
flex-direction: row
padding: ${(props) => props.theme.space[3]};
  z-index: 998;
  bottom: 0px
height: 165px
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

const TextContainer = styled.View`
flex:3
flex-direction: column;
justify-content: flex-end;
top: 80px
align-items: center;
  width: 100%;
  z-index: 999;
 
`;

//아래부터 맵 불러오는 단

export const MapScreen = ({ navigation, route }) => {
  const { location } = useContext(LocationContext);

  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.008; //Very high zoom level
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [writeMode, setWriteMode] = useState(false);
  const [pressedLocation, setPressedLocation] = useState({
    latitude: location[0],
    longitude: location[1],
  });

  return (
    <>
      <ExpoStatusBar style="auto"></ExpoStatusBar>

      <SearchContainer>
        <LinearGradient
          colors={[
            "rgba(166, 110, 159, 0.9)",
            "rgba(166, 110, 159, 0.7)",
            "rgba(166, 110, 159, 0.2)",
            "rgba(166, 110, 159, 0.0)",
          ]}
          style={styles.background}
          locations={[0.1, 0.3, 0.7, 1.0]}
        >
          {/* writeMode이지 않을 경우에 cloud */}
          {!writeMode && (
            <Image source={cloud} height={542} width={158}></Image>
          )}
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
          console.log(pressedLocation);
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
          key={"you"}
          title={"you"}
          //맵 마커의 위치
          coordinate={{
            latitude: location[0],
            longitude: location[1],
          }}
        >
          <SvgXml xml={currentLocationIcon} width={30} height={30}></SvgXml>
        </MapView.Marker>
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
          <Text>{[pressedLocation.latitude, pressedLocation.longitude]}</Text>
        </PlaceContainer>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 230,
  },
});
