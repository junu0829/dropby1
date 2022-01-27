import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { TextInput } from "react-native-gesture-handler";
import { theme } from "../../../infrastructure/theme";
import { SvgXml } from "react-native-svg";
import sendButton from "../../../../assets/sendButton";

import backButton2 from "../../../../assets/backButton2";

export const WriteScreen = ({ navigation, route }) => {
  const [placeName, setPlaceName] = useState("새로운 장소");
  const [placeAddress, setPlaceAddress] = useState("새로운 장소-주소");
  const [placeLatlng, setPlaceLatlng] = useState([0, 0]);

  useEffect(() => {
    setPlaceAddress(route.params[0].pressedAddress);
    setPlaceName(route.params[1].pressedAddressName);
    setPlaceLatlng(route.params[2].pressedLocation);
    console.log(route);
  }, []);

  return (
    <>
      <SafeArea>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MapScreen");
          }}
        >
          <SvgXml xml={backButton2} width={60} height={60}></SvgXml>
        </TouchableOpacity>
        <Text>{placeName}</Text>
        <Text>{placeAddress}</Text>

        <View styles={styles.container}>
          <TextInput placeholder="텍스트를 입력"></TextInput>
        </View>
        <TouchableOpacity>
          <SvgXml xml={sendButton} width={86} height={44}></SvgXml>
        </TouchableOpacity>
      </SafeArea>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg.secondary,
  },
});
