import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../../components/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Assets from '../../../assets/index'
import FloatingLabelInputField from '../../../components/FloatingLabelInputField'
import AppButton from '../../../components/AppButton'
import {forgotPasswordAPI} from '../../../API/Methods/methods'
import Loader from '../../../components/Loader'
import Toast from 'react-native-simple-toast'
import {strings} from '../../../Translations/i18n'

const index = ({navigation}) => {

    const [code,setCode] = useState('+92')
    const [num,setNum] = useState('')
    const [phNum,setPhNum] = useState('')
    const [loading,setLoading] = useState(false)

    const onForgotPasswordPress =  async() => {
        const concatNum= code+num
        console.log(concatNum)
        // setPhNum(concatNum.toString())
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('phone_number',concatNum)

            const response = await forgotPasswordAPI(formData)
            console.log('forgotPasswordAPI_Response==>>',response.data)    

            if(response.data.code==200){
                navigation.navigate('ResetPassword',{'phNumber':concatNum})
            }
            else if(response.data.code==404){
                Toast.show('User Does Not Exist')
                setNum('')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('forgotPasswordAPI_Error==>>>',error)
            
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Header
          containerStyle={{backgroundColor: Assets.colors.appBg}}
          hearderText={strings("ForgotPassword1.title")}
          hearderTextStyle={{color: Assets.colors.WHITE}}
          leftIcon={Assets.images.back}
          onLeftAction={()=>navigation.goBack()}
          
        /> 
            <KeyboardAwareScrollView>
            <View style={{width:'100%',justifyContent:'space-around',flexDirection:'row',marginTop:'30%'}}>
            
                <FloatingLabelInputField
                hideLabel
                inputContainer={{width:'20%',backgroundColor: 'transparent'}}
                value={code}
                />
                <FloatingLabelInputField
                hideLabel
                 inputContainer={{width:'70%'}}
                placeholder={'1234567890'}
                value={num}
                onChangeText={(text)=>setNum(text)}
                />
            </View>

            
             <AppButton
             buttonText={strings("ForgotPassword1.proceedButton")}
             TextStyle={{ letterSpacing: 1, color: Assets.colors.WHITE }}
             styles={{ marginTop:'30%',backgroundColor: Assets.colors.appBg, margin: 0, height: 50, width: '80%', borderRadius: 10, alignSelf: "center" }}
           
             onPressButton={()=>onForgotPasswordPress()}
         />
             <Loader loading={loading} isShowIndicator={true} /> 
            </KeyboardAwareScrollView>
           
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
    }
})
