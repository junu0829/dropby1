import AsyncStorage from "@react-native-async-storage/async-storage";
import LOCAL_HOST from "../../features/local.js";

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

//signIn, signUp이 오류가 나면 서버에서 에러 메시지를 보내줌.
export const signIn = async () => {
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
            console.log(error.message);
        });

    return response;
};

export const signUp = async () => {
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
            saveToken(res.data.data.tokens);
            console.log("tokens saved in asyncstorage");
        })
        .catch((error) => {
            alert("회원가입 오류입니다");
            console.log(error.message);
        });

    return response;
};