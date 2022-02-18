import axiosInstance from "../fetch.js";
import LOCAL_HOST from "../../features/local.js";
import { useMemo } from "react";
export const LoadedDrop = (setDrops) => {
  console.log("드롭 불러오는중...");

  axiosInstance
    .get(`http://${LOCAL_HOST}:3000/drops`)
    .then((res) => {
      console.log("드롭 불러옴");

      setDrops(res.data.data);
    })
    .catch((error) => {
      console.log("error message: ", error.message);
    });
};
