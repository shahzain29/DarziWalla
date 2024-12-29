import {postRequest} from '../index'
import {getRequest} from '../index'


export const LoginAPI = (payload) =>postRequest('/login',payload)
export const CheckUserAPI = (payload) => postRequest('/check-user',payload)
export const ResetPasswordAPI = (payload) =>postRequest('/resetPassword',payload)
export const RegistrationAPI = (payload) => postRequest('/register',payload)
export const setPasswordAPI = payload => postRequest('/resetPassword',payload)
export const verifyCodeAPI = payload => postRequest('/verifyCode',payload)
export const getOrdersAPI = payload => postRequest('/getCustomerOrders',payload)
export const userProfileAPI = () => getRequest('/userProfile')
export const forgotPasswordAPI = payload => postRequest('/forgotPassword',payload)
export const resetPasswordAPI = (payload) => postRequest('/resetPassword',payload)
export const editProfileAPi = payload => postRequest('/edit-profile',payload)
export const setProfileImageAPI = payload =>postRequest('/user-image',payload)
export const contactUsAPI = payload => postRequest('contact-us',payload)