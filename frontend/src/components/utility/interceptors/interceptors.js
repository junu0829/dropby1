import AsyncStorage from "@react-native-async-storage/async-storage";
import {tokenRefresh} from '../auth.js';

export default function withoutInterceptors(instance) {
    instance.interceptors.response.use((response) => {
        return response
    }, 
    async function(error) {
        const originalRequest = error.config;
        console.log('step #1############');

        if (error.response.status === 401 && !originalRequest.retry) {
            const accessToken = AsyncStorage.getItem('accessToken');
            const refreshToken = AsyncStorage.getItem('refreshToken');

            const newData = await tokenRefresh(accessToken, refreshToken);

            if (newData.success) {
                originalRequest.retry = true;
                AsyncStorage.setItem('accessToken', newData.access);

                instance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
                return instance(originalRequest);
            } else {
                return error;
            }
        }
        return error;
    })
}


