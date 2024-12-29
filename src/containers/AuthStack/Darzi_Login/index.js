import React,{useState,useEffect} from 'react';
import { View, Image, StyleSheet, Text, StatusBar,TouchableOpacity,Linking } from 'react-native';
import Assets from "../../../assets/index"
import { StackActions } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import AppButton from '../../../components/AppButton';
import FloatingLabelInputField from '../../../components/FloatingLabelInputField';
import FbButton from '../../../components/FbButton';
import {useDispatch,useSelector} from 'react-redux'
import {setToken,setUserData} from '../../../Redux/actions'
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader'
import {LoginAPI} from '../../../API/Methods/methods'
import {ChangeLanguage, strings} from '../../../Translations/i18n'


const Login = ({navigation})=> {

    const dispatch=useDispatch()

    const [num,setNum] = useState('')
    const [code,setCode] = useState('+92')
    const [password,setPassword] = useState('')
    const [loader,setLoader] = useState(false)

    const Tok=useSelector(state=> state.authToken.userToken)

    useEffect(()=>{
        // console.log('TOKEN=====>>',Tok)
      
    },[Tok])

  
    const checkFields = () =>{
        if(num==''){
            Toast.show("Enter Phone Number")
        }
        else if(password==''){
            Toast.show('Enter Password')
        }
        else{
            onLoginPress()
        }
    }

       
    const onLoginPress = async () =>{
        const ph_num=code+num
        
       try {
           setLoader(true)
        const formData = new FormData()
        formData.append('phone_number',ph_num)
        formData.append('password',password)

        const response = await LoginAPI(formData)

        console.log('LoginAPI_Response=>>>',response.data.code)

        if(response.data.code==200){
            
            if(response.data.data.user.role_id==3){
           
            dispatch(setToken(response.data.data.token))
            dispatch(setUserData(response.data.data.user))
           
        navigation.dispatch(StackActions.replace('HomeStack'))
            }

            else{
                alert("This is a Darzi account")
            }
         
        }
      

        if(response.data.code==422){
            Toast.show('Incorrect Phone Number / Password') 
        }
        if(response.data.code==404){
            Toast.show('User Not found')
        }
        setLoader(false)
       } catch (error) { 
           setLoader(false)
           alert(error)
           console.log('LoginAPI_ERROR=>>',error)
       } 

    
    }

        return (
            <View style={style.mainContainer}>
                <KeyboardAwareScrollView 
                
                >
                    <View style={{ height: 100, justifyContent: "center", marginVertical: 20, }}>
                        <Text style={{ textAlign: "center", lineHeight: 30, fontSize: 16 }}>{strings("Login.header1")}{'\n'}<Text style={{ fontWeight: 'bold', fontSize: 20 }}>{strings("Login.header2")}</Text></Text>
                    </View>
                   
                    <Text style={{ textAlign: "center", marginHorizontal: 10, marginVertical: 20,marginTop:'20%' }}>{strings("Login.subHeader")}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginHorizontal: 10 }}>
                        <FloatingLabelInputField
                            hideLabel
                            // placeholder={'+92'}
                            editable={false}
                            maxlength={3}
                            value={code}
                            
                            inputContainer={{ width: "20%", alignSelf: 'center', borderRadius: 10, marginVertical: 20, marginTop: 0, backgroundColor: 'transparent', borderWidth: 1 }}
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
                    <FloatingLabelInputField
                            hideLabel
                            placeholder={strings("Login.passwordPlaceholder")}
                            password={true}
                            maxlength={12}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            inputContainer={{ width: "90%", alignSelf: 'center', borderRadius: 10, marginVertical: 20, marginTop: 0, backgroundColor: 'transparent', borderWidth: 1 }}
                        />
                    <AppButton
                        buttonText={strings("Login.loginButton")}
                        TextStyle={{ letterSpacing: 1, color: Assets.colors.WHITE }}
                        styles={{ marginTop:'10%',backgroundColor: Assets.colors.appBg, margin: 0, height: 50, width: '90%', borderRadius: 10, alignSelf: "center" }}
                        // onPressButton={() => navigation.dispatch(StackActions.replace('HomeStack'))}
                        onPressButton={()=>checkFields()}
                    />
                   

                    <AppButton
                        buttonText={strings("Login.registerButton")}
                        TextStyle={{ letterSpacing: 1, color: Assets.colors.WHITE }}
                        styles={{ marginTop:'10%',backgroundColor: Assets.colors.appBg, height: 50, width: '90%', borderRadius: 10, alignSelf: "center" }}
                    onPressButton={() => navigation.navigate('CheckUser')}
                    />

                   

                  
                    <TouchableOpacity style={{alignSelf:'center',top:10}}
                    onPress={()=>navigation.navigate('ForgotPassword')}>
                        <Text style={{color:Assets.colors.appBg,fontSize:15,fontWeight:'bold'}}>{strings("Login.forgotPasswordButton")}?</Text>
                    </TouchableOpacity>
                  
                    <View>
                        <TouchableOpacity onPress={()=>navigation.navigate("ContactUs")}>
                    <Text style={{ textAlign: 'center', marginTop: 30 }}>{strings("Login.footer1")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> Linking.openURL('https://derziwalla.com/privacyPolicy')}>
                     <Text style={{ textAlign: 'center', marginTop: 10 }}>{strings("Login.footer2")}</Text>
                    </TouchableOpacity>

                    </View>
                </KeyboardAwareScrollView>
                <Loader loading={loader} isShowIndicator={true} />
            </View>
        );
    }

    export default Login;

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Assets.colors.WHITE,
        // backgroundColor:'red'
        
    },

});
