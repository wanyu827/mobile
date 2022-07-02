
import request from '@/utils/request'

export const getSuggestList = q => request({
  url: 'suggestion',
  params: {
    q
  }
})
/**
 *通过搜索关键字获取搜索结果
 * @param page 页数默认1 per_page 每页数量 q 搜索关键字
 * @returns
 */
/* eslint-disable camelcase */
export const getSearchResult = ({ page = 1, per_page, q }) => request({
  url: 'search',
  params: { page, per_page, q }
})
