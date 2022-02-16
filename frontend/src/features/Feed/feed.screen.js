import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

export const FeedScreen = ({ navigation, route }) => {
  const [drops, setDrops] = useState([
    {
      emoji: "😀",
      content: "드롭바이짱",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.398811798656766,
      longitude: 126.6377265751362,
      pk: 22,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },
    {
      emoji: "🥰",
      content: "드롭바이짱2",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.397841735093614,
      longitude: 126.6367502933775,
      pk: 23,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },

    {
      emoji: "🐵",
      content: "드롭바이짱3",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.397686933515644,
      longitude: 126.63464320297088,
      pk: 2,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },
    {
      emoji: "🍇",
      content: "드롭바이짱4",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.39791239133797,
      longitude: 126.67815894345523,
      pk: 5,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },
  ]);

  const region = route.params[0].region;
  const [regionLat, regionLng, regionLatD, regionLngD] = [
    region.latitude,
    region.longitude,
    region.latitudeDelta,
    region.longitudeDelta,
  ];

  useEffect(() => {
    /////다시생각해보니까 애초에 axios로 get을 할때부터 위 조건에 따라 쿼리를 하는것이 낫겠다.
  });

  return (
    <ScrollView>
      <Text>드롭 내용</Text>
    </ScrollView>
  );
};
