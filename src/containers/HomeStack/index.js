// In App.js in a new project

import * as React from 'react';
import { View, Text,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home/index';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Assets from '../../assets'
import Profile from './Profile/index';
import Notifications from '../HomeStack/Notifications/index'
import CustomSidebarMenu from './customDrawer';
import Logout from '../HomeStack/Logout/index'
import EditProfile from '../HomeStack/EditProfile/index'
import {strings} from '../../Translations/i18n'
import OrderDetails from '../HomeStack/OrderDetails'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();



// function MyTabs() {
//   return (
//     <Tab.Navigator
//     tabBarOptions={{
//       activeTintColor: '#FFFFFF',
//       showLabel: true,
//       inactiveTintColor: '#B7BABF',
//       keyboardHidesTabBar: true,
//       style: {
//         padding: 7,
//         // height: isIphoneX() ? 82 : 55,
//         // paddingBottom: isIphoneX() ? 22 : 5,
//         backgroundColor: Assets.colors.appBg,
//         // borderTopColor: '#DCDDDF',
//         // borderTopWidth: 1,
//       },
//       labelStyle: {
//         // fontFamily: Font.Regular,
//         fontSize: 12,
//         fontWeight: '600'
//       }
//     }}
//     screenOptions={({ route,navigation }) => ({
//       tabBarIcon: ({ focused }) => {

//         if (route.name === 'Home') {
//           if (focused)
//             return <Image source={Assets.images.home_icon} style={{ width: 21, height: 23 }} resizeMode={'contain'} />
//           else
//             return <Image source={Assets.images.home_icon} style={{ width: 21, height: 23 }} resizeMode={'contain'} />
//         }
//         if (route.name === 'Orders') {
//           if (focused)
//             return <Image source={Assets.images.orders} style={{ width: 21, height: 23 }} resizeMode={'contain'} />
//           else
//             return <Image source={Assets.images.orders} style={{ width: 21, height: 23 }} resizeMode={'contain'} />
//         }
//         if (route.name === 'Orders2') {
//             return (
//               <View style={{backgroundColor: '#000000',height: 50,width: 50,justifyContent: "center",borderRadius: 25,marginBottom: 50}}>
//                 <Image source={Assets.images.orders} style={{ width: 21, height: 23,alignSelf: 'center' }} resizeMode={'contain'} />
//               </View>
//             )
            
//         }
//         if (route.name === 'Customers') {
//           if (focused)
//             return <Image source={Assets.images.customers}style={{ width: 21, height: 23 }} resizeMode={'contain'} />
//           else
//             return <Image source={Assets.images.customers} style={{ width: 21, height: 23 }} resizeMode={'contain'} />
//         }
//         if (route.name === 'Profile') {
//           if (focused)
//             return <Image source={Assets.images.profile} style={{ width: 21, height: 23 }} resizeMode={'contain'} />
//           else
//             return <Image source={Assets.images.profile} style={{ width: 21, height: 23 }} resizeMode={'contain'} />
//         }
      
//       },
//       tabBarLabel: ({ focused }) => {
//         if (route.name === 'Orders2') {
//          return null
//         }
//         if (route.name === 'Home') {
//             return <Text style={{fontSize: 12, color: focused ? '#ffffff' : '#E2DEDA'}}>Home</Text>
//         }
//         if (route.name === 'Orders') {
//           return <Text style={{fontSize: 12, color: focused ? '#ffffff' : '#E2DEDA'}}>Orders</Text>
//         }
//         if (route.name === 'Customers') {
//           return <Text style={{fontSize: 12, color: focused ? '#ffffff' : '#E2DEDA'}}>Customers</Text>
//         }
//         if (route.name === 'Profile') {
//           return <Text style={{fontSize: 12, color: focused ? '#ffffff' : '#E2DEDA'}}>Profile</Text>
//         }
      
//       },
//     })}
//     >
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Orders" component={Orders} />
//       <Tab.Screen name="Orders2" component={Orders2} />
//       <Tab.Screen name="Customers" component={Customers} />
//       <Tab.Screen name="Profile" component={Profile} />
//     </Tab.Navigator>




//   );
// }

function Orders2() {
  return null
}

function HomeStack() {
  return (
      <Stack.Navigator initialRouteName={'Home'} screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={DrawerNav} />
        <Stack.Screen name = 'Notifications' component ={Notifications}/>
        <Stack.Screen name = 'Logout' component = {Logout}/>
        <Stack.Screen name = 'EditProfile' component = {EditProfile}/>
        <Stack.Screen name = 'OrderDetails' component = {OrderDetails}/>
   
      </Stack.Navigator>



  );
}

function DrawerNav(){ 
  return(
 
  <Drawer.Navigator initialRouteName="Home" 
  screenOptions={{
    drawerStyle: {
      backgroundColor: Assets.colors.appBg,
      width: 240,
    },

   
    
  }}
  drawerContentOptions={{
    activeTintColor: Assets.colors.appBg,
    itemStyle: {marginVertical: 5},
  }}
  drawerContent={(props) => <CustomSidebarMenu {...props} />}
  >
    <Drawer.Screen name={strings("DrawerTexts.home")} component={Home} />
    <Drawer.Screen name={strings("DrawerTexts.profile")} component={Profile} />
  
    
     

   
  </Drawer.Navigator>
  
  )
}

export default HomeStack;