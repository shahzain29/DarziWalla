
import React ,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackActions } from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import {setToken} from '../../../Redux/actions'

const index = ({navigation}) => {
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(setToken(''))
    navigation.dispatch(StackActions.replace('AuthStack'))
    },[])

    return (
        <View>
            
        </View>
    )
}

export default index

const styles = StyleSheet.create({})
