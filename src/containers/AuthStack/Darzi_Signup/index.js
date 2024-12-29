import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Assets from '../../../assets/index';
import FloatingLabelInputField from '../../../components/FloatingLabelInputField';
import AppButton from '../../../components/AppButton';
import { RegistrationAPI } from '../../../API/Methods/methods';
import Toast from 'react-native-simple-toast'
import Loader from '../../../components/Loader'
import {strings} from '../../../Translations/i18n'
import Header from '../../../components/Header'

const index = ({navigation,route}) => {


  const number = route.params.phNum
  useEffect(()=>{
    console.log(number)
  },[])

  const [name,setName] = useState('')
  const [city,setCity] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPass,setConfirmPass] = useState('')
  const [loading,setLoading] = useState(false)

  const onRegisterPress = async() =>{
    try {
      setLoading(true)
      const formData = new FormData()

      formData.append('name',name)
      formData.append('role_id','3')
      formData.append('phone_number',number)
      formData.append('city',city)
      formData.append('password',password)
      formData.append('password_confirm',confirmPass)
      formData.append('country','pakistan')

      const response = await RegistrationAPI(formData)

      console.log('registration_RESPONSE===>>>',response.data)

      if(response.data.code==200){
       
        Toast.show('User Created Successfully')

        navigation.navigate('VerificationCode',{'phNum':number})
      }
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      alert(error)
      console.log('registration_ERROR==>>>',error)
      
    }
  }


  return (
    <View style={styles.mainContainer}>
      <Header
          containerStyle={{backgroundColor: Assets.colors.WHITE}}
          hearderText={strings("Registration.header1")}
          hearderTextStyle={{color: Assets.colors.BLACK,fontSize:20}}
          leftIcon={Assets.images.back}
          leftButtonIconStyle={{tintColor:Assets.colors.BLACK}}
          onLeftAction={()=>navigation.goBack()}
          
        /> 

      <KeyboardAwareScrollView style={[styles.mainContainer]}>

        <View style={{marginHorizontal:20,marginTop:30}}>

        <View style={{width: '100%', marginTop: 50,justifyContent:'space-around',height:300}}>
          <FloatingLabelInputField
            hideLabel
            placeholder={strings("Registration.namePlaceholder")}
            inputContainer={{
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: 'transparent',
              borderWidth: 1,
            }}
            value={name}
            onChangeText={(text)=>setName(text)}
          />

          <FloatingLabelInputField
            hideLabel
            placeholder={strings("Registration.cityPlaceholder")}
            inputContainer={{
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: 'transparent',
              borderWidth: 1,
            }}
            value={city}
            onChangeText={(text)=>setCity(text)}
          />
          <FloatingLabelInputField
            hideLabel
            placeholder={strings("Registration.passwordPlaceholder")}
            password={true}
            inputContainer={{
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: 'transparent',
              borderWidth: 1,
            }}
            value={password}
            onChangeText={(text)=>setPassword(text)}
          />
          <FloatingLabelInputField
            hideLabel
            password={true}
            placeholder={strings("Registration.cPassPlaceholder")}
            inputContainer={{
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: 'transparent',
              borderWidth: 1,
            }}
            value={confirmPass}
            onChangeText={(text)=>setConfirmPass(text)}
          />
        </View>

        <AppButton
                        buttonText={strings("Registration.signUpButton")}
                        TextStyle={{ letterSpacing: 1, color: Assets.colors.WHITE }}
                        styles={{ marginTop:'35%',backgroundColor: Assets.colors.appBg, margin: 0, height: 50, width: '90%', borderRadius: 10, alignSelf: "center" }}
                        // onPressButton={() => this.props.navigation.dispatch(StackActions.replace('HomeStack'))}
                        onPressButton={()=>onRegisterPress()}
                    />


                    <Text style={{ textAlign: 'center', marginTop: 40 }}>{strings("Registration.footer1")}</Text>
                    <Text style={{ textAlign: 'center', marginTop: 10 }}>{strings("Registration.footer2")}</Text>
                   

                   <Loader loading={loading} isShowIndicator={true}/>

                   </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Assets.colors.WHITE,
    // padding: 16,
  },
});
