<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="(item, index) in commentList" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pundate | dateFormat
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell> -->
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentList } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {
    type: {
      type: String,
      required: true,
      // props自定义校验函数
      validator (value) {
        // return ['a', 'c'].indexOf(value) !== -1
        return ['a', 'c'].includes(value)// 数据只能是a或者c才验证通过
      }
    },
    source: {
      type: [Number, String],
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      commentObj: {
        type: this.type,
        source: this.source,
        limit: 5,
        offset: null
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.commentObj)
        console.log(res)
        // 数据全部加载完毕，直接将finished设置为true即可
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)// 保留每一页数据
        // 本次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为NULL
        this.commentObj.offset = res.data.data.last_id
        // 每次数据拿回来了，就把loading转圈效果关闭
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      // 获取下一页数据
      this.getCommentList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
