import React, { Component } from "react";
import { View, Animated } from "react-native";

// const styles = ...

export default class Slide extends Component {
  state = {
    visible: false,
    x: new Animated.Value(-100),
  };

  slide = () => {
    Animated.spring(this.state.x, {
      toValue: 0,
    }).start();
    this.setState({
      visible: true,
    });
  };

  render() {
    // in practice you wanna toggle this.slide() after some props validation, I hope
    this.slide();
    return (
      <View>
        <Animated.View
          style={[
            {
              flex: 1,
              transform: [
                {
                  translateX: this.state.x,
                },
              ],
            },
          ]}
        >
          {/* your content, such as this.props.children */}
        </Animated.View>
      </View>
    );
  }
}
