import * as types from './types'


const INITIAL_STATE = {
    userToken:'',
    language:false,
    userData:''
    
  }


  export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        
        case types.SET_TOKEN:
            return {
              ...state,
              userToken: action.payload,
            }

            case types.SET_LANGUAGE:
              return {
                ...state,
                language: action.payload,
              }

              case types.SET_USERDATA:
                return {
                  ...state,
                  userData:action.payload,
                }
  
      default:
        return state
    }
  }