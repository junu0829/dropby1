import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Marker } from "react-native-maps";
import { SvgXml } from "react-native-svg";
import Adrop from "../../../../../assets/Adrop";

import { returnMarkerStyle } from "./helpers";

const ClusteredMarker = ({
  geometry,
  properties,
  onPress,
  clusterColor,

  clusterFontFamily,
  tracksViewChanges,
}) => {
  const points = properties.point_count;
  const { width, height, fontSize, size } = returnMarkerStyle(points);

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
              backgroundColor: clusterColor,
              width,
              height,
              borderRadius: width / 2,
            },
          ]}
        >
          <SvgXml
            xml={Adrop}
            style={[styles.cluster, { width: size, height: size }]}
          />

          <Text
            style={[
              styles.text,
              {
                fontSize: 15,

                color: "FAFAFA",
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
    opacity: 0.5,
    zIndex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cluster: {
    flex: 1,

    zIndex: 1,
  },
  text: {
    flex: 1,
    zIndex: 3,

    fontWeight: "bold",
  },
});

export default memo(ClusteredMarker);
