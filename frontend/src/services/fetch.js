import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LOCAL_HOST from "../features/local.js";

const axiosInstance = axios.create();
// fetch data from API using config
// config contains url, method, headers, params, data, ...
// reference: https://github.com/axios/axios#request-config

axiosInstance.defaults.timeout = 30000;
axiosInstance.defaults.timeoutErrorMessage = "timeout";

//서버랑 통신할때마다 따로 axios를 부르는게 아니라, 여기서 export된 axioInstance로 부르면 아래 조건들을 일괄적으로 적용할 수 있음.
//https://as-you-say.tistory.com/240
//reference: https://velog.io/@kyungjune/refresh%ED%86%A0%ED%81%B0-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
//https://maruzzing.github.io/study/rnative/axios-interceptors%EB%A1%9C-%ED%86%A0%ED%81%B0-%EB%A6%AC%ED%94%84%EB%A0%88%EC%8B%9C-%ED%95%98%EA%B8%B0/
//https://as-you-say.tistory.com/240

//서버에 요청보내기전에 끼어들어서 설정하는 것
axiosInstance.interceptors.request.use(
  async function (config) {
    const accessToken = await AsyncStorage.getItem("accessToken");
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    };
    return config;
  },
  function (error) {
    // 오류 요청 가공
    return Promise.reject(error);
  }
);

//서버에서 대답받기 전에 끼어들어서 설정하는것. 여기서 refreshToken만료될 경우 다시 발급해오고 있음(아직 잘 안됨...ㅜ)

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    if (status === 401) {
      console.log("토큰만료");
      const refreshToken = await AsyncStorage.getItem("refresoken");
      axios({
        method: "post",
        url: `http://${LOCAL_HOST}:3000/auth/refresh`,
        data: { refreshToken },
      }).then(async (response) => {
        const accessToken = response.data.data.tokens.access;

        await AsyncStorage.setItem("accessToken", accessToken);

        originalRequest.headers = { Authorization: `Bearer ${accessToken}` };
        return axios(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
