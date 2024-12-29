import { DrawerContentScrollView } from '@react-navigation/drawer';
import axios from 'axios';
import {store} from '../Redux/store'

const ROOT_URL ='https://wordpress.appcrates.co/tailor'
const BASE_URL = `${ROOT_URL}/api`;



const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-dat',
  },
});

client.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    const Token = store.getState().authToken.userToken
    
    requestConfig.headers = {
      'Authorization': "Bearer " + (Token),
    };
    // console.log('userTokenAxios=>>',Token)
    return requestConfig;
  },
  (err) => { 
    return Promise.reject(err);
  },
);

export {
  client, 
};
