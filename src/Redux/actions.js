
    import {SET_TOKEN} from '../Redux/types'
    import {SET_LANGUAGE} from '../Redux/types'
    import {SET_USERDATA} from './types'


    export const setToken = (userToken) =>({

        type:SET_TOKEN,
        payload:userToken
    })

    export const setLanguage = (language) =>({

        type:SET_LANGUAGE,
        payload:language
    })

    export const setUserData = (userData) =>({
        type:SET_USERDATA,
        payload:userData
    })