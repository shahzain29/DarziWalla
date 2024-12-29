import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../../components/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Assets from '../../../assets/index'
import FloatingLabelInputField from '../../../components/FloatingLabelInputField'
import AppButton from '../../../components/AppButton'
import OTPInput from '../../../components/OTPInput';
import {resetPasswordAPI} from '../../../API/Methods/methods'
import Loader from '../../../components/Loader'
import Toast  from 'react-native-simple-toast'
import {strings} from '../../../Translations/i18n'

const index = ({navigation,route}) => {



    const [verifyCode,setVerifyCode] = useState('')
    const [newPass,setNewPass] = useState('')
    const [phNum,setphNum] = useState(route.params.phNumber)
    const [loading,setLoading] = useState(false)

    const onChangePassPress = async () =>{
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('phone_number',phNum)
            formData.append('password',newPass)
            formData.append('verification_code',verifyCode)

            const response = await resetPasswordAPI(formData)
            console.log('resetPasswordAPI_response==>>>',response.data)
            if(response.status==200){
                Toast.show("Pasword Updated")
                navigation.navigate("Login")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert(error)
            console.log('resetPasswordAPI_Error=>>>',error)
            
        }
    }


    return (
        <View style={styles.mainContainer}>
           <KeyboardAwareScrollView>
           <Header
          containerStyle={{backgroundColor: Assets.colors.appBg}}
          hearderText={strings("ForgotPassword2.title")}
          hearderTextStyle={{color: Assets.colors.WHITE}}
          leftIcon={Assets.images.back}
          onLeftAction={()=>navigation.goBack()}
          
        /> 

        <View style={{marginHorizontal:20,marginTop:'30%',height:200,justifyContent:'space-around'}}>
            <OTPInput
              onComplete={(code)=>{
                setVerifyCode(code);
               
            }}
            />

            <FloatingLabelInputField
            hideLabel
            placeholder={strings("ForgotPassword2.passwordPlaceholder")}
            password={true}
            value={newPass}
            onChangeText={(text)=>setNewPass(text)}
            />

        </View>

        <AppButton
             buttonText={strings("ForgotPassword2.changeButton")}
             TextStyle={{ letterSpacing: 1, color: Assets.colors.WHITE }}
             styles={{ marginTop:'30%',backgroundColor: Assets.colors.appBg, margin: 0, height: 50, width: '80%', borderRadius: 10, alignSelf: "center" }}
           
             onPressButton={()=>onChangePassPress()}
         />
           <Loader loading={loading} isShowIndicator={true} />
           </KeyboardAwareScrollView>
          
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    }
})
