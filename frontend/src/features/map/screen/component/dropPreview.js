import React, { useEffect } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";
import {
  PlaceContainer,
  styles,
  ContainerEnd3,
  PlaceContainer2,
  WriteButton,
} from "../map.screen.styles";
import { Text } from "../../../../components/typography/text.component";

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
  navigation,
  setIsDetail,
  isDetail = {},
}) => {
  const [touchY, setTouchY] = useState(null);
  const [marginT, setMarginT] = useState(0);

  // useEffect(() => {
  //   if (isDetail == true) {
  //     setMarginT(40);
  //   } else {
  //     setMarginT(0);
  //   }
  // }, [isDetail]);
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
          <PlaceContainer2>
            <Text style={styles.placename}>{pressedAddressName}</Text>
            {/* <Text style={styles.placeaddress2}>{pressedAddress}</Text> */}

            <ContainerEnd3>
              <Text style={styles.Timing}>방금 전</Text>
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
            <WriteButton
              onPress={() => {
                navigation.navigate("WriteScreen", [
                  { pressedAddress },
                  { pressedAddressName },
                  { pressedLocation },
                ]);
              }}
            >
              <SvgXml xml={write} width={56} height={65} />
            </WriteButton>
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
