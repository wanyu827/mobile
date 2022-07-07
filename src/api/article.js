import request from '@/utils/request'
/**
 * 根据id查文章
 * @param {文章id} article_id
 * @returns
 */
export const getArticle = (article_id) => request({
  url: `/articles/${article_id}`
})
/**
 * 关注用户
 * @param {用户id} target
 * @returns
 */
export const addFollowUser = (target) => request({
  url: '/user/followings',
  method: 'POST',
  data: {
    target
  }
})
/**
 * 取消关注用户
 * @param {用户id} target
 * @returns
 */
export const delFollowUser = (target) => request({
  url: `/user/followings/${target}`,
  method: 'DELETE'
})
/**
 * 添加收藏
 * @param {收藏文章id} target
 * @returns
 */
export const addCollect = (target) => request({
  url: '/article/collections',
  method: 'POST',
  data: {
    target
  }
})
/**
 * 取消收藏
 * @param {目标文章的id} target
 * @returns
 */
export const delCollect = (target) => request({
  url: `/article/collections/${target}`,
  method: 'DELETE'
})
/**
 * 文章点赞
 * @param {点赞的文章的id} target
 * @returns
 */
export const giveLike = (target) => request({
  url: '/article/likings',
  method: 'POST',
  data: {
    target
  }
})
/**
 * 取消点赞
 * @param {文章id} target
 * @returns
 */
export const delLike = (target) => request({
  url: `/article/likings/${target}`,
  method: 'DELETE'
})
