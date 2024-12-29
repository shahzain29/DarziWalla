import React, { Component,useEffect,useState} from 'react';
import { View, Image, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import Assets from "../../../assets/index"
import { StackActions } from "@react-navigation/native";
import Header from '../../../components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Modal from 'react-native-modal';
import * as ImagePicker from 'react-native-image-picker';
import AppButton from '../../../components/AppButton';
import FloatingLabelInputField from '../../../components/FloatingLabelInputField';
import {userProfileAPI,logoutAPI,setProfileImageAPI} from '../../../API/Methods/methods'
import Loader from '../../../components/Loader'
import {useDispatch} from 'react-redux'
import {setToken} from '../../../Redux/actions'
import { useIsFocused } from '@react-navigation/native';
import {strings} from '../../../Translations/i18n'


const Profile=({navigation})=> {
    const isFocused = useIsFocused()
    const dispatch = useDispatch()  

   useEffect(()=>{

    if(isFocused){
    getUserProfile()
    }
   },[isFocused])

    const [showOptionModal,setShowOptionModal] = useState(false)

    const [profile_avatar,setProfile_avatar] = useState(Assets.images.david)

    const [profileData,setProfileData] = useState('')
    const [userName,setUserName] =useState('')
    const [loading,setLoading] = useState(false)
    const [fileName,setFileName] = useState('')
    const [fileType,setFileType] = useState('')
    const [fileUri,setFileUri] = useState('')
   

    const getUserProfile = async () =>{
        try {
            setLoading(true)
            const response = await userProfileAPI()
            console.log('userProfileAPI===>>',response.data.code)
            setProfileData(response.data.data)
            setUserName(response.data.data.name)

            if(response.data.data.image!=null){
            setProfile_avatar({uri:('https://wordpress.appcrates.co/tailor/public/images/'+response.data.data.image)})
            }
            else{
                setProfile_avatar(Assets.images.david)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert(error)
            console.log('userProfileAPI===>>',error)
        } 
    }

    const setUserImage = async() =>{
        try {
            setLoading(true)
            const formData = new FormData()

            formData.append("image",{uri:fileUri,name:fileName,type:fileType});

            const response = await setProfileImageAPI(formData)

            console.log('Upload Image__RESPONSE==>>',response.data)
            setLoading(false)


        } catch (error) {
            setLoading(false)
            alert(error)

            console.log("Upload_ImageERROR==>>",error)
            
        }
    }

   
    const borderRadius=13

    const onChooseFromLibraryPress = ()=>{
    let options = {
        // title: 'Select Image',
        // customButtons: [
        //   {
        //     name: 'customOptionKey',
        //     title: 'Choose Photo from Custom Option'
        //   },
        // ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchImageLibrary(options, response => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          let source = {uri: response.assets[0].uri};
          // let source = {
          //   uri: 'data:image/jpg;base64,' + response.data
          // };
        //   setShowText(false);
        //   setFilePath(source);
        //   setShowImg(true);  
          setFileName(response.assets[0].fileName);
          setFileType(response.assets[0].type);
          setFileUri(response.assets[0].uri)
        setProfile_avatar(source);  
         setTimeout(()=>setUserImage(),1000)   
        
        
        console.log("Image===>>",response.assets[0].uri)
        }
      });
    }

    const modalButtonPress = ()=>{
        setShowOptionModal(false)

        setTimeout(()=> onChooseFromLibraryPress(),1000)
       

    }


        return (
            <View style={style.mainContainer}>
                <Header
                    containerStyle={{ backgroundColor: Assets.colors.appBg }}
                    leftIcon={Assets.images.menu}
                    onLeftAction={() => navigation.openDrawer()}
                    leftButtonIconStyle={{ tintColor: Assets.colors.WHITE }} 
                    hearderText={strings("Profile.title")}
                    hearderTextStyle={{ color: Assets.colors.WHITE }}
                    // rightIcon={Assets.images.logout}
                    // onRightAction={()=>onLogoutPress()}
                    rightButtonIconStyle={{ tintColor: Assets.colors.WHITE }}
                />
                <KeyboardAwareScrollView showVerticalScrollIndicator={false} style={{}}>
                    <View style={{ height: 170,width:140,alignSelf:'center', justifyContent: "center",marginTop:30 }}>
                        <Image style={{ width: 120, height: 120,marginTop:30, alignSelf: 'center',borderRadius:60 }} source={profile_avatar}  resizeMode= "cover" />
                        <TouchableOpacity onPress={() => setShowOptionModal(true)} style={{ position: 'absolute', width: 30, height: 30, justifyContent: "center", backgroundColor: Assets.colors.appBg, borderRadius: 15, bottom: 70, alignSelf: "center", right: 120 }}>
                            <Image style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: "center", tintColor: '#fff' }} source={Assets.images.plus} />
                        </TouchableOpacity>
                        <Text style={{ textAlign: "center", fontWeight: "bold", marginVertical: 10 }}>{profileData?(profileData.name).toUpperCase():''}</Text>
                        </View>

                    <Text style={{ textAlign: "center", fontWeight: "bold", marginVertical: 5 }}>{profileData?(profileData.phone_number):''} </Text>
                    <Text style={{ textAlign: "center", fontWeight: "bold", marginVertical: 5 }}>{profileData?(profileData.address):''} </Text>
                    <Text style={{ textAlign: "center", fontWeight: "bold", marginVertical: 5 }}>{profileData?(profileData.city):''} </Text>
                      
                    

                

                        <AppButton
                        buttonText={strings("Profile.editBtn")}
                        TextStyle={{ letterSpacing: 1, color: Assets.colors.WHITE }}
                        styles={{ backgroundColor: Assets.colors.appBg, height: 40, width: '90%', borderRadius: 10, alignSelf: "center",marginTop:'20%' }}
                    onPressButton={() => navigation.navigate('EditProfile',{'profileDetails':profileData})}
                    />
                    
                   
                </KeyboardAwareScrollView>
                <Modal isVisible={showOptionModal}>
                    <View style={[style.modalStyle, { justifyContent: 'flex-end' }]}>
                        <View style={{ marginHorizontal: 20, marginBottom: 30 }}>
                            <View style={{ marginBottom: 15 }}>
                                <TouchableOpacity
                                    onPress={() => modalButtonPress()}
                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor: 'white',
                                        alignItems: 'center', justifyContent: 'center',
                                        borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius
                                    }}>
                                    <Text style={{ color: Assets.colors.appBg, padding: 14, fontSize: 20 }}>
                                        {'Choose from Library'}
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ height: 2, width: '100%' }} />
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowOptionModal( false , () => {
                                            setTimeout(() => {
                                                onTakePhotoPress()
                                            }, 1000)
                                        })
                                    }}
                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor: 'white',
                                        alignItems: 'center', justifyContent: 'center',
                                        borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius
                                    }}>
                                    <Text style={{ color: Assets.colors.appBg, padding: 14, fontSize: 20 }}>{'Take Photo'}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{ backgroundColor: 'white', borderRadius: borderRadius, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => {
                                    setShowOptionModal( false)
                                }}>
                                <Text style={{ color: Assets.colors.appBg, padding: 14, fontSize: 20 }}>{'Cancel'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Loader loading={loading} isShowIndicator={true} />
            </View>
        );
    }
export default Profile;
const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

});
