import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { theme } from "../../../infrastructure/theme";
import LoadIcon from "../../../../assets/images/LoadIcon";
import { SvgXml } from "react-native-svg";
import Checkbox from "expo-checkbox";
import googleLogin from "../../../../assets/Buttons/googleLogin";
import kakaoLogin from "../../../../assets/Buttons/kakaoLogin";

import { TextInput } from "react-native-gesture-handler";
import SignInButton from "../../../../assets/Buttons/SignInButton";
import AreYouStartingButton from "../../../../assets/Buttons/AreYouStartingButton";
import FindingPWButton from "../../../../assets/Buttons/FindingPWButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { saveToken } from '../../../components/utility/auth.js'
export const SignInScreen = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePassword = (e) => {
    setPassword(e);
  };

  const handleEmail = (e) => {
    setEmail(e);
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
        <View style={styles.container2}>
          <SvgXml xml={LoadIcon} width={72} height={123} />
        </View>
        <View style={styles.container3}>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#02B5AA"
              placeholder="이메일"
              onChangeText={(email) => handleEmail(email)}
              value={null}
            ></TextInput>
          </View>
          <View style={styles.inputBox2}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#02B5AA"
              placeholder="비밀번호"
              onChangeText={(password) => handlePassword(password)}
              value={null}
            ></TextInput>
          </View>

          <View
            style={{
              top: 5,
              width: 130,
              height: 30,
              flexDirection: "row",
              marginLeft: 185,
            }}
          >
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? theme.colors.bg.c : undefined}
            />
            <Text
              style={{
                color: theme.colors.bg.white,
                fontSize: 14,
                width: "90%",
                fontWeight: "700",
                marginTop: 8,
              }}
            >
              로그인 유지
            </Text>
          </View>

          <TouchableOpacity
            style={{ marginTop: 50 }}
            onPress={() => {
              signIn();
              navigation.navigate("MapScreen");
            }}
          >
            <SvgXml xml={SignInButton} width={320} height={43} />
          </TouchableOpacity>
        </View>
        <View style={styles.container4}>
          <TouchableOpacity style={{ marginTop: -15, right: 15 }}>
            <SvgXml xml={googleLogin} width={50} height={50} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: -15, left: 15 }}
            onPress={() => Alert.alert("준비중입니다")}
          >
            <SvgXml xml={kakaoLogin} width={50} height={50} />
          </TouchableOpacity>
        </View>
        <View style={styles.container5}>
          <TouchableOpacity
            style={{ marginTop: 5, right: 15 }}
            onPress={() => navigation.navigate("SignUp")}
          >
            <SvgXml xml={AreYouStartingButton} width={50} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert("준비중입니다")}
            style={{ marginTop: 5, left: 15 }}
          >
            <SvgXml xml={FindingPWButton} width={120} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 7,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container3: {
    flex: 8,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container4: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  container5: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
    margin: 8,
    width: 17,
    height: 17,
    borderColor: "white",
    borderRadius: 5,
  },
  inputBox: {
    backgroundColor: theme.colors.bg.white,
    width: 300,
    height: 38,
    opacity: 0.9,
    marginTop: 30,
    borderColor: theme.colors.bg.a,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
  },
  inputBox2: {
    backgroundColor: theme.colors.bg.white,
    width: 300,
    height: 38,
    opacity: 0.9,
    borderColor: theme.colors.bg.a,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 20,
    padding: 5,
  },
  input: {
    fontSize: 16,
    left: 50,
    top: 4,
    fontFamily: theme.fonts.body,
  },
});
