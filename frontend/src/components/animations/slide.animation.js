import React, { useRef, useEffect, useState } from "react";
import { Animated } from "react-native";
import { Dimensions } from "react-native";

export const SlideView = ({ duration = 500, isDetail = {}, ...props }) => {
  const SlideAnim = useRef(
    new Animated.Value(isDetail == true ? 0 : 1)
  ).current;
  const height = Dimensions.get("window").height;
  const endValue = Math.abs(height) * -1 + 165;
  const endvalue2 = 0;

  useEffect(() => {
    Animated.timing(SlideAnim, {
      toValue: isDetail ? endValue : endvalue2,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [SlideAnim, duration, endValue, endvalue2, height, isDetail]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,

        transform: [{ translateY: SlideAnim }],

        flex: 1,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

// export default class Slide extends Component {
//   state = {
//     visible: false,
//     y: new Animated.Value(500),
//   };

//   slide = () => {
//     Animated.spring(this.state.x, {
//       toValue: -100,
//       duration: 2000,
//     }).start();
//     this.setState({
//       visible: true,
//     });
//   };

//   render() {
//     // in practice you wanna toggle this.slide() after some props validation, I hope
//     this.slide();
//     return (
//       <View>
//         <Animated.View
//           style={[
//             {
//               transform: [{ translateY: this.state.y }],
//             },
//           ]}
//         >
//           {/* your content, such as this.props.children */}
//         </Animated.View>
//       </View>
//     );
//   }
