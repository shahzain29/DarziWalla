import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput, Image, Text, StyleSheet } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Assets from '../assets';

export default class EditText extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View
                style={[styles.featureBgStyle1,this.props.style]}>




                <TextInput
                    keyboardType={this.props.keyboardType}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={Assets.colors.textPlaceholderColor}
                    secureTextEntry={this.props.secureTextEntry}
                    onChangeText={this.props.onChangeText}
                    maxLength={this.props.maxLength}
                    numberOfLines={this.props.numberOfLines}
                    multiline={this.props.multiline}
                    value={this.props.value}
                    // maxLength={this.props.maxLength}
                    style={[styles.featureTextValueStyle,this.props.styleInput]}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    featureIconStyle: {resizeMode: 'contain', width: 17, height: 17, margin: 5,marginStart:10,marginEnd:15},

    featureRowStyle: {flexDirection: 'row', width: '100%'},

    featureBgStyle1: {
        // flexDirection: 'row',
        width: '90%',
        // alignItems: 'center',
        backgroundColor: Assets.colors.rowBg,
        margin: 5, borderRadius:5,
        padding:7,
        elevation:3,
        marginTop: 10
    },
    featureBgStyle2: {
        flexDirection: 'column', width: '45%', alignItems: 'center',
        // backgroundColor: Assets.colors.featureBg2,
        margin: 5,borderWidth:0.2, borderRadius:10,
    },
    featureTextLabelStyle: {
        color: Assets.colors.black,
        fontSize: 11,
        fontWeight: 'bold',
        width: '40%',
        marginStart: 15
    },
    featureTextValueStyle: {
        color: Assets.colors.textPlaceholderColor,
        // color: '#464646',
        fontSize: Platform.OS === 'ios' ? 10:12,
        // width: '100%',
        fontWeight: "800",
        paddingStart:Platform.OS === 'ios' ? 5:2,
        paddingTop:Platform.OS === 'ios' ? 4:-3,
        paddingBottom:Platform.OS === 'ios' ? 4:-3,
        margin: Platform.OS === 'ios' ? 10:3,

    },
})


