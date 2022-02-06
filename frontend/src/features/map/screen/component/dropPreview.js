import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import {
  PlaceContainer,
  styles,
  ContainerEnd3,
  PlaceContainer2,
  WriteButton,
} from "../map.screen.styles";
import { Text } from "../../../../components/typography/text.component";

import MenuButton from "../../../../../assets/MenuButton";
import write from "../../../../../assets/write";

export const DropPreview = ({
  pressedLocation = {},
  pressedAddress = {},
  pressedAddressName = {},
  dropContent = {},
  navigation,
}) => {
  return (
    <>
      <PlaceContainer>
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
    </>
  );
};
