import React from "react";
import { StyleSheet, View, Image, Text, ImageBackground } from "react-native";

import { SvgXml } from "react-native-svg";
import GradationGuide from "../../assets/GradationGuide";

export const Loading2 = () => {
  return (
    <View style={styles.container}>
      <SvgXml xml={GradationGuide} width={200} height={200}>
        <Text style={styles.test_text}>[내용]</Text>
      </SvgXml>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  test_text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});
