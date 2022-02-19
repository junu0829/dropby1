import AsyncStorage from "@react-native-async-storage/async-storage";
import LOCAL_HOST from "../../features/local.js";
import axios from 'axios';
import { Alert } from "react-native";
//AsyncStorage에 토큰이 있는지 확인
export const checkIfTokenExists = () => {
    if (AsyncStorage.getItem('accessToken') && AsyncStorage.getItem('refreshToken')) {
        return true;
    }
    return false;
}

//토큰을 AsyncStorage에 저장
export const saveToken = (tokens) => {
    AsyncStorage.setItem("accessToken", tokens.access);
    AsyncStorage.setItem("refreshToken", tokens.refresh);
}

export const signIn = async (email, password, callback) => {
    console.log(`signIn request sent to http://${LOCAL_HOST}:3000/auth/login`);
    const response = await axios(`http://${LOCAL_HOST}:3000/auth/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            email,
            password,
        },
    })
        .then((res) => {
            saveToken(res.data.data.tokens);
            console.log("tokens saved in asyncstorage");
            callback();
        })
        .catch((error) => {
            Alert.alert('이메일과 비밀번호를 확인해 주세요!');
        });

    return response;
};

export const signUp = async (nickname, email, password, callback) => {
    if (nickname.length < 2) {
        Alert.alert('닉네임을 두 글자 이상 입력해 주세요!');
        return;
    };
    const emailRe = /[A-Za-z0-9]+@[a-z]+\.[a-z]+/
    if (!emailRe.test(email)) {
        Alert.alert('이메일 형식이 유효하지 않습니다!');
        return;
    };
    if (password.length < 8) {
        Alert.alert('비밀번호를 8자리 이상 입력해 주세요!');
        return;
    };

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
            saveToken(res.data.data.tokens);
            console.log("tokens saved in asyncstorage");
            callback();
        })
        .catch((error) => {
            Alert.alert(error.response.data.msg);
        });
    return response;
};