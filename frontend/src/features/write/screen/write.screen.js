import React from "react";

import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Image,
  Video,
} from "react-native";
import { useEffect, useState } from "react";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { TextInput } from "react-native-gesture-handler";
import { theme } from "../../../infrastructure/theme";
import { SvgXml } from "react-native-svg";

import Constants from "expo-constants";

import addIcon from "../../../../assets/addIcon";
import backButton2 from "../../../../assets/backButton2";
import sendingButton from "../../../../assets/sendingButton";
import bar from "../../../../assets/bar";
import addPicture from "../../../../assets/addPicture";
import LockButtonUnlocked from "../../../../assets/LockButton(Unlocked)";

import { container, styles } from "./writescreen.styles";

export const WriteScreen = ({ navigation, route }) => {
  const [placeName, setPlaceName] = useState("새로운 장소");
  const [placeAddress, setPlaceAddress] = useState("새로운 장소-주소");
  const [placeLatlng, setPlaceLatlng] = useState([0, 0]);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  /////////////////////로컬 이미지 여기에 담김
  const [image, setImage] = useState(null);
  //////////////////////
  let user_idx = Constants.installationId;

  useEffect(() => {
    setPlaceAddress(route.params[0].pressedAddress);
    setPlaceName(route.params[1].pressedAddressName);
    setPlaceLatlng(route.params[2].pressedLocation);
    handleLatitude(placeLatlng.latitude);
    handleLongitude(placeLatlng.longitude);
    handlePk(user_idx);
    setImage(route.params.source);
    setSelectedEmoji(route.params.emoji);
    console.log(image);
    console.log(selectedEmoji);
  }, [
    route,
    placeLatlng.latitude,
    placeLatlng.longitude,
    user_idx,
    image,
    selectedEmoji,
  ]);
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
      .post("http://localhost:3000/drops", {
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
    <SafeArea style={styles.container}>
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MapScreen");
            }}
          >
            <SvgXml
              xml={backButton2}
              width={50}
              height={50}
              style={styles.backButton}
            ></SvgXml>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Emoji");
            }}
          >
            <SvgXml
              xml={addIcon}
              width={65}
              height={50}
              style={styles.addIcon}
            ></SvgXml>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              PostWrite();
              navigation.navigate("MapScreen", drop);
            }}
          >
            <SvgXml
              xml={sendingButton}
              width={67}
              height={40}
              style={styles.sendingButton}
            ></SvgXml>
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.textContainer}>
            <Text style={styles.place}>{placeName}</Text>
            <Text style={styles.address}>{placeAddress}</Text>
            <SvgXml
              xml={bar}
              width={280}
              height={2}
              style={styles.bar}
            ></SvgXml>
            <TextInput
              style={styles.enter}
              placeholder="텍스트를 입력하세요"
              onChangeText={(content) => handleContent(content)}
              value={content}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* ---------------------------------------------------이미지 불러와서 미리보기--------------------------------------------------- */}
      {route.params.type === 1 ? (
        <View>
          <Image
            style={container.image}
            source={{ uri: route.params.source }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            style={{ aspectRatio: 1 / 1, backgroundColor: "black" }}
          />
        </View>
      ) : route.params.type === 0 ? (
        <View>
          <Video
            source={{ uri: route.params.source }}
            shouldPlay={true}
            isLooping={true}
            resizeMode="cover"
            style={{ aspectRatio: 1 / 1, backgroundColor: "black" }}
          />
        </View>
      ) : null}
      <View style={styles.containerLow}>
        <TouchableOpacity
          onPress={() => {
            PostWrite();
            navigation.navigate("CameraScreen", route);
          }}
        >
          <SvgXml
            xml={addPicture}
            width={90}
            height={90}
            style={styles.addPicture}
          ></SvgXml>
        </TouchableOpacity>
        <TouchableOpacity>
          <SvgXml
            xml={LockButtonUnlocked}
            width={41}
            height={55}
            style={styles.LockButtonUnlocked}
          ></SvgXml>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};
