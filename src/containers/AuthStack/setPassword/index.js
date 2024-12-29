import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import FloatingLabelInputField from '../../../components/FloatingLabelInputField';
import AppButton from '../../../components/AppButton';
import Header from '../../../components/Header';
import Assets from '../../../assets';
import {setPasswordAPI} from '../../../API/Methods/methods';
import Loader from '../../../components/Loader';
import Toast from 'react-native-simple-toast'
import OTPInput from '../../../components/OTPInput';
import {strings} from '../../../Translations/i18n'

const index = ({navigation,route}) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifyCode,setVerifyCode] = useState('')

  const number = route.params.phNum;
//   console.log(number)

  const onSetPasswordPress = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('phone_number', number.toString())
      formData.append('password', password)
      formData.append('verification_code', verifyCode)
      formData.append('password_confirm', password)

      const response = await setPasswordAPI(formData)

      console.log('setPasswordAPI_response===>>', response.data.code);

      if (response.data.code == 200) {
        setLoading(false);
        Toast.show("User Created")
        navigation.navigate('VerificationCode',{'phNum':number});
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log('onSetPaswordAPI_ERROR==>>', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
       <Header
          leftIcon={Assets.images.back}
          leftButtonIconStyle={{tintColor: Assets.colors.WHITE}}
          onLeftAction={() => navigation.goBack()}
          containerStyle={{backgroundColor: Assets.colors.appBg}}
          hearderText={strings("SetPassword.title")}
          hearderTextStyle={{color: Assets.colors.WHITE}}
        />
      <KeyboardAwareScrollView>
       

        <View style={{marginHorizontal: 20, marginTop: '20%'}}>
          <FloatingLabelInputField
            hideLabel
            placeholder={'Password'}
            password={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

<View style={{marginHorizontal:20,marginTop:'0%',height:200,justifyContent:'space-around',width:'100%',alignSelf:'center'}}>
            <OTPInput
              onComplete={(code)=>{
                setVerifyCode(code);
               
            }}
            />
            </View>
        

          <AppButton
            buttonText={strings("SetPassword.setBtn")}
            styles={{
              backgroundColor: Assets.colors.appBg,
              width: '80%',
              height: 50,
              borderRadius: 15,
              alignSelf: 'center',
              marginTop: 20,
            }}
            onPressButton={() => onSetPasswordPress()}
          />
        </View>
        <Loader loading={loading} isShowIndicator={true} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer:{
    flex:1
  }
});
