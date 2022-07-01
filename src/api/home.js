/* eslint-disable camelcase */
import request from '@/utils/request'
/**
 * 我的频道
 * @returns
 */
export const getMyChannels = () => request({
  url: '/user/channels'

})
/**
 * 获取文章列表
 * @param {*} param
 * @returns
 */
export const getArticleList = ({ channel_id, timestamp }) => request({
  url: 'articles',
  params: { channel_id, timestamp }
})
/**
 *  获取所有的频道列表
 * @returns
 */
export const getAllArticleList = () => request({
  url: 'channels'
})
/**
 * 频道数据持久化
 * @param {*} channels
 * @returns
 */
export const saveChannels = (channels) => request({
  url: '/user/channels',
  method: 'PUT',
  data: {
    channels
  }
})
