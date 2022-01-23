import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { LogIn } from "../../features/login/LogIn";
import { Loading } from "../../components/Loading";
import { NavigationContainer } from "@react-navigation/native";
import { MapScreen } from "../../features/map/screen/map.screen";

const IntroStack = createStackNavigator();

export const IntroNavigator = () => {
  return (
    <NavigationContainer>
      <IntroStack.Navigator headerMode="none">
        <IntroStack.Screen name="LogIn" component={LogIn} />
        <IntroStack.Screen name="Loading" component={Loading} />
        <IntroStack.Screen name="MapScreen" component={MapScreen} />
      </IntroStack.Navigator>
    </NavigationContainer>
  );
};
