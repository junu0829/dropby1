import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { LogIn } from "../../features/login/LogIn";
import { Loading } from "../../components/Loading";
import { NavigationContainer } from "@react-navigation/native";
import { MapScreen } from "../../features/map/screen/map.screen";
import { WriteScreen } from "../../features/write/screen/write.screen";
import DropsOnMap from '../../features/map/screen/map.screen.drops';

const IntroStack = createStackNavigator();

export const IntroNavigator = () => {
  return (
    <NavigationContainer>
      <IntroStack.Navigator headerMode="none">
        <IntroStack.Screen name="LogIn" component={LogIn} />
        <IntroStack.Screen name="Loading" component={Loading} />
        <IntroStack.Screen name="MapScreen" component={MapScreen} />
        <IntroStack.Screen name="WriteScreen" component={WriteScreen} />
        <IntroStack.Screen name="Drops" component={DropsOnMap} />  
      </IntroStack.Navigator>
    </NavigationContainer> // DropsOnMap은 MapScreen과 사실상 동일. 기능 구분을 용이하게 하기 위해 임시 분리.
  );
};
