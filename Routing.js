
// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/containers/SplashScreen';
import AuthStack from './src/containers/AuthStack/index';
import HomeStack from './src/containers/HomeStack/index';


import {Provider} from 'react-redux'
import {store} from './src/Redux/store'


const Stack = createStackNavigator();


function Routing() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default Routing;
