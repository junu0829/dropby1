import React from "react";
import { StyleSheet, View, Image, Text, ImageBackground } from "react-native";

import { SvgXml } from "react-native-svg";
<<<<<<< HEAD
import GradationGuide from "../../assets/GradationGuide";
=======
import GradationGuide from "../../assets/Background/GradationGuide";
>>>>>>> fad10bb7e8e9faaf0519cafe2c739080147c5310

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
