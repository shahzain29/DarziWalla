import React,{useState} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Assets from '../../../assets/index';
import FloatingLabelInputField from '../../../components/FloatingLabelInputField';
import AppButton from '../../../components/AppButton';
import Header from '../../../components/Header';
import Toast from 'react-native-simple-toast';
import { editProfileAPi } from '../../../API/Methods/methods'
import Loader from '../../../components/Loader'


const data = [
  {selectionName: 'Name', value: 'name'},
  {selectionName: 'Password', value: 'password'},
  {selectionName: 'Shop Address', value: 'shop_address'},
  {selectionName: 'Shop Details', value: 'shop_detail'},
  {selectionName: 'City', value: 'city'},
];

const index = ({navigation, route}) => {

    const profileDetails = route.params.profileDetails 
    console.log(profileDetails)

    const [name,setName] = useState(profileDetails.name)
    const [city,setCity] = useState(profileDetails.city)

    const [loading,setLoading] = useState(false)

    const onEditProfilePress= async()=>{
        try {
          setLoading(true)
            const formData = new FormData()
            formData.append('name',name)
            formData.append('password','12345678')
            // formData.append('shop_detail',shopDetails)
            // formData.append('shop_address',shopAddress)
            formData.append('city',city)
            formData.append('country','pak')

            const response = await editProfileAPi(formData)

            console.log('onEditProfilePress_RESPONSE==>>',response.data)

            if(response.data.code==200){
                Toast.show('Profile Updated')
                navigation.navigate('Home')
            }
            setLoading(true)
        } catch (error) {
          setLoading(false)
            alert(error)
            console.log('onEditProfilePress_ERROR==>>>',error)
        }
    }
  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView>
        <Header
          containerStyle={{backgroundColor: Assets.colors.appBg}}
          leftIcon={Assets.images.back}
          onLeftAction={() => navigation.goBack()}
          leftButtonIconStyle={{tintColor: Assets.colors.WHITE}}
          hearderText={'Edit Profile'}
          hearderTextStyle={{color: Assets.colors.WHITE}}
        />

        <View style={{marginHorizontal:20,marginTop:40,height:300,justifyContent:'space-around'}}>
         <FloatingLabelInputField
         hideLabel
         placeholder={'Name'}
         value={name}
         onChangeText={(text)=>setName(text)}
         />
          
          <FloatingLabelInputField
         hideLabel
         placeholder={'City'}
         value={city}
         onChangeText={(text)=>setCity(text)}
         />

         <AppButton
         buttonText={'Save'}
         TextStyles={{colod:Assets.colors.WHITE}}
         styles={{ backgroundColor: Assets.colors.appBg, height: 40, width: '90%', borderRadius: 10, alignSelf: "center",marginTop:'5%' }}
         onPressButton={()=>onEditProfilePress()}
         />
        </View>

        <Loader loading={loading} isShowIndicator={true}/>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
