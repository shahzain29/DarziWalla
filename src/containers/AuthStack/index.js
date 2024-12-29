// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Darzi_Login/index';
import VerificationCode from './VerificationCode/index';
import SignUp from './Darzi_Signup/index'
import CheckUser from './CheckUser/index'
import SetPassword from './setPassword/index'
import ForgotPassword from './ForgotPassword/index'
import ResetPassword from './ResetPassword/index'
import ContactUs from './ContactUs/index'




const Stack = createStackNavigator();


function AuthStack() {
  return (
      <Stack.Navigator initialRouteName={'Login'} screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="VerificationCode" component={VerificationCode} />
        
       
        <Stack.Screen
        name = 'SignUp'
        component={SignUp}
        />

        <Stack.Screen name='CheckUser' component = {CheckUser}/>
        <Stack.Screen name = 'SetPassword' component = {SetPassword}/>
        <Stack.Screen name = 'ResetPassword' component = {ResetPassword}/>
        <Stack.Screen name =  'ForgotPassword' component = {ForgotPassword}/>
        <Stack.Screen name = 'ContactUs' component = {ContactUs}/>
      </Stack.Navigator>
  );
}

export default AuthStack;