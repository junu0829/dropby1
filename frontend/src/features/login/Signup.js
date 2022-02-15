import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  ImageBackground,
} from "react-native";
import { theme } from "../../infrastructure/theme";

import LoadIconPurple from "../../../assets/images/LoadIconPurple";
import { SvgXml } from "react-native-svg";
import Checkbox from "expo-checkbox";

import SignUpCloud from "../../../assets/Background/SignUpCloud.png";

import SignUpButton from "../../../assets/Buttons/SignUpButton";
import LetsDrop from "../../../assets/LetsDrop";
import { TextInput } from "react-native-gesture-handler";

export const SignUpScreen = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
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
        <View style={styles.container2}></View>

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
            <SvgXml
              xml={LoadIconPurple}
              width={72}
              height={123}
              style={{ marginTop: 45, opacity: 0.92 }}
            />
            <View
              style={{
                backgroundColor: "#F8F5F5",
                width: 300,
                height: 38,
                opacity: 1,

                borderRadius: 20,
                borderColor: theme.colors.bg.a,
                borderWidth: 1,
                padding: 5,
              }}
            >
              <TextInput
                style={{
                  fontSize: 16,
                  left: 50,
                  top: 4,
                  fontFamily: theme.fonts.body,
                }}
                placeholderTextColor="#02B5AA"
                placeholder="닉네임"
                onChangeText={() => handleContent()}
                value={null}
              ></TextInput>
            </View>
            <View
              style={{
                backgroundColor: "#F8F5F5",
                width: 300,
                height: 38,
                opacity: 1,
                borderColor: theme.colors.bg.a,
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 20,
                padding: 5,
              }}
            >
              <TextInput
                style={{
                  fontSize: 16,
                  left: 50,
                  top: 4,
                  fontFamily: theme.fonts.body,
                }}
                placeholderTextColor="#02B5AA"
                placeholder="이메일"
                onChangeText={() => handleContent()}
                value={null}
              ></TextInput>
            </View>

            <View
              style={{
                width: 290,
                height: 38,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 0,
                  fontFamily: theme.fonts.bold,
                  color: theme.colors.bg.b,
                  fontWeight: "700",
                }}
              >
                이메일 인증하기
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#F8F5F5",
                width: 300,
                height: 38,
                opacity: 1,
                borderColor: theme.colors.bg.a,
                borderWidth: 1,
                marginTop: 20,
                borderRadius: 20,
                padding: 5,
              }}
            >
              <TextInput
                style={{
                  fontSize: 16,
                  left: 50,
                  top: 4,
                  fontFamily: theme.fonts.body,
                }}
                placeholderTextColor="#02B5AA"
                placeholder="비밀번호"
                onChangeText={() => handleContent()}
                value={null}
              ></TextInput>
            </View>

            <View
              style={{
                top: 5,
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
                    fontSize: 14,
                    width: 130,

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
                    fontSize: 14,
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
            onPress={() => navigation.navigate("SignIn")}
          >
            <SvgXml xml={SignUpButton} width={320} height={43} />
          </TouchableOpacity>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              top: 10,

              justifyContent: "center",

              fontWeight: "700",
              marginTop: 20,
            }}
          >
            드롭바이를 통해 장소를 새롭게 경험해보세요
          </Text>
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
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container3: {
    flex: 15,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container4: {
    flex: 8,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container5: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
    marginTop: 20,
    marginRight: 5,
    width: 19,
    height: 19,

    borderColor: "#D0D0D0",
    borderRadius: 5,
  },
});
