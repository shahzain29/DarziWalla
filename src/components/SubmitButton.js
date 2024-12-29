import React, {Component} from 'react';
import {View, TouchableOpacity, TextInput, Image, Text, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Assets from '../assets';
import LinearGradient from 'react-native-linear-gradient';


export default class SubmitButton extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <TouchableOpacity
                style={[{
                    flexDirection: 'row',marginTop:5
                },this.props.style1]}
                onPress={this.props.onPress}>
                <LinearGradient
                    colors={ this.props.backGroundColor ? ['#ffffff', '#ffffff'] :  [Assets.colors.gradientColor1, Assets.colors.gradientColor2]}
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    style={[styles.featureBgStyle1, this.props.style]}
                >
                   {this.props.leftIcon && <Image style={{width: 20,height: 20}} source={ this.props.leftIconSource ? this.props.leftIconSource :  Assets.icons.home} />}

                    <Text
                        style={[styles.featureTextValueStyle,{color: this.props.backGroundColor ? ['#000000', '#000000'] : Assets.colors.textColor}]}>
                        {this.props.buttonText}
                    </Text>

                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    featureIconStyle: {resizeMode: 'contain', width: 17, height: 17, margin: 5, marginStart: 10, marginEnd: 15},

    featureRowStyle: {flexDirection: 'row', width: '100%'},

    featureBgStyle1: {
        flexDirection: 'row', width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: Assets.colors.rowBg,
        margin: 5, borderRadius: 5,
        padding: 5, elevation: 3
    },
    featureBgStyle2: {
        flexDirection: 'column', width: '45%', alignItems: 'center',
        // backgroundColor: Assets.colors.featureBg2,
        margin: 5, borderWidth: 0.2, borderRadius: 10,
    },
    featureTextLabelStyle: {
        color: Assets.colors.black,
        fontSize: 11,
        fontWeight: 'bold',
        width: '40%',
        marginStart: 15
    },
    featureTextValueStyle: {
        color: Assets.colors.textColor,
        // color: '#464646',
        fontSize: Platform.OS === 'ios' ? 12 : 14,
        // width: '100%',
        fontWeight: "800",
        paddingStart: Platform.OS === 'ios' ? 5 : 2,
        paddingTop: Platform.OS === 'ios' ? 4 : -7,
        paddingBottom: Platform.OS === 'ios' ? 4 : -7,
        margin: Platform.OS === 'ios' ? 5 : 8,

    },
})


