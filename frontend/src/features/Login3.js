import React from "react";

import { SvgXml } from "react-native-svg";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Drops from "../../assets/Drops";
import backButton from "../../assets/backButton";
export const Login3 = () => {
  const styles = StyleSheet.create({
    container: {},

    card1: {},

    placename: {
      fontSize: 17,

      fontWeight: "700",

      marginTop: 15,

      marginLeft: 20,
    },

    emailname: {
      fontSize: 10,

      fontWeight: "700",

      marginTop: 4,

      marginLeft: 20,
    },

    email: {
      fontSize: 10,

      fontWeight: "700",

      marginTop: -31,

      marginLeft: 180,
    },

    password: {
      fontSize: 17,

      fontWeight: "700",

      marginTop: -7,

      marginLeft: 345,
    },

    card2: {},

    agree: {
      marginTop: 10,

      marginLeft: 40,

      width: 38,

      height: 42,
    },

    experience: {
      marginTop: 9,

      marginLeft: 30,
    },

    회원가입: {
      marginTop: -45,

      marginLeft: 115,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.card1}>
        <Text style={styles.placename}>닉네임</Text>

        <Text style={styles.emailname}>이메일</Text>

        <Text style={styles.email}>이메일 인증하기</Text>

        <Text style={styles.password}>비밀번호</Text>

        <Text style={styles.agree}>
          Dropby의 이용약관과 개인정보 취급 방침에 동의합니다
        </Text>

        <Text style={styles.experience}>
          "드롭바이를 통해 장소를 새롭게 경험해 보세요"
        </Text>
      </View>

      <View style={styles.card2}>
        <SvgXml xml={Drops} width={38} height={42} />

        <TouchableOpacity style={styles.회원가입}>
          <SvgXml xml={backButton} width={49} height={48} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
