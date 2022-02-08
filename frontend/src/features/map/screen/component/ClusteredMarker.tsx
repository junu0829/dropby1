import React, { memo } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Marker } from "react-native-maps";

import { SvgXml } from "react-native-svg";
import { returnMarkerStyle } from "./helpers";
import Adrop from "../../../../../assets/Adrop";

const ClusteredMarker = ({
  geometry,
  properties,
  onPress,

  tracksViewChanges,
}) => {
  const points = properties.point_count;
  const { width, height, size, fontSize, emojiSize } =
    returnMarkerStyle(points);
  const emoji = "😀";

  return (
    <Marker
      key={`${geometry.coordinates[0]}_${geometry.coordinates[1]}`}
      coordinate={{
        longitude: geometry.coordinates[0],
        latitude: geometry.coordinates[1],
      }}
      style={{ zIndex: points + 1 }}
      onPress={onPress}
      tracksViewChanges={tracksViewChanges}
    >
      <TouchableOpacity
        activeOpacity={0.75}
        style={[styles.container, { width, height }]}
      >
        <View
          style={[
            styles.wrapper,
            {
              backgroundColor: "transparent",
              width,
              height,
            },
          ]}
        >
          <SvgXml
            xml={Adrop}
            width={size}
            height={size}
            style={{ opacity: 0.85, zIndex: 500 }}
          />
          {/* <Image
            source={PDrop}
            style={[styles.cluster, { width: 50, height: 50 }]}
            
          /> */}
          <Text
            style={[
              styles.emoji,
              {
                fontSize: emojiSize,

                color: "grey",
              },
            ]}
          >
            {emoji}
          </Text>

          <Text
            style={[
              styles.text,
              {
                fontSize: fontSize,
                color: "grey",
              },
            ]}
          >
            {points}
          </Text>
        </View>
      </TouchableOpacity>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    position: "absolute",

    zIndex: 0,
    flexDirection: "row",
  },

  text: {
    zIndex: 998,
    left: -45,
    top: 30,
    fontWeight: "bold",
  },
  emoji: {
    zIndex: 999,
    left: -40,
    top: 15,
    fontWeight: "bold",
  },
});

export default memo(ClusteredMarker);
