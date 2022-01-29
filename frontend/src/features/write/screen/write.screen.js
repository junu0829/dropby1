import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { TextInput } from "react-native-gesture-handler";
import { theme } from "../../../infrastructure/theme";
import { SvgXml } from "react-native-svg";
import sendButton from "../../../../assets/sendButton";
import Constants from "expo-constants";
import { fetchApi } from "../../../services/fetch";

import backButton2 from "../../../../assets/backButton2";

export const WriteScreen = ({ navigation, route }) => {
  const [placeName, setPlaceName] = useState("새로운 장소");
  const [placeAddress, setPlaceAddress] = useState("새로운 장소-주소");
  const [placeLatlng, setPlaceLatlng] = useState([0, 0]);

  let user_idx = Constants.installationId;

  useEffect(() => {
    setPlaceAddress(route.params[0].pressedAddress);
    setPlaceName(route.params[1].pressedAddressName);
    setPlaceLatlng(route.params[2].pressedLocation);
    handleLatitude(placeLatlng.latitude);
    handleLongitude(placeLatlng.longitude);
    handlePk(user_idx);
  }, [route, placeLatlng.latitude, placeLatlng.longitude, user_idx]);
  ////////////////////

  const [pk, setPk] = useState("");
  const [content, setContent] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const drop = {
    pk,
    content,
    latitude,
    longitude,
  };

  const handlePk = (e) => {
    setPk(e);
  };

  const axios = require("axios");

  const handleContent = (e) => {
    setContent(e);
  };

  const handleLatitude = (e) => {
    setLatitude(e);
  };

  const handleLongitude = (e) => {
    setLongitude(e);
  };

  const PostWrite = async () => {
    axios
      .post("http://192.168.35.8:3000/drops", {
        pk: 0,
        content: content,
        latitude: latitude,
        longitude: longitude,
      })
      .then(() => {
        console.log("드롭 등록 완료");
      });
  };

  return (
    <>
      <SafeArea>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MapScreen");
          }}
        >
          <SvgXml xml={backButton2} width={60} height={60} />
        </TouchableOpacity>
        <Text>{placeName}</Text>
        <Text>{placeAddress}</Text>

        <View styles={styles.container}>
          <TextInput
            placeholder="텍스트를 입력하세요"
            onChangeText={(content) => handleContent(content)}
            value={content}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            PostWrite();
            navigation.navigate("MapScreen", drop);
          }}
        >
          <SvgXml xml={sendButton} width={86} height={44} />
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
