

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    FlatList
} from 'react-native';
import Preference from 'react-native-preference';
import { StackActions } from "@react-navigation/native";
import Assets from '../assets';


export default class CustomDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            DrawerList: [
                {
                    name: 'Home',
                    path: 'Home',
                    id: 0,
                    image: Assets.icons.home
                },
                {
                    name: 'My Song Profiles',
                    path: 'Home',
                    id: 0,
                    image: Assets.icons.song_profile
                },
                {
                    name: 'My purchased Songs',
                    path: 'Home',
                    id: 0,
                    image: Assets.icons.purchased_song
                },
                {
                    name: 'Playlist',
                    path: 'Albums',
                    id: 0,
                    image: Assets.icons.playlist
                },
                {
                    name: 'Profile',
                    path: 'Profile',
                    id: 0,
                    image: Assets.icons.profile_icon
                },
                {
                    name: 'Change Password',
                    path: 'Home',
                    id: 0,
                    image: Assets.icons.change_password
                },
                {
                    name: 'Messages',
                    path: 'AddSong',
                    id: 0,
                    image: Assets.icons.messages
                },
                {
                    name: 'Earnings',
                    path: 'Earnings',
                    id: 0,
                    image: Assets.icons.earning
                },
                {
                    name: 'Logout',
                    path: 'LogOut',
                    id: 1,
                    image: Assets.icons.logout
                }
            ]
        }
    }

    logOut = () =>{

        Preference.clear();
        this.props.navigation.dispatch(StackActions.replace('AuthStack'));
    }

    renderItem = (item) => {
        return(
            <TouchableOpacity style={style.renderView} onPress={() => item.path == 'LogOut' ? this.logOut() : this.props.navigation.navigate(item.path)}>
                  <Image style={{width: 20,height: 20,alignSelf: 'center'}} source={item.image ? item.image : ''} />
                <Text style={{color: '#fff',alignSelf: 'center',paddingLeft: 30}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={style.MainContainer}>
                <View style={{height: '25%',justifyContent: "center"}}>
                    <View style={{flexDirection: "row",marginHorizontal: 10}}>
                        <Image style={{width: 100,height: 100,borderRadius: 50}} source={Assets.icons.profile} />
                        <View style={{justifyContent: "center",marginLeft: 10}}>
                        <Text style={{color: '#fff'}}>JOHN DOE</Text>
                        <Text style={{color: '#fff',marginTop: 5}}>ROK, POP, RAP</Text>
                        <View style={{flexDirection: "row",marginTop: 5,}}>
                            <Image style={{width: 10,height: 20,resizeMode: 'contain'}} source={Assets.icons.location_pin} />
                            <Text style={{color: '#fff',paddingLeft: 10}}>NEW YORK</Text>
                        </View>
                      
                        </View>
                      
                    </View>
                </View>
                <View style={style.FlatListView}>
                    <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={this.state.DrawerList}
                    keyExtractor={this.state.DrawerList.id}
                    renderItem={({item}) => this.renderItem(item)}
                    />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#1C1C1C'
    },
    FlatListView: {
        height: '65%',
        margin: 20
    },
    renderView: {
        flexDirection: 'row',
        marginVertical: 10,
        height: 50,
        // justifyContent: 'center'
    }
})