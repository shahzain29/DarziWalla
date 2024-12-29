import React from 'react'
import { StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native'
import  {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scrollview'
import Header from '../../../components/Header';
import Assets from '../../../assets/index'
import {strings} from '../../../Translations/i18n'

const index = ({navigation}) => {

    const notiData=[{message:'Your Suit is Ready'},
    {message:'Your Suit is Ready'},
    {message:'Your Suit is Ready'},
    {message:'Your Suit is Ready'},]
    return (
        <View style={styles.mainContainer}>
            <KeyboardAwareScrollView>
            <Header
          leftIcon={Assets.images.back}
          
          leftButtonIconStyle={{tintColor: Assets.colors.WHITE}}
          onLeftAction={() => navigation.goBack()}
          containerStyle={{backgroundColor: Assets.colors.appBg}}
          hearderText={strings("Notifications.title")}
          hearderTextStyle={{color: Assets.colors.WHITE}}
        />
            
           
               {/* <FlatList
               data={notiData}
               renderItem={({item})=>(
                   <TouchableOpacity>
                   <View style={{alignSelf:'center',marginVertical:20,backgroundColor:assets.colors.WHITE,width:'90%',height:70,alignItems:'center',justifyContent:'center',elevation:6,borderRadius:20,borderColor:Assets.colors.appBg,borderWidth:1}}>
                    <Text>{item.message}</Text>    
                   </View>
                   </TouchableOpacity>
               )}
               
               /> */}
           
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
