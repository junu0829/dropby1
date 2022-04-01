import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import { SvgXml } from "react-native-svg";
import {
  PlaceContainer,
  styles,
  ContainerEnd3,
  PlaceContainer2,
  WriteButton,
} from "../map.screen.styles";

import MenuButton from "../../../../../assets/Buttons/MenuButton";
import write from "../../../../../assets/Buttons/write";
import { Favourite } from "../../../../components/favorites/favourite.component";
import { useState } from "react";
import { theme } from "../../../../infrastructure/theme";
import { FlatList } from "react-native-gesture-handler";
import { DetailScreen } from "../DetailScreen";

export const DropPreview = ({
  pressedLocation = {},
  pressedAddress = {},
  pressedAddressName = {},
  dropContent = {},
  dropTime = {},
  navigation,
  setIsDetail,

  isDetail = {},
}) => {
  const [calibratedLocation, setCalibratedLocation] = useState({});
  const [placeName, setPlaceName] = useState("");
  const [touchY, setTouchY] = useState(null);
  const [marginT, setMarginT] = useState(0);
  const dropTimeShown = dropTime.substring(5, 10);
  useEffect(() => {
    setPlaceName;
    setPlaceName(pressedAddressName);
  }, [placeName, pressedAddressName]);

  const dropTimeMonth =
    dropTimeShown.substring(0, 1) == 0
      ? `${dropTimeShown.substring(1, 2)}월`
      : `${dropTimeShown.substring(0, 2)}월`;

  const dropTimeDay =
    dropTimeShown.substring(3, 4) == 0
      ? `${dropTimeShown.substring(4, 5)}일`
      : `${dropTimeShown.substring(3, 5)}일`;

  return (
    <>
      {isDetail ? (
        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: theme.colors.bg.white,
          }}
        />
      ) : null}
      <View
        style={{ flex: 1 }}
        onTouchStart={(e) => setTouchY(e.nativeEvent.pageY)}
        onTouchEnd={(e) => {
          if (touchY - e.nativeEvent.pageY > 20) {
            setIsDetail(true);
            // navigation.navigate("Popup");
          } else if (Math.abs(e.nativeEvent.pageY - touchY) > 20) {
            setIsDetail(false);
          }
          console.log(isDetail);
        }}
      >
        <PlaceContainer style={{ flex: 1 }}>
          <PlaceContainer2 style={{ top: 0 }}>
            <Text style={styles1.place}>{placeName}</Text>
            {/* <Text style={styles.placeaddress2}>{pressedAddress}</Text> */}

            <ContainerEnd3>
              <Text style={styles1.time}>
                {dropTimeMonth} {dropTimeDay}
              </Text>
              <TouchableOpacity style={{ marginTop: -10, marginEnd: 8 }}>
                <SvgXml xml={MenuButton} width={7} height={30} />
              </TouchableOpacity>
            </ContainerEnd3>
          </PlaceContainer2>
          {/* <View style={{ flexDirection: "row" }}>


        </View> */}
          <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 10, marginLeft: 80, fontSize: 18 }}>
              {dropContent}
            </Text>
          </View>
          <View style={{ flex: 2.5 }}>
            {!isDetail ? (
              <WriteButton
                onPress={() => {
                  navigation.navigate("WriteScreen", [
                    { pressedAddress },
                    { pressedAddressName },
                    { pressedLocation },
                    { calibratedLocation },
                  ]);
                }}
              >
                <SvgXml xml={write} width={56} height={65} />
              </WriteButton>
            ) : null}
          </View>
        </PlaceContainer>
        <View
          style={{
            width: "100%",
            height: Dimensions.get("window").height - 165,
            backgroundColor: theme.colors.bg.white,
          }}
        >
          <View>
            <DetailScreen></DetailScreen>
          </View>
        </View>
      </View>
    </>
  );
};

const styles1 = StyleSheet.create({
  place: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginLeft: 25,
  },
  address: {
    fontSize: 11,
    fontWeight: "500",
    color: "#B4B1B1",
    marginLeft: 25,
  },

  time: {
    fontSize: 12,
    color: "#817B7B",
    fontWeight: "500",
  },
});
