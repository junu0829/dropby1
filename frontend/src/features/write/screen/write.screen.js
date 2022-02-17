import React from "react";

import {
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Image,
  Video,
} from "react-native";
import { useEffect, useState, useContext } from "react";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

import Constants from "expo-constants";

import addIcon from "../../../../assets/Buttons/addIcon";
import backButton2 from "../../../../assets/Buttons/backButton2";
import sendingButton from "../../../../assets/Buttons/sendingButton";
import bar from "../../../../assets/Background/bar";
import addPicture from "../../../../assets/Buttons/addPicture";
import LockButtonUnlocked from "../../../../assets/Buttons/LockButton(Unlocked)";

import { container, styles } from "./writescreen.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LOCAL_HOST from "../../local.js";
import {checkIfTokenExists} from '../../../components/utility/auth.js'
export const WriteScreen = ({ navigation, route }) => {
  const getToken = async () => AsyncStorage.getItem("accessToken");

  const [placeName, setPlaceName] = useState("새로운 장소");
  const [placeAddress, setPlaceAddress] = useState("새로운 장소-주소");
  const [placeLatlng, setPlaceLatlng] = useState([0, 0]);
  const [selectedEmoji, setSelectedEmoji] = useState("😀");

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
    setSelectedEmoji(route.params.selectedEmoji);
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
    console.log("Postwrite request sent");
    if (checkIfTokenExists) {
      const accessToken = await AsyncStorage.getItem("accessToken");

      await axios(`http://${LOCAL_HOST}:3000/drops`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          content,
          latitude,
          longitude,
        },
      })
        .then((res) => {
          console.log(`${res.data.data.content} 내용으로 ${res.data.msg}!`);
        })
        .catch((e) => console.log(e));

    } else {
      alert('유효한 사용자가 아닙니다.');
    }
    
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
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Emoji");
            }}
          >
            {selectedEmoji != null ? (
              <Text
                style={{
                  height: 70,
                  fontSize: 60,
                }}
              >
                {selectedEmoji}
              </Text>
            ) : (
              <SvgXml
                xml={addIcon}
                width={65}
                height={50}
                style={styles.addIcon}
              />
            )}
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
            />
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.textContainer}>
            <Text style={styles.place}>{placeName}</Text>
            <Text style={styles.address}>{placeAddress}</Text>
            <SvgXml xml={bar} width={280} height={2} style={styles.bar} />
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
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <SvgXml
            xml={LockButtonUnlocked}
            width={41}
            height={55}
            style={styles.LockButtonUnlocked}
          />
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};
