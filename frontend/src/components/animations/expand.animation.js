import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const ExpandView = ({ duration = 500, ...props }) => {
  const expandAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [expandAnim, duration]);

  return (
    <Animated.View // Special animatable View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...props.style,
        transform: [{ scale: expandAnim }],
        flex: 1,
      }}
    >
      {props.children}
    </Animated.View>
  );
};
