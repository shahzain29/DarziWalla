import React, { useState,useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    StatusBar,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Dimensions, TextInput, ScrollView
} from 'react-native';
import Assets, { colors } from '../../../assets';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import OTPInput from '../../../components/OTPInput';
import AppButton from '../../../components/AppButton'
import Toast from 'react-native-simple-toast'
import {verifyCodeAPI} from '../../../API/Methods/methods'
import { StackActions } from '@react-navigation/routers';
import Loader from '../../../components/Loader'
import {strings} from '../../../Translations/i18n'


const  VerificationCode=({navigation,route})=> {

    const { width, height } = Dimensions.get('window');


    const [verifyCode,setVerifyCode] =  useState('')
    const [loading,setLoading] = useState(false)
    const number = route.params.phNum

    useEffect(()=>{
        console.log(number)
    })

    const onVerifyPress = async () =>{

        try {
            console.log(number)
           
            setLoading(true)
            const formData = new FormData()
            formData.append('phone_number',(number.toString()))
            formData.append('verification_code',verifyCode)
            console.log(verifyCode)
            const response = await verifyCodeAPI(formData)

            console.log('VerifyCode_Response====>>',response.data)

            if(response.status==200){
                setLoading(false)
                Toast.show("User Verified")
               navigation.navigate('Login')
            }

        } catch (error) {
            setLoading(false)
            alert(error)
            console.log('VerifyCodeAPI_Error===>>',error)
            
        }
    }


    
        return (
            <View
                style={style.mainContainer}
            >
                <KeyboardAwareScrollView>
                <View style={{ height: 200, justifyContent: "flex-end" }}>
                    <Image style={{ width: 100, height: 100, alignSelf: 'center' }} source={Assets.images.phone_code_send} />
                </View>
                {/* <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 30, fontSize: 18 }}>VERIFICATION CODE</Text> */}
                <View style={{ height: 80, justifyContent: 'center', width: '80%', alignSelf: "center",marginTop: 30, }}>
                    <Text style={{ textAlign: 'center',  lineHeight: 20 }}>{strings("VerificationScreen.header")}</Text>
                </View>


                <OTPInput 
               
                onComplete={(code)=>{
                    setVerifyCode(code);
                   
                }}
                />
                
                
                <AppButton
                    buttonText={strings("VerificationScreen.verifyButton")}
                    TextStyle={{ letterSpacing: 1, color: Assets.colors.WHITE }}
                    styles={{ backgroundColor: Assets.colors.appBg, height: 50, width: '90%', borderRadius: 10, alignSelf: "center",marginTop: 30 }}
                onPressButton={() => onVerifyPress()}
                />
                 <Loader loading={loading} isShowIndicator={true} />
                </KeyboardAwareScrollView>
                <Text style={{ textAlign: 'center', marginTop: 30 }}>{strings("VerificationScreen.footer1")}</Text>
                    <Text style={{ textAlign: 'center', marginTop: 10,marginBottom: 10 }}>{strings("VerificationScreen.footer2")}</Text>
            
            </View>
        );
    }


export default VerificationCode;





const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',

    },
    renderView: {
        // margin: 10,
        height: 120,
        width: '90%',
        margin: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#5D5D5D'
    }


});
