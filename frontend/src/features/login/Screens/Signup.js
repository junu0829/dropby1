import React, { useState, useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { theme } from "../../../infrastructure/theme";

import LoadIconPurple from "../../../../assets/images/LoadIconPurple";
import { SvgXml } from "react-native-svg";
import Checkbox from "expo-checkbox";

import SignUpCloud from "../../../../assets/Background/SignUpCloud.png";
import { cookieContext, setCookieContext } from "../../../../App";

import SignUpButton from "../../../../assets/Buttons/SignUpButton";

import { TextInput } from "react-native-gesture-handler";
import backButtonWhite from "../../../../assets/Buttons/backButtonWhite";
import { FadeInView } from "../../../components/animations/fade.animation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import LOCAL_HOST from "../../local.js";
export const SignUpScreen = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  const setCookie = useContext(setCookieContext);

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleNickname = (e) => {
    setNickname(e);
  };

  const handlePassword = (e) => {
    setPassword(e);
  };

  const handleEmail = (e) => {
    setEmail(e);
  };

  const signup = async () => {
    console.log("signup clicked");
    const response = await axios(`http://${LOCAL_HOST}:3000/auth/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        nickname,
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        const accessToken = res.data.data.tokens.access;
        const refreshToken = res.data.data.tokens.refresh;
        const nickname = res.data.data.userData.nickname;
        AsyncStorage.setItem("accessToken", accessToken);
        AsyncStorage.setItem("refreshToken", refreshToken);
        AsyncStorage.setItem("nickname", nickname);

        console.log("tokens saved in asyncstorage");
      })
      .catch((error) => {
        alert("회원가입 오류입니다");
        console.log(error.message);
      });

    return response;
  };

  return (
    <>
      <LinearGradient
        style={styles.container}
        colors={[
          theme.colors.bg.a,
          theme.colors.bg.b,
          theme.colors.bg.c,
          theme.colors.bg.d,
        ]}
        start={{ x: 0.99, y: 0.01 }}
        end={{ x: 0.01, y: 0.99 }}
        locations={[0.0, 0.5, 0.8, 1.0]}
      >
        <FadeInView>
          <View style={styles.container2}>
            <TouchableOpacity
              style={{ right: 140, top: 40 }}
              onPress={() => navigation.navigate("SignIn")}
            >
              <SvgXml xml={backButtonWhite} width={20} height={20} />
            </TouchableOpacity>
            <Text style={styles.CatchPhrase}>간단하게 정보를 입력해주세요</Text>
          </View>

          <View style={styles.container3}>
            <ImageBackground
              source={SignUpCloud}
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View style={styles.inputBoxStyle}>
                <TextInput
                  style={styles.inputStyle}
                  placeholderTextColor="#02B5AA"
                  placeholder="닉네임"
                  onChangeText={(nickname) => handleNickname(nickname)}
                  value={null}
                ></TextInput>
              </View>
              <View style={styles.inputBoxStyle2}>
                <TextInput
                  style={styles.inputStyle}
                  placeholderTextColor="#02B5AA"
                  placeholder="이메일"
                  onChangeText={(email) => handleEmail(email)}
                  value={null}
                ></TextInput>
              </View>

              <View style={styles.space}>
                <Text style={styles.authButton}>이메일 인증하기</Text>
              </View>

              <View style={styles.inputBoxStyle2}>
                <TextInput
                  style={styles.inputStyle}
                  placeholderTextColor="#02B5AA"
                  placeholder="비밀번호"
                  onChangeText={(password) => handlePassword(password)}
                  value={null}
                ></TextInput>
              </View>

              <View
                style={{
                  top: 20,
                  width: 220,
                  height: 30,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? theme.colors.bg.c : undefined}
                />
                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: "#808080",
                      fontSize: 12,
                      width: 130,
                      left: 20,
                      opacity: 0.7,
                      fontWeight: "700",
                      marginTop: 10,
                    }}
                  >
                    Dropby의 이용약관과
                  </Text>
                  <Text
                    style={{
                      color: "#808080",
                      fontSize: 12,
                      width: 200,

                      opacity: 0.7,
                      fontWeight: "700",
                      marginTop: 2,
                    }}
                  >
                    개인정보 취급 방침에 동의합니다.
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.container4}>
            <TouchableOpacity
              style={{ marginTop: 50 }}
              onPress={() => {
                signup();
                navigation.navigate("MapScreen");
              }}
            >
              <SvgXml xml={SignUpButton} width={320} height={43} />
            </TouchableOpacity>
          </View>
          <View style={styles.container5}></View>
        </FadeInView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  CatchPhrase: {
    color: theme.colors.bg.a,
    fontFamily: theme.fonts.bold,
    fontWeight: "700",
    opacity: 0.78,
    fontSize: 14,
    top: 100,

    justifyContent: "center",

    marginTop: 80,
  },
  container6: {
    flex: 5,
  },
  authButton: {
    fontSize: 13,
    marginTop: 0,
    fontFamily: theme.fonts.bold,
    color: theme.colors.bg.b,
    fontWeight: "700",
  },

  container2: {
    flex: 4,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 999,
  },
  container3: {
    flex: 12,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container4: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container5: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
    marginTop: 20,
    marginRight: 9,
    width: 17,
    height: 17,
    marginLeft: 10,

    borderColor: "#D0D0D0",
    borderRadius: 5,
  },
  inputBoxStyle: {
    backgroundColor: "#F8F5F5",
    width: 300,
    height: 38,
    opacity: 1,
    marginTop: 120,
    borderRadius: 20,
    borderColor: theme.colors.bg.b,
    borderWidth: 0.5,
    padding: 5,
  },
  inputBoxStyle2: {
    backgroundColor: "#F8F5F5",
    width: 300,
    height: 38,
    opacity: 1,
    borderColor: theme.colors.bg.b,
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 20,
    padding: 5,
  },
  space: {
    width: 290,
    height: 38,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  inputStyle: {
    fontSize: 16,
    left: 50,
    top: 4,
    fontFamily: theme.fonts.body,
  },
});
