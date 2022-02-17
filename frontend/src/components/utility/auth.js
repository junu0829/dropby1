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

export const signIn = async (email, password) => {
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
        })
        .catch((error) => {
            Alert.alert('이메일과 비밀번호를 확인해 주세요!');
        });

    return response;
};

export const signUp = async (nickname, email, password) => { //회원가입 시 발생하는 에러는 이미 사용중인 이메일, 비밀번호 짧게 정도?
    if (nickname.length < 1) {
        Alert.alert('닉네임을 입력해 주세요!');
        return;
    };
    if (email.length < 4) {
        Alert.alert('이메일을 입력해 주세요!');
        return;
    };
    if (password.length < 8) {
        Alert.alert('비밀번호를 8자리 이상 입력해 주세요!');
        return;
    }; //속도 문제 때문에 프런트에서 검증하는 게 좋을 거 같긴 함.. 로직 추가 필요.

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
        })
        .catch((error) => {
            Alert.alert(error.response.data.msg);
        });
    return response;
};