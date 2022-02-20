import axios from 'axios';
import LOCAL_HOST from '../auth.js';
import setInterceptors from './interceptors.js';
const defaultURL = LOCAL_HOST;

function noAuth() {
    const instance = axios.create({
        baseURL: defaultURL + ':3000/'
    });
    console.log('console instance', instance)
    return setInterceptors(instance);
}

export const noAuthInstance = noAuth();
