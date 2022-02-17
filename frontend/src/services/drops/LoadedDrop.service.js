import axiosInstance from "../fetch.js";
import LOCAL_HOST from "../../features/local.js";

export const LoadedDrop = (refresh) => {
  console.log("드롭 불러오는중...");

  axiosInstance
    .get(`http://${LOCAL_HOST}:3000/drops`)
    .then((res) => {
      console.log("드롭 불러옴");

      refresh(res.data.data);
    })
    .catch((error) => {
      console.log("error message: ", error.message);
    });
};
