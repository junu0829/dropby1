import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";

export const EmojiSelectScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bg.secondary,
      flexDirection: "column",
      flex: 1,
    },
  });
  return <SafeArea style={styles.container}></SafeArea>;
};
