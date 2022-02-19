import axios from 'axios';
import LOCAL_HOST from '../auth.js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {tokenRefresh} from '../auth.js'
import withoutInterceptors from './interceptors.js';
const defaultURL = LOCAL_HOST;

// function withoutAuth() {
//     const instance = axios.create({
//         baseURL: defaultURL + ':3000'
//     });
//     console.log('console instance', instance)
//     return withoutInterceptors(instance);
// }

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
    async (res) => {
        const access = await AsyncStorage.getItem('accessToken');
        const refresh = await AsyncStorage.getItem('refreshToken');

        if (access) {
            res.headers['Authorization'] = `Bearer ${access}`;
        }

        const newConfig = {...res};
        newConfig.url = `${res.url}`;

        return newConfig;

    }

)
axiosInstance.interceptors.response.use((response) => {
    return response
}, async function(error) {
    const originalRequest = error.config;
        console.log('step #1############');
        console.log(error.config);
        console.log('retry', originalRequest.retry);
        if (error.response.status === 401 && !originalRequest.retry) {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            console.log('access', accessToken);
            console.log('refresh', refreshToken);

            const newData = await tokenRefresh(accessToken, refreshToken);
            console.log('newData', newData);

            if (newData.status === 'New Access Token granted') {
                originalRequest.retry = true;
                AsyncStorage.setItem('accessToken', newData.tokens.access);
                const regex = /"data":{.+}/
                console.log('regex', regex.exec(originalRequest.data));
                console.log('original Request', originalRequest.data);

                const content_regex = /"content":".+?"/
                const latitude_regex = /"latitude":[0-9\.]+/
                const longitude_regex = /"longitude":[0-9\.]+/
                console.log(content_regex.exec(originalRequest.data)[0].split(':')[1].slice(1,-1));
                console.log(latitude_regex.exec(originalRequest.data)[0].split(':')[1]);
                console.log(longitude_regex.exec(originalRequest.data)[0].split(':')[1]);
                const originData = {
                    content:content_regex.exec(originalRequest.data)[0].split(':')[1].slice(1,-1),
                    latitude:latitude_regex.exec(originalRequest.data)[0].split(':')[1],
                    longitude:longitude_regex.exec(originalRequest.data)[0].split(':')[1]
                }


                originalRequest.headers['Authorization'] = `Bearer ${newData.tokens.access}`;
                originalRequest.data = originData;
                console.log(originalRequest.data);
                console.log('original', originalRequest)
                return axios(originalRequest);
            } else {
                return error;
            }
        }
        return Promise.reject(error);
    })

export default axiosInstance;
// export const withoutAuthInstance = withoutAuth();