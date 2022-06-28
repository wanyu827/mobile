import request from '@/utils/request'
import store from '@/store'
/**
 * 获取短信验证码
 * @param {number} mobile
 * @returns promise
 */
export const getSmsCode = mobile => request({
  url: `/sms/codes/${mobile}`
})
/**
 * 将手机号和验证码获取发送到后台进行验证
 * @param {object{mobile,code}} data
 * @returns
 */
export const login = (data) => request({
  url: '/authorizations',
  method: 'POST',
  data
})
/**
 * 获取用户自己的信息
 * @returns
 */
export const getUserInfo = () => request({
  url: '/user',
  headers: {
    Authorization: 'Bearer ' + store.state.user.token
  }
})
