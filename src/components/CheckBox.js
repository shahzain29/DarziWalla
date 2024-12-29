import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Assets from '../assets'
 
const CheckBox = (props) => {

    const [bgColor,setBgColor] = useState(false)
    

    const colorChange = () =>{
        setBgColor(!bgColor)
    }

    const onValChange = () =>{

    }

    useEffect(()=>{
        if(props.checked){
            setBgColor(Assets.colors.appBg)
        }
        else{
            
            setBgColor('#FFF')
        }
    },[props.checked])
    

    return (
        <View>
           <TouchableOpacity style={[{height:20,width:20,borderRadius:10,backgroundColor:bgColor,borderColor:'black',borderWidth:1},props.style]}
           onPress={props.onPress}
           >

           </TouchableOpacity>
        </View>
    )
}

export default CheckBox

const styles = StyleSheet.create({})
