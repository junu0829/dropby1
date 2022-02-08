import React from "react";
import { ScrollView, Text } from "react-native";

export const FeedScreen = ({ navigation, route }) => {
  console.log(route.params[0].region);
  return (
    <ScrollView>
      <Text>드롭 내용</Text>
    </ScrollView>
  );
};
