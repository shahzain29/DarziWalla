import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../../components/Header';
import FloatingLabelInputField from '../../../components/FloatingLabelInputField';
import Assets from '../../../assets';
import AppButton from '../../../components/AppButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {contactUsAPI} from '../../../API/Methods/methods'
import Loader from '../../../components/Loader'
import Toast from 'react-native-simple-toast'

const index = ({navigation}) => {


    const[code,setCode] = useState('+92')
    const [num,setNum] = useState('')
    const [description,setDescription] = useState('')
    const [name,setName] = useState('')
    const [loading,setLoading] = useState(false)


    const checkFields = () =>{
        if(name==''){
            Toast.show('Enter Name')
        }
        else if(num==''){
            Toast.show('Enter Phone Number')
        }
        else if(num.length<10){
            Toast.show('Enter Valid Phone number')
        }

        else if(description==''){
            Toast.show('Enter Description')
        }
        else{
            onContactUsPress()
        }
    }

    const onContactUsPress= async () =>{
        try {
            setLoading(true)
            const phNum = code+num
            const formData = new FormData()

            formData.append('name',name)
            formData.append('phone_number',phNum)
            formData.append('description',description)

            const response = await contactUsAPI(formData)

            console.log('ContactUs_RESPONSE===>>',response.data.code)

            if(response.data.code==200){
                Toast.show("Message Sent")
                navigation.navigate('Login')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert(error)
            console.log('ContactUs_ERROR==>>>',error)
        }
    }

  return (
    <View style={styles.mainContainer}>
      <Header
        leftIcon={Assets.images.back}
        leftButtonIconStyle={{tintColor: Assets.colors.WHITE}}
        onLeftAction={() => navigation.goBack()}
        containerStyle={{backgroundColor: Assets.colors.appBg}}
        hearderText={'Contact Us'}
        hearderTextStyle={{color: Assets.colors.WHITE}}
      />
      <KeyboardAwareScrollView>
        <View style={{marginHorizontal: 20,marginTop:'10%',height:500,justifyContent:'space-around'}}>
          <FloatingLabelInputField
           hideLabel
           placeholder={'Name'}
           value={name}
           onChangeText={(text) => setName(text)}
            />

          
          <View style={{ flexDirection: "row", justifyContent: "space-evenly" ,top:10}}>
                        <FloatingLabelInputField
                            hideLabel
                            // placeholder={'+92'}
                            editable={false}
                            maxlength={3}
                            value={code}
                            
                            inputContainer={{ width: "21%", alignSelf: 'center', borderRadius: 10, marginVertical: 20, marginTop: 0, backgroundColor: 'transparent', borderWidth: 1 }}
                        />
                        <FloatingLabelInputField
                            hideLabel
                            placeholder={'12345678'}
                            maxlength={10}
                            value={num}
                            onChangeText={(text) => setNum(text)}
                            inputContainer={{ width: "75%", alignSelf: 'center', borderRadius: 10, marginVertical: 20, marginTop: 0, backgroundColor: 'transparent', borderWidth: 1 }}
                        />
                    </View>

          <FloatingLabelInputField 
          hideLabel
          placeholder={'Description...'} 
          multiline={true}
          inputContainer={{height:200,alignItems:'flex-start'}}
          value={description}
          onChangeText={(text)=>setDescription(text)}
       
          />

          <AppButton
          buttonText={'Submit'}
          styles={{backgroundColor:Assets.colors.appBg,height:50,borderRadius:10}}
          TextStyle={{letterSpacing:1}}
          onPressButton={()=>checkFields()}

          />
        </View>
      </KeyboardAwareScrollView>
      <Loader loading={loading} isShowIndicator={true}/>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
