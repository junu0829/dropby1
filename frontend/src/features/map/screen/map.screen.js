import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions, Image, View } from "react-native";

import { Text } from "../../../components/typography/text.component";

import { useEffect, useContext, useState, useMemo } from "react";

import { LocationContext } from "../../../services/location/location.context";
import { LinearGradient } from "expo-linear-gradient";
import { Loading } from "../../../components/Loading";

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
  PlaceContainer2,
  PlaceContainer3,
  SelectButtonContainer,
  BackButtonContainer,
  WriteButton,
  CurrentLocationButton,
} from "./map.screen.styles";

//assets
import cloud from "../../../../assets/cloud.png";
import write from "../../../../assets/write";
import LocationSelected from "../../../../assets/LocationSelected";
import currentLocation from "../../../../assets/currentLocation";

import selectButton from "../../../../assets/selectButton";
import backButton from "../../../../assets/backButton";

export const MapScreen = ({ navigation, route }) => {
  const mapRef = React.createRef();
  // 화면비율 조정하는 것
  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.008; //Very high zoom level
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  ///////처음 데이터셋팅
  const { location, isLoading } = useContext(LocationContext);

  const [isAddressLoading, SetIsAddressLoading] = useState(true);

  const [writeMode, setWriteMode] = useState(false);
  const [pressedLocation, setPressedLocation] = useState({
    latitude: 37.58646601781994,
    longitude: 127.02913699768948,
  });
  const [Markers, setMarkers] = useState([
    {
      latitude: 37.58646601781994,
      longitude: 127.02913699768948,
    },
  ]);
  const [definedLocation, setDefinedLocation] = useState(null);
  const [pressedAddressID, setPressedAddressID] = useState(null);
  const [pressedAddress, setPressedAddress] = useState(null);
  const [pressedAddressName, setPressedAddressName] = useState("새로운 장소");

  // const DefinedPlaceLoad = (responseJson) => {
  //   for (let i = 0; i < 5; i++) {
  //     //  if (responseJson.results[i].geomtry.location_type == "GEOMETRIC_CENTER") {}
  //     if (
  //       responseJson.results[i].geometry.location_type === "GEOMETRIC_CENTER"
  //     ) {
  //       setPressedAddressID(responseJson.results[i].place_id);
  //       setDefinedLocation(responseJson.results[i].geometry.location);

  //       break;
  //     }
  //   }
  // };

  useEffect(() => {
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
          // DefinedPlaceLoad(responseJson);

          const responseResultsNumber = 0;

          setPressedAddressID(
            responseJson.results[responseResultsNumber].place_id
          );
        });
    };

    const getPlaceDetail = () => {
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${pressedAddressID}&key=AIzaSyBYyWlYdAIT4Ur2d2QsPfD_OcZKutxOl0c`
      )
        .then((response) => response.json())
        .then(async (responseJson) => {
          await setPressedAddress(responseJson.result.formatted_address);
          await setPressedAddressName(responseJson.result.name);
        });
    };

    getAddress();
    getPlaceDetail();
    setMarkers([
      {
        latitude: pressedLocation.latitude,
        longitude: pressedLocation.longitude,
      },
    ]);
    console.log("clicked");
  }, [pressedAddress, pressedAddressName, pressedAddressID, pressedLocation]);

  if (isLoading) {
    return <Loading />;
  } else {
    /////정보가져오는 함수 정의

    //////////////////////////맵그리는 것 여기서부터 시작
    return (
      <View onStartShouldSetResponder={() => {}}>
        <ExpoStatusBar style="auto" />
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
              <Image source={cloud} height={542} width={158} />
            ) : null}
          </LinearGradient>

          {writeMode && (
            <TextContainer>
              <Text variant="hint">드롭을 남길 장소를 눌러주세요</Text>
            </TextContainer>
          )}
        </SearchContainer>

        <Map
          onPress={async (event) => {
            await setPressedLocation(event.nativeEvent.coordinate);
            SetIsAddressLoading(false);

            setMarkers([]);
          }}
          ref={mapRef}
          showsUserLocation={true}
          showsCompass={true}
          provider={PROVIDER_GOOGLE}
          // onPress={(event) => {
          //   setPressedLocation(event.nativeEvent.coordinate);
          // }}
          initialRegion={{
            // 지도의 센터값 위도 경도
            latitude: location[0],
            longitude: location[1],
            //ZoomLevel 아래에 있는 것은 건드리지 않아도 됨
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {writeMode && !isAddressLoading
            ? Markers.map((Marker, i) => {
                return (
                  <MapView.Marker
                    styles={{ zIndex: 999 }}
                    //장소선택 마커의 위치

                    coordinate={Markers[0]}
                  >
                    <SvgXml xml={LocationSelected} width={33.5} height={45} />
                  </MapView.Marker>
                );
              })
            : null}
        </Map>

        {!writeMode ? (
          <>
            <Container>
              <WriteButton
                onPress={() => {
                  setWriteMode(true);
                }}
              >
                <SvgXml xml={write} width={56} height={65} />
              </WriteButton>

              <ContainerEnd>
                <CurrentLocationButton
                  onPress={() => {
                    mapRef.current.animateToRegion({
                      // 현재위치 버튼
                      latitude: location[0],
                      longitude: location[1],
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    });
                    setPressedLocation({
                      latitude: location[0],
                      longitude: location[1],
                    });
                  }}
                >
                  <SvgXml xml={currentLocation} width={50} height={50} />
                </CurrentLocationButton>
              </ContainerEnd>
            </Container>
          </>
        ) : (
          <>
            <PlaceContainer>
              <PlaceContainer2>
                <BackButtonContainer
                  onPress={() => {
                    setWriteMode(false);
                  }}
                >
                  <SvgXml xml={backButton} width={50} height={50} />
                </BackButtonContainer>
                <PlaceNameContainer>
                  <Text variant="label">{pressedAddressName}</Text>
                  <Text variant="caption">{pressedAddress}</Text>
                  <Text variant="caption">{isAddressLoading.toString()}</Text>
                </PlaceNameContainer>
              </PlaceContainer2>
              <PlaceContainer3>
                <SelectButtonContainer
                  onPress={() => {
                    navigation.navigate("WriteScreen", [
                      { pressedAddress },
                      { pressedAddressName },
                      { pressedLocation },
                    ]);
                  }}
                >
                  <SvgXml xml={selectButton} width={170} height={32} />
                </SelectButtonContainer>
              </PlaceContainer3>
            </PlaceContainer>
          </>
        )}
      </View>
    );
  }
};
