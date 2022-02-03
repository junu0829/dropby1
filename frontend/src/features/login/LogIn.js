import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { theme } from "../../infrastructure/theme";
import LoadIcon from "../../../assets/LoadIcon";
import { SvgXml } from "react-native-svg";

import LetsDrop from "../../../assets/LetsDrop";
import { FadeInView } from "../../components/animations/fade.animation";

export const LogIn = ({ navigation }) => {
  return (
    <>
      <LinearGradient
        style={styles.container}
        colors={[
          theme.colors.bg.a,
          theme.colors.bg.b,
          theme.colors.bg.c,
          theme.colors.bg.d,
        ]}
        start={{ x: 0.99, y: 0.01 }}
        end={{ x: 0.01, y: 0.99 }}
        locations={[0.0, 0.5, 0.8, 1.0]}
      >
        <FadeInView>
          <View style={styles.container2}>
            <SvgXml xml={LoadIcon} width={72} height={123} />
          </View>
          <View style={styles.container3}>
            <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
              <SvgXml xml={LetsDrop} width={231} height={47} />
            </TouchableOpacity>
          </View>
          <View style={styles.container4} />
        </FadeInView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  container2: {
    flex: 7,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container3: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container4: {
    flex: 3,
  },
});
