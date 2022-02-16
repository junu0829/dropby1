import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions, Image, View, TouchableOpacity } from "react-native";

import { Text } from "../../../components/typography/text.component";

import { useEffect, useContext, useState } from "react";

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
  PlaceNameContainer2,
  ContainerEnd2,
} from "./map.screen.styles";

//assets
import Drops from "../../../../assets/Drops";
import { APIKey, PlAPIKey } from "../../../../APIkeys";
import DropDefault from "../../../../assets/DropDefault";
import cloud from "../../../../assets/cloud.png";
import write from "../../../../assets/write";
import LocationSelected from "../../../../assets/LocationSelected";
import currentLocation from "../../../../assets/currentLocation";

import selectButton from "../../../../assets/selectButton";
import backButton from "../../../../assets/backButton";
import { FadeInView } from "../../../components/animations/fade.animation";
import { ExpandView } from "../../../components/animations/expand.animation";
import { FadeInViewFaster } from "../../../components/animations/fadeFaster.animation.";

export const MapScreen = ({ navigation, route }) => {
  ////////////////////////////처음 state들//////////////////////////////////////
  ///axios는 서버로부터 data json불러와주는 도구
  const axios = require("axios");

  /////지도를 지도 바깥에서 부를 수 있도록 정의
  const mapRef = React.createRef();
  // 화면비율 조정하는 것

  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.008; //Very high zoom level
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  ///////처음 데이터셋팅(현위치, 누른 위치-주소-장소명, 선택장소 마커위치, 데이터베이스에 저장된 마커들)
  const { location, isLoading } = useContext(LocationContext);

  const [isAddressLoading, SetIsAddressLoading] = useState(true);

  const [writeMode, setWriteMode] = useState(false);
  const [pressedLocation, setPressedLocation] = useState({
    latitude: 37.58646601781994,
    longitude: 127.02913699768948,
  });
  const [Markers, setMarkers] = useState([
    {
      latitude: location[0],
      longitude: location[1],
    },
  ]);

  const [drops, setDrops] = useState([
    {
      content: "드롭바이짱",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.398811798656766,
      longitude: 126.6377265751362,
      pk: 22,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },
  ]);

  const [definedLocation, setDefinedLocation] = useState({
    latitude: 37.58646601781994,
    longitude: 127.02913699768948,
  });
  const [calibratedLocation, setCalibratedLocation] = useState({
    latitude: 37.58646601781994,
    longitude: 127.02913699768948,
  });
  const [definedAddressID, setDefinedAddressID] = useState(null);
  const [pressedAddressID, setPressedAddressID] = useState(null);
  const [pressedAddress, setPressedAddress] = useState(null);
  const [pressedAddressName, setPressedAddressName] = useState("새로운 장소");

  ////////////////////////////여기서부터 useEffect 정의하기 시작//////////////////////////////////////////////////////

  //////////드롭불러오기

  useEffect(() => {
    const LoadDrop = async () => {
      await axios({
        method: "get",
        url: "http://localhost:3000/drops",
      }).then((res) => {
        setDrops(res.data.data);
        console.log(res.data.data);
      });
    };
    LoadDrop();
  }, [axios, pressedAddress]);

  const dropsList = (drops) => {
    return drops.map((drop) => {
      return (
        <MapView.Marker
          key={drop.pk}
          title={drop.content}
          coordinate={{
            latitude: drop.latitude,
            longitude: drop.longitude,
          }}
          onPress={() => {}}
        >
          <SvgXml xml={DropDefault} width={40} height={36}></SvgXml>
        </MapView.Marker>
      );
    });
  };
  ///////길게 눌렀을 시 장소정보 가져오는 함수
  useEffect(() => {
    const getAddress = () => {
      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          pressedLocation.latitude +
          "," +
          pressedLocation.longitude +
          `&key=${APIKey}`
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
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${pressedAddressID}&key=${PlAPIKey}`
      )
        .then((response) => response.json())
        .then(async (responseJson) => {
          await setPressedAddress(responseJson.result.formatted_address);
          await setPressedAddressName(responseJson.result.name);
        });
    };

    getAddress();
    getPlaceDetail();

    console.log("longclicked");
  }, [pressedAddressID, pressedLocation]);

  useEffect(() => {
    setWriteMode(false);
  }, [route.params]);

  //////////가볍게 눌렀을 시 장소정보 가져오는 함수

  useEffect(() => {
    const getDefinedAddress = () => {
      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          definedLocation.latitude +
          "," +
          definedLocation.longitude +
          `&key=${APIKey}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          for (let i = 0; i < 15; i++) {
            if (
              responseJson.results[i].geometry.location_type ===
              "GEOMETRIC_CENTER"
            ) {
              setDefinedAddressID(responseJson.results[i].place_id);
              setCalibratedLocation(responseJson.results[i].geometry.location);
              break;
            }

            console.log(i);
          }
        });
    };

    const getDefinedPlaceDetail = () => {
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${definedAddressID}&key=${PlAPIKey}`
      )
        .then((response) => response.json())
        .then(async (responseJson) => {
          await setPressedAddress(responseJson.result.formatted_address);
          await setPressedAddressName(responseJson.result.name);
        });
    };
    getDefinedAddress();
    getDefinedPlaceDetail();

    console.log("lightclicked");
  }, [definedLocation, definedAddressID]);

  useEffect(() => {
    console.log(calibratedLocation);
    setMarkers([
      {
        latitude: calibratedLocation.lat,
        longitude: calibratedLocation.lng,
      },
    ]);
  }, [calibratedLocation]);

  useEffect(() => {
    setMarkers([
      {
        latitude: pressedLocation.latitude,
        longitude: pressedLocation.longitude,
      },
    ]);
  }, [pressedLocation]);

  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////맵그리는 것 여기서부터 시작//////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  if (isLoading) {
    return <Loading />;
  } else {
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
          onPress={(event) => {
            setDefinedLocation(event.nativeEvent.coordinate);
            SetIsAddressLoading(false);
            setMarkers([]);
          }}
          onLongPress={(event) => {
            setPressedLocation(event.nativeEvent.coordinate);
            SetIsAddressLoading(false);
            setMarkers([]);
          }}
          ref={mapRef}
          showsUserLocation={true}
          showsCompass={true}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            // 지도의 센터값 위도 경도
            latitude: location[0],
            longitude: location[1],
            //ZoomLevel 아래에 있는 것은 건드리지 않아도 됨
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {dropsList(drops)}
          {writeMode && !isAddressLoading
            ? Markers.map((Marker, i) => {
                return (
                  <MapView.Marker
                    styles={{ zIndex: 999 }}
                    //장소선택 마커의 위치

                    coordinate={Markers[0]}
                  >
                    <FadeInViewFaster>
                      <ExpandView>
                        <SvgXml
                          xml={LocationSelected}
                          width={33.5}
                          height={45}
                        />
                      </ExpandView>
                    </FadeInViewFaster>
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
                  setPressedLocation({
                    latitude: location[0],
                    longitude: location[1],
                  });
                  SetIsAddressLoading(false);
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
                  <PlaceNameContainer2>
                    <Text style={styles.placename}>{pressedAddressName}</Text>
                  </PlaceNameContainer2>

                  <Text style={styles.placeaddress}>{pressedAddress}</Text>
                </PlaceNameContainer>

                <ContainerEnd2>
                  <TouchableOpacity style={styles.Drops}>
                    <SvgXml xml={Drops} width={38} height={42} />
                  </TouchableOpacity>
                  <Text style={styles.drop}>23개</Text>
                </ContainerEnd2>
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

// <>
//   <PlaceContainer>
//     <PlaceContainer2>
//       <BackButtonContainer
//         onPress={() => {
//           setWriteMode(false);
//         }}
//       >
//         <SvgXml xml={backButton} width={50} height={50} />
//       </BackButtonContainer>
//       <PlaceNameContainer>
//         <Text variant="label">{pressedAddressName}</Text>
//         <Text variant="caption">{pressedAddress}</Text>
//       </PlaceNameContainer>
//     </PlaceContainer2>
//     <PlaceContainer3>
//       <SelectButtonContainer
//         onPress={() => {
//           navigation.navigate("WriteScreen", [
//             { pressedAddress },
//             { pressedAddressName },
//             { pressedLocation },
//           ]);
//         }}
//       >
//         <SvgXml xml={selectButton} width={170} height={32} />
//       </SelectButtonContainer>
//     </PlaceContainer3>
//   </PlaceContainer>
// </>
