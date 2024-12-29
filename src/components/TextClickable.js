import React, {Component} from 'react';
import {View, TouchableOpacity, TextInput, Image, Text, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Assets from '../assets';
import LinearGradient from 'react-native-linear-gradient';


export default class TextClickable extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row', margin:5
                }}
                onPress={this.props.onPress}>



                    <Text
                        style={styles.featureTextValueStyle}>
                        {this.props.rowText}
                    </Text>

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


