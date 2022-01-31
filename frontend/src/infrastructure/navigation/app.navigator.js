import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { LogIn } from "../../features/login/LogIn";
import { Loading } from "../../components/Loading";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { MapScreen } from "../../features/map/screen/map.screen";
import { WriteScreen } from "../../features/write/screen/write.screen";
import { EmojiSelectScreen } from "../../features/write/screen/emojiSelect.screen";
import { CameraScreen } from "../../features/write/screen/camera.screen";
const MainStack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator headerMode="none">
        <MainStack.Screen name="LogIn" component={LogIn} />
        <MainStack.Screen name="Loading" component={Loading} />
        <MainStack.Screen name="MapScreen" component={MapScreen} />
        <MainStack.Screen name="WriteScreen" component={WriteScreen} />

        <MainStack.Screen name="Emoji" component={EmojiSelectScreen} />
        <MainStack.Screen name="CameraScreen" component={CameraScreen} />
      </MainStack.Navigator>
    </NavigationContainer> // DropsOnMap은 MapScreen과 사실상 동일. 기능 구분을 용이하게 하기 위해 임시 분리.
  );
};
