import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Header from '../../../components/Header'
import Assets from '../../../assets/index'
import FloatingLabelInputField from '../../../components/FloatingLabelInputField'
import AppButton from '../../../components/AppButton'
import {CheckUserAPI} from '../../../API/Methods/methods'
import Loader from '../../../components/Loader'
import {strings} from '../../../Translations/i18n'
import  Toast  from 'react-native-simple-toast'

const index = ({navigation}) => {

    const [code,setCode] = useState('+92')
    const [num,setNum] = useState('')
    // const [phNum,setPhNum] = useState('')

    const [loading,setLoading] = useState(false)


    const checkFields= () =>{
        if(num==''){
            Toast.show("Enter Phone number")
        }

        else{
            onCheckUserPress()
        }
    }

    const onCheckUserPress =async () =>{
        const phNum = code+num

        setLoading(true)
        try {
            const formData = new FormData()

            formData.append('phone_number',phNum.toString())

            const response = await CheckUserAPI(formData)

            console.log('CheckUserAPI_RESPONSE===>>>',response.data.code)

            if(response.data.code==200){
                navigation.navigate('SetPassword',{'phNum':phNum})
            }

            else{
                navigation.navigate('SignUp',{'phNum':phNum})
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert(error)
            console.log('CheckUserAPI_ERROR===>>>',error)
            
        }
    }

    return (
        <View style={styles.mainContainer}>
            <KeyboardAwareScrollView>
            <Header
          leftIcon={Assets.images.back}
          leftButtonIconStyle={{tintColor: Assets.colors.WHITE}}
          onLeftAction={() => navigation.goBack()}
          containerStyle={{backgroundColor: Assets.colors.appBg}}
          hearderText={strings("CheckUser.title")}
          hearderTextStyle={{color: Assets.colors.WHITE}}
        />

        <View style={{marginHorizontal:20,marginTop:'20%'}}>
        <View style={{ flexDirection: "row", justifyContent: "space-around", marginHorizontal: 10 }}>
                        <FloatingLabelInputField
                            hideLabel
                            // placeholder={'+92'}
                            editable={false} 
                            maxlength={3}
                            value={code}
                            inputStyle={{alignSelf:'center'}}
                            inputContainer={{ justifyContent:'center',width: "25%", alignSelf: 'center', borderRadius: 10, marginVertical: 20, marginTop: 0, backgroundColor: 'transparent', borderWidth: 1 }}
                        />
                        <FloatingLabelInputField
                            hideLabel
                            placeholder={'12345678'}
                            maxlength={10}
                            value={num}
                            onChangeText={(text) => setNum(text)}
                            inputContainer={{ width: "70%", alignSelf: 'center', borderRadius: 10, marginVertical: 20, marginTop: 0, backgroundColor: 'transparent', borderWidth: 1 }}
                           
                        />
                    </View>


                    <AppButton
                    buttonText={strings("CheckUser.checkBtn")}

                    styles={{backgroundColor:Assets.colors.appBg,width:'80%',height:50,borderRadius:15,alignSelf:'center'}}
                    onPressButton={()=>checkFields()}
                    />
        </View>

            <Loader loading={loading} isShowIndicator={true} />
            </KeyboardAwareScrollView>
        </View>
    )
}

export default index

const styles = StyleSheet.create({})
