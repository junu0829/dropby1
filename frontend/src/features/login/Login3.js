import React from "react";
import { SvgXml } from "react-native-svg";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import cloud from "../../../assets/cloud";
import 회원가입 from "../../../assets/회원가입";

export const Login3 = () => {

    const styles = StyleSheet.create({

        container: {
            flex: 1
        },
        card1: {
            flex: 5
        },
        cloud: {
            marginTop: -140,
            marginLeft: -40,
            resizeMode: 'contain'
        },
        nickname: {
            color: '#00c6c6',
            marginTop: -767,
            marginLeft: 140,
            fontSize: 14
        },
        email: {
            color: '#00c6c6',
            marginTop: 38,
            marginLeft: 140,
            fontSize: 14
        },
        email2: {
            fontSize: 14,
            color: '#ff0000',
            fontWeight: "700",
            marginTop: 20,
            marginLeft: 308
        },
        password: {
            color: '#00c6c6',
            marginTop: 40,
            marginLeft: 140
        },
        agree1: {
            marginTop: 24,
            marginLeft: 162,
            fontSize: 14,
            color: '#808080'
        },
        agree2: {
            marginTop: 5,
            marginLeft: 162,
            fontSize: 14,
            color: '#808080'
        },
        card2: {
            flex: 2
        },
        회원가입: {
            marginTop: 70,
            marginLeft: 15
        },
        experience: {
            marginTop: 30,
            marginLeft: 39,
            fontSize: 18,
            color: '#ffffff'
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.card1}>
                <ImageBackground style={styles.cloud}><SvgXml xml={cloud} width={470} height={1200} />
                    <Text style={styles.nickname}>닉네임</Text>
                    <Text style={styles.email}>이메일</Text>
                    <TouchableOpacity style={styles.email2}><Text style={{ color: 'red' }}>이메일 인증하기</Text></TouchableOpacity>
                    <Text style={styles.password}>비밀번호</Text>
                    <Text style={styles.agree1}>
                        Dropby의 이용약관과
                    </Text>
                    <Text style={styles.agree2}>
                        개인정보 취급 방침에 동의합니다.
                    </Text>
                </ImageBackground>
            </View>
            <View style={styles.card2}>
                <TouchableOpacity style={styles.회원가입}><SvgXml xml={회원가입} width={383} height={54} /></TouchableOpacity>
                <Text style={styles.experience}>
                    "드롭바이를 통해 장소를 새롭게 경험해 보세요"
                </Text>
            </View>
        </View>
    );
};