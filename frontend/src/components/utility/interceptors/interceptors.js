import AsyncStorage from "@react-native-async-storage/async-storage";
import {tokenRefresh} from '../auth.js';
import axios from 'axios';
export default function setInterceptors(instance) {
    instance.interceptors.request.use(
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
    );

    instance.interceptors.response.use((response) => {
        return response
    }, async function(error) {
        const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest.retry) {
                const accessToken = await AsyncStorage.getItem('accessToken');
                const refreshToken = await AsyncStorage.getItem('refreshToken');
    
                const newData = await tokenRefresh(accessToken, refreshToken);
    
                if (newData.status === 'New Access Token granted') {
                    originalRequest.retry = true;
                    AsyncStorage.setItem('accessToken', newData.tokens.access);

                    const content_regex = /"content":".+?"/
                    const latitude_regex = /"latitude":[0-9\.]+/
                    const longitude_regex = /"longitude":[0-9\.]+/
                    const originData = {
                        content:content_regex.exec(originalRequest.data)[0].split(':')[1].slice(1,-1),
                        latitude:latitude_regex.exec(originalRequest.data)[0].split(':')[1],
                        longitude:longitude_regex.exec(originalRequest.data)[0].split(':')[1]
                    }
    
                    originalRequest.headers['Authorization'] = `Bearer ${newData.tokens.access}`;
                    originalRequest.data = originData;

                    return axios(originalRequest);
                } else {
                    return error;
                }
            }
            return Promise.reject(error);
        })

        return instance;
}


