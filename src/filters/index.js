import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
/**
 * 把时间变成相对时间
 * @param {*} time
 * @returns
 */
export const dateFormat = (time) => {
  return dayjs(time).fromNow()
}
