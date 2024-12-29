import {combineReducers} from 'redux'


import tokenReducer from './reducer'


    export default combineReducers(
        {

        authToken:tokenReducer,

    }
    ) 