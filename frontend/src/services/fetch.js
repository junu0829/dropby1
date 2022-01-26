import axios from "axios";

const axiosInstance = axios.create();
// fetch data from API using config
// config contains url, method, headers, params, data, ...
// reference: https://github.com/axios/axios#request-config
const fetchApi = async (config) => {
  try {
    const { data } = await axiosInstance(config);
    return [data, null];
  } catch (e) {
    return [null, e];
  }
};
export default fetchApi;
