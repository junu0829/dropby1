import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkIfTokenExists = () => {
    if (AsyncStorage.getItem('accessToken') && AsyncStorage.getItem('refreshToken')) {
        return true;
    }
    return false;
}

export const saveToken = (tokens) => {
    AsyncStorage.setItem("accessToken", tokens.access);
    AsyncStorage.setItem("refreshToken", tokens.refresh);
}

