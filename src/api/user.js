import request from '@/utils/request'

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
  url: '/user'

})
/**
 *
 * @returns 用户个人信息
 */
export const getUserProfile = () => request({
  url: '/user/profile'
})
/**
 * 更新用户个人资料
 * @param {Object 用户个人资料} profile
 * @returns
 */
export const updateUserProfile = (profile) => request({
  method: 'PATCH',
  url: '/user/profile',
  data: profile
})
/**
 *更新头像
 * @param {裁剪之后的头像数据} data
 * @returns
 */
export const updateAvatar = data => request({
  url: '/user/photo',
  method: 'PATCH',
  data
})
