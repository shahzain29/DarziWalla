import React,{useState,useEffect} from 'react';
import {View, Image, StyleSheet, Text, StatusBar, TouchableOpacity,FlatList,ScrollView} from 'react-native';
import Assets from "../../../assets/index"
import { StackActions } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import AppButton from '../../../components/AppButton';
import Header from '../../../components/Header';
import assets from '../../../assets/index';
import { DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getOrdersAPI} from '../../../API/Methods/methods'
import Loader from '../../../components/Loader'
import {strings,ChangeLanguage} from '../../../Translations/i18n'
import { useIsFocused } from '@react-navigation/native';
import {useSelector} from 'react-redux'



const  Home = ({navigation})=> {


    const isFocused=useIsFocused()

    const [myOrders,setMyOrders] = useState('')
    const [loading,setLoading] = useState(false)
    const [userId,setUserId] = useState(useSelector(state=>state.authToken.userData.id))


    useEffect(()=>{
        if(isFocused){
        onGetOrdersAPI()
        }
    },[isFocused])

    useEffect(()=>{
        // console.log('orderDETAIL==========>>>>>>>',myOrders[0].datail[0])
    },[myOrders])

    const onGetOrdersAPI = async () =>{
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('user_id',userId)

            const response  = await getOrdersAPI(formData) 

            console.log('getOrdersAPI_RESPONSE===>>>',response.data.data[0].datail)
 
            if(response.data.code==200){

                setMyOrders(response.data.data)

                
                
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert(error)
            console.log('getOrdersAPI_ERROR==>>',error)
        }
    }

    const checkStatus = (item)=>{
        if(item=="completed"){
            return Assets.colors.LightGreen
        }

        else if (item=="in-progress"){
            return 'red'
        }

        else{
            return Assets.colors.BLACK
        }
    }

    const optionsPerPage = [2, 3, 4];

    const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    
    React.useEffect(() => {
        setPage(0);
      }, [itemsPerPage]);
    

      const orderComponent =(item) =>{
          return(
            <View style={{ borderWidth: 1, height: 100, borderRadius: 10, padding: 20, marginVertical: 10,justifyContent:'center' }}>
               
            <View style={{ flexDirection: "row", justifyContent: "space-between",}}>
            <TouchableOpacity style={{width: '45%'}} onPress={()=>navigation.navigate('OrderDetails',{'orderDetails':item})}>
                <View >
                <Text style={{ fontWeight: "bold", }}>{item.datail[0] ? item.datail[0].categoryName:''}</Text>
                    <Text style={{ fontWeight: "bold", }}>{item.CustomerName}</Text>
                    <Text style={{ fontWeight: "bold", }}>Rs.{item.total_price}</Text>
                    <Text>{item.created_at.substr(0,10)}</Text>
                </View>
                </TouchableOpacity>
                <View style={{width: '45%',justifyContent: "center"}}>
              

                <View
                style={{ alignItems:'center',justifyContent:'center',backgroundColor: item.status=='pending'? '#000000': item.status=='in-progress'? 'red':'limegreen' , height: 40, width: '100%', borderRadius: 10, alignSelf: "center",}}
                >

                    <Text style={{letterSpacing: 1, color: Assets.colors.WHITE }}>{item.status}</Text>
                </View>

                
                </View>
               
            </View>
            
        </View>
          )
      }

    
        return (
            <View style={style.mainContainer}>
                <KeyboardAwareScrollView>
                <Header
          leftIcon={Assets.images.menu}
          rightIcon={Assets.images.bell_icon}
          leftButtonIconStyle={{tintColor: Assets.colors.WHITE}}
          onLeftAction={() => navigation.openDrawer()}
          onRightAction = {()=>navigation.navigate("Notifications")}
          containerStyle={{backgroundColor: Assets.colors.appBg}}
          hearderText={strings("Home.title")}
          hearderTextStyle={{color: Assets.colors.WHITE}}
        />

        <View style={{marginHorizontal:10}}>
            <Text style={{marginTop:20,fontSize:20,fontWeight:'bold',alignSelf:'center'}}>{strings("Home.header1")}</Text>


            <View style={{alignSelf:'center',borderWidth:1,borderColor:Assets.colors.appBg,width:'90%',marginTop:20}}></View>

            <SafeAreaView style={{marginTop:20,paddingBottom:15}}>
            <FlatList
            data={myOrders}
            

            renderItem={({item})=>orderComponent(item)}
            />
            </SafeAreaView>
          
         
           </View>

          
    </KeyboardAwareScrollView>
    <Loader loading={loading} isShowIndicator={true} />
            </View>
        );
    }

export default Home;
const style = StyleSheet.create({ 
    mainContainer: {
        flex: 1,
        // marginHorizontal: 20
        
    },
    header:{
        fontSize:16,
    },

    tableItem:{
       borderLeftWidth:1,
       borderRightWidth:1,
       borderColor:Assets.colors.appBg,
       width:20,
       alignItems:'center',
       justifyContent:'center',
    },

    headerTextStyle:{
        fontWeight:'bold',
        color:'black'
    },

});
