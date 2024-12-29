import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Text, StatusBar} from 'react-native';
import Assets from "../../assets"
import { StackActions } from "@react-navigation/native";
import {useSelector} from 'react-redux'


const SplashScreen = ({navigation}) =>  {

    const token = useSelector(state=>state.authToken.userToken)


    useEffect(()=>{        
        
        setTimeout(() => {
            console.log('==============',token)
           skipLogin()

        }, 4000);
    },[token])

    const skipLogin = () =>{
        if(token!=''){
            navigation.dispatch(StackActions.replace('HomeStack'))
        }
        else{
            navigation.dispatch(StackActions.replace('AuthStack'))
        }
        
    }


   
        return (
            <View style={style.mainContainer}>
            <Image style={{height:300,width:300}} source={Assets.images.Splash} resizeMode='contain' />
            </View>
        );
    
}
export default SplashScreen;
const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Assets.colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
