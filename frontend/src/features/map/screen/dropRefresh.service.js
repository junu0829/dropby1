import React, { useReducer } from "react";
import axiosInstance from "../../../services/fetch.js";
import LOCAL_HOST from "../../features/local.js";

export const initialState = {
  array: [
    {
      emoji: "😀",
      content: "드롭바이짱",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.398811798656766,
      longitude: 126.6377265751362,
      pk: 22,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },
  ],
  //초기상태
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "refresh":
      return axiosInstance
        .get(`http://${LOCAL_HOST}:3000/drops`)
        .then((res) => {
          console.log("드롭 불러옴");

          return res.data.data;
        })
        .catch((error) => {
          console.log("error message: ", error.message);
        });
    default:
      return state;
  }
};
