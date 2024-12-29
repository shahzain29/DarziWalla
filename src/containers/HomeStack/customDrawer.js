// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React,{useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Switch,
  TouchableOpacity
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Assets from '../../assets/index'
import {strings,ChangeLanguage} from '../../Translations/i18n'
import {useSelector,useDispatch} from 'react-redux'
import {setLanguage} from '../../Redux/actions'

const CustomSidebarMenu = (props,{navigation}) => {

  const dispatch=useDispatch()


  const[isEnabled,setIsEnabled] = useState(false)
  const [languageState,setLanguageState] = useState(useSelector(state=>state.authToken.language))

  const toggle = () =>{
    setIsEnabled(!isEnabled)
    dispatch(setLanguage(!languageState))
        if(languageState==false){
            ChangeLanguage("urdu")
        }

        if(languageState==true){
            ChangeLanguage("en")
        }
  }



  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <Image
        source={Assets.images.Splash}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <View style={styles.customItem}>
          <Text
            onPress={() => {
              Linking.openURL('https://derziwalla.com/tailor/privacyPolicy');
            }}>
            {strings("DrawerTexts.rateUs")}
          </Text>
          <Image
            source={{uri: BASE_PATH + 'star_filled.png'}}
            style={styles.iconStyle}
          />
        </View>

          <View style={[styles.customItem,{justifyContent:'space-between'}]}>

            <Text style={{fontSize:15,fontWeight:'bold'}}>
              {strings("DrawerTexts.urdu")}
            </Text>
            <Switch
        trackColor={{ false: "#767577", true: Assets.colors.appBg }}
        thumbColor={languageState ? "#ffff" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=>toggle()}
        value={languageState}
      />
      </View>
      </DrawerContentScrollView>


            <TouchableOpacity  style={{alignItems:'center',justifyContent:'space-between',padding:20,flexDirection:'row',marginBottom:30,width:'100%',alignSelf:'flex-start'}} onPress={()=>props.navigation.navigate('Logout')}>
          
              <Text style={{fontSize:17,fontWeight:'bold'}}>{strings("DrawerTexts.logout")}</Text>
              <Image
            source={Assets.images.logout}
            style={{height:30,width:30,tintColor:Assets.colors.appBg}}
            resizeMode='contain'
            />
            </TouchableOpacity>

      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey'
        }}>
        powered by APPCRATES
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;