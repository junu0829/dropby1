import React, {
  createRef,
  useEffect,
  useContext,
  useState,
  useRef,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import { useIsFocused } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import {
  Dimensions,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import { Text } from "../../../components/typography/text.component";

import { LocationContext } from "../../../services/location/location.context";
import { LinearGradient } from "expo-linear-gradient";
import { Loading } from "../../../components/Loading";

import LOCAL_HOST from "../../local.js";
import { SvgXml } from "react-native-svg";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { DropPreview } from "./component/dropPreview";
import {
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

import { ClusteredMap } from "./component/ClusteredMap";
//assets
import Drops from "../../../../assets/images/Drops";
import { APIKey, PlAPIKey } from "../../../../APIkeys";
import { reducer, initialState } from "./dropRefresh.service";
import write from "../../../../assets/Buttons/write";
import PurpleDrop from "../../../../assets/images/PurpleDrop.png";

import currentLocation from "../../../../assets/Buttons/currentLocation";

import selectButton from "../../../../assets/Buttons/selectButton";

import { Cloud } from "./component/cloud";

import { SlideView } from "../../../components/animations/slide.animation";

import backButton2 from "../../../../assets/Buttons/backButton2";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoadedDrop } from "../../../services/drops/LoadedDrop.service";
import axiosInstance from "../../../services/fetch";
import NewPlaceButton from "../../../../assets/Buttons/NewPlaceButton";
import axios from "axios";
import { KakaoKey } from "../../../../APIkeys";
import PlacePlusIcon from "../../../../assets/Buttons/PlacePlusIcon";
import PlaceAddIcon from "../../../../assets/Buttons/PlaceAddIcon";

export const MapScreen = ({ navigation, route }) => {
  ////////////////////////////?????? state???//////////////////////////////////////
  ///axios??? ??????????????? data json??????????????? ??????

  /////????????? ?????? ???????????? ?????? ??? ????????? ??????
  const map = useRef(null);

  // ???????????? ???????????? ???

  let { width, height } = Dimensions.get("window");

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.008; //Very high zoom level
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [isDetail, setIsDetail] = useState(false);

  ///////?????? ???????????????(?????????, ?????? ??????-??????-?????????, ???????????? ????????????, ????????????????????? ????????? ?????????)
  const { location, isLoading } = useContext(LocationContext);

  const [isAddressLoading, SetIsAddressLoading] = useState(true);

  const [dropViewMode, setDropViewMode] = useState(false);
  const showModal = () => {
    setDropViewMode(true);
  };

  const [writeMode, setWriteMode] = useState(false);
  const [pressedLocation, setPressedLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [Markers, setMarkers] = useState([
    {
      latitude: Number(location[0]),
      longitude: Number(location[1]),
    },
  ]);

  const [currentRegion, updateRegion] = useState({
    // ????????? ????????? ?????? ??????
    latitude: location[0],
    longitude: location[1],
    //ZoomLevel ????????? ?????? ?????? ???????????? ????????? ???
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [rectNW, setRectNW] = useState("1,1");
  const [rectSE, setRectSE] = useState("0,0");
  const [Places, setPlaces] = useState([]);

  useEffect(() => {
    const NWLat = currentRegion.latitude + currentRegion.latitudeDelta;
    const NWLng = currentRegion.longitude + currentRegion.longitudeDelta;
    const SELat = currentRegion.latitude - currentRegion.latitudeDelta;
    const SELng = currentRegion.longitude - currentRegion.longitudeDelta;
    setRectNW(`${NWLng},${NWLat}`);
    setRectSE(`${SELng},${SELat}`);
    LoadPlaces();
  }, [currentRegion, writeMode]);

  const LoadPlaces = useCallback(() => {
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=CE7&rect=${rectNW},${rectSE}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `KakaoAK ${KakaoKey}`,
          },
        }
      )
      .then((res) => {
        setPlaces(res.data.documents);

        console.log("?????? ?????????");
      })
      .catch((error) => console.log("error = " + error));
  }, [rectNW, rectSE]);

  const [drop, setDrop] = useState(null);

  const [dropTime, setDropTime] = useState(null);
  const [dropContent, setDropContent] = useState(null);
  const [drops, setDrops] = useState([
    {
      emoji: "????",
      content: "???????????????",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.398811798656766,
      longitude: 126.6377265751362,
      pk: 22,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },
  ]);

  const [definedLocation, setDefinedLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [calibratedLocation, setCalibratedLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [definedAddressID, setDefinedAddressID] = useState("");
  const [pressedAddressID, setPressedAddressID] = useState("");
  const [pressedAddress, setPressedAddress] = useState("");
  const [pressedAddressName, setPressedAddressName] = useState("????????? ??????");
  const [newPlaceSelectionMode, setNewPlaceSelectioMode] = useState(false);

  ////////////////////////////??????????????? useEffect ???????????? ??????//////////////////////////////////////////////////////

  //////???????????? ?????? useEffect????????? ????????? ????????? ?????? ????????? ????????????... ?????? ??? ???????????? ?????? ????????? ?????????. ????????? ????????? ???????????? ????????? reload ?????????, useEffect?????? ?????? ?????? ???.

  const LoadDrop = () => {
    console.log("?????? ???????????????...");

    axiosInstance
      .get(`http://${LOCAL_HOST}:3000/drops`)
      .then((res) => {
        console.log("?????? ?????????");
        console.log(res.data);
      })
      .catch((error) => {
        console.log("error message: ", error.message);
      });
  };

  const isFocused = useIsFocused();
  // /// ?????? ????????? useEffect??? ?????? ????????? ????????? ?????? ????????? ?????????? ????????????.
  useEffect(() => {
    LoadDrop();
  }, [currentRegion, isFocused]);

  const dropsList = (drops) => {
    return (
      <>
        <ClusteredMap
         
          onPress={Keyboard.dismiss}
          onLongPress={(event) => {
            if (!newPlaceSelectionMode) {
              setDefinedLocation(event.nativeEvent.coordinate);
              setMarkers([]);
            } else {
              setPressedLocation(event.nativeEvent.coordinate);
              setMarkers([]);
            }
          }}
          ref={map}
          Places={Places}
          setMarkers={setMarkers}
          setPressedAddress={setPressedAddress}
          setPressedAddressName={setPressedAddressName}
          setCalibratedLocation={setCalibratedLocation}
          location={location}
          LATITUDE_DELTA={LATITUDE_DELTA}
          LONGITUDE_DELTA={LONGITUDE_DELTA}
          writeMode={writeMode}
          isAddressLoading={isAddressLoading}
          newPlaceSelectionMode={newPlaceSelectionMode}
          Markers={Markers}
          region={currentRegion}
          updateRegion={updateRegion}
        >
          {drops.map((drop, i) => {
            console.log(drop.pk);
            return (
              <Marker
                style={{ opacity: 0.85 }}
                key={drop.pk}
                coordinate={{
                  latitude: drop && Number(drop.latitude),
                  longitude: drop && Number(drop.longitude),
                }}
                onPress={() => {
                  showModal();
                  setWriteMode(false);
                  setPressedLocation({
                    latitude: drop.latitude,
                    longitude: drop.longitude,
                  });
                  setDropContent(drop.content);
                  setDrop(drop.pk);
                  setDropTime(drop.createdAt);
                }}
              >
                <ImageBackground
                  source={PurpleDrop}
                  style={{
                    width: 34,
                    height: 44,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      left: 1,
                      top: 1,
                    }}
                  ></Text>
                </ImageBackground>
              </Marker>
            );
          })}
        </ClusteredMap>
      </>
    );
  };
  //////?????????  ???????????? ???????????? ??????
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
          await setPressedAddressName(`????????? ??????`);
          console.log("a");
        });
    };

    getAddress();
    getPlaceDetail();

    console.log("longclicked");
  }, [pressedAddressID, pressedLocation]);

  useEffect(() => {
    setWriteMode(false);
  }, [route.params]);

  //////////????????? ???????????? ???????????? ??????

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
                "GEOMETRIC_CENTER" ||
              responseJson.results[i].address_components[0].types.includes(
                "point_of_interest"
              ) ||
              responseJson.results[i].address_components[0].types.includes(
                "establishment"
              ) ||
              responseJson.results[i].address_components[0].types.includes(
                "landmark"
              )
            ) {
              setDefinedAddressID(responseJson.results[i].place_id);
              setCalibratedLocation(responseJson.results[i].geometry.location);
              break;
            }
          }
        })
        .catch((e) => setPressedAddressName("?????? ????????? ???????????????"));
    };

    const getDefinedPlaceDetail = () => {
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${definedAddressID}&key=${PlAPIKey}`
      )
        .then((response) => response.json())
        .then(async (responseJson) => {
          await setPressedAddress(responseJson.result.formatted_address);
          await setPressedAddressName(responseJson.result.name);
          console.log("b");
        })
        .catch((e) => setPressedAddressName("?????? ????????? ???????????????"));
    };
    getDefinedAddress();
    getDefinedPlaceDetail();

    console.log("lightclicked");
  }, [definedLocation, definedAddressID]);

  useEffect(() => {
    if (!newPlaceSelectionMode) {
      setMarkers([
        {
          latitude: calibratedLocation.lat,
          longitude: calibratedLocation.lng,
        },
      ]);
    } else {
      setMarkers([
        {
          latitude: pressedLocation.latitude,
          longitude: pressedLocation.longitude,
        },
      ]);
    }
  }, [calibratedLocation, pressedLocation, newPlaceSelectionMode]);

  // const allCoords = drops.map((i) => ({
  //   geometry: {
  //     coordinates: [i.latitude, i.longitude],
  //   },
  // }));

  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////???????????? ??? ??????????????? ??????//////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles3.container}
        >
          <View>
            <ExpoStatusBar style="auto" />
            <SearchContainer>
              {!isDetail ? (
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
                  {/* writeMode?????? ?????? ????????? cloud */}
                  {!writeMode ? (
                    <TouchableOpacity
                      onPress={() => {
                        // LoadedDrop(setDrops);
                      }}
                    >
                      <Cloud navigation={navigation} region={currentRegion} />
                    </TouchableOpacity>
                  ) : null}
                </LinearGradient>
              ) : null}

              {writeMode && (
                <TextContainer>
                  <Text variant="hint">????????? ?????? ????????? ???????????????</Text>
                </TextContainer>
              )}
            </SearchContainer>

            <View
              onStartShouldSetResponder={() => {
                setDropViewMode(false);
              }}
            >
              {dropsList(drops)}
            </View>

            {!writeMode && !dropViewMode ? (
              <>
                <Container>
                  <WriteButton
                    style={{ opacity: 0.95 }}
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
                      style={{ opacity: 0.95 }}
                      onPress={() => {
                        map.current.animateToRegion({
                          // ???????????? ??????
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
            ) : writeMode ? (
              <>
                <PlaceContainer>
                  <View
                    style={{
                      bottom: 70,
                      width: 50,
                      height: 50,
                      marginLeft: 5,
                      Index: 5,
                    }}
                  >
                    {!newPlaceSelectionMode ? (
                      <TouchableOpacity
                        onPress={() => {
                          setNewPlaceSelectioMode(true);
                        }}
                      >
                        <SvgXml xml={PlacePlusIcon} width={40} height={40} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setNewPlaceSelectioMode(false);
                        }}
                      >
                        <SvgXml xml={PlaceAddIcon} width={40} height={40} />
                      </TouchableOpacity>
                    )}
                  </View>
                  <PlaceContainer2>
                    <BackButtonContainer
                      onPress={() => {
                        setWriteMode(false);
                      }}
                    >
                      <SvgXml xml={backButton2} width={50} height={50} />
                    </BackButtonContainer>
                    <PlaceNameContainer>
                      {!newPlaceSelectionMode ? (
                        <PlaceNameContainer2>
                          <Text style={styles.placename}>
                            {pressedAddressName}
                          </Text>
                        </PlaceNameContainer2>
                      ) : (
                        <PlaceNameContainer2>
                          <View style={styles3.TextBack}>
                            <TextInput
                              style={styles3.enter}
                              placeholder="????????? ??????"
                              onChangeText={(content) =>
                                setPressedAddressName(content)
                              }
                            ></TextInput>
                          </View>
                        </PlaceNameContainer2>
                      )}

                      <Text style={styles.placeaddress}>{pressedAddress}</Text>
                    </PlaceNameContainer>

                    <ContainerEnd2>
                      <TouchableOpacity style={styles.Drops}>
                        <SvgXml xml={Drops} width={22} height={30} />
                      </TouchableOpacity>
                      <Text style={styles.drop}>0??? </Text>
                    </ContainerEnd2>
                  </PlaceContainer2>

                  <PlaceContainer3>
                    <SelectButtonContainer
                      onPress={() => {
                        navigation.navigate("WriteScreen", [
                          { pressedAddress },
                          { pressedAddressName },
                          { pressedLocation },
                          { calibratedLocation },
                        ]);
                      }}
                    >
                      <SvgXml xml={selectButton} width={170} height={32} />
                    </SelectButtonContainer>
                  </PlaceContainer3>
                </PlaceContainer>
              </>
            ) : dropViewMode ? (
              <>
                <TouchableWithoutFeedback onPress={() => {}}>
                  <SlideView isDetail={isDetail}>
                    <DropPreview
                      pressedAddress={pressedAddress}
                      pressedAddressName={pressedAddressName}
                      dropContent={dropContent}
                      pressedLocation={pressedLocation}
                      navigation={navigation}
                      drop={drop}
                      dropTime={dropTime}
                      isDetail={isDetail}
                      setIsDetail={setIsDetail}
                    />
                  </SlideView>
                </TouchableWithoutFeedback>
              </>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
};

const styles3 = StyleSheet.create({
  container: {
    flex: 1,
  },
  enter: {
    fontSize: 17,
    fontWeight: "500",
    color: "#9A9A9A",
    marginLeft: 5,
    textAlign: "center",
  },
  TextBack: {
    width: 200,
    left: -8,
    top: 3,
    height: 25,
    padding: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#F4F4F4",
  },
});
