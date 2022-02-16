import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../infrastructure/theme";
import LoadIcon from "../../assets/images/LoadIcon";
import { SvgXml } from "react-native-svg";
import styled from "styled-components";
import { ActivityIndicator, Colors } from "react-native-paper";
import LetsDrop from "../../assets/Buttons/LetsDrop";

const LoadingAnim = styled(ActivityIndicator)`
  margin-left: -13px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 80%;
  left: 50%;
`;

export const Loading = () => {
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
        <View style={styles.container2}>
          <SvgXml xml={LoadIcon} width={72} height={123} />
        </View>
        <View style={styles.container3}>
          <LoadingContainer>
            <LoadingAnim size={30} animating={true} color={Colors.white} />
          </LoadingContainer>
        </View>
        <View style={styles.container4} />
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
    flex: 5,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container4: {
    flex: 1,
  },
});
