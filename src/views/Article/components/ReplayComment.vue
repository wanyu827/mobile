<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left> <van-icon name="cross" /></template
    ></van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
    ></CommentItem>
    <div class="contain"></div>
    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="isAddCommentShow = true"
        >评论</van-button
      >
    </div>
    <van-popup position="bottom" v-model="isAddCommentShow">
      <AddComment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddCommentShow"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment.vue'
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  name: 'ReplayComment',
  props: {
    comment: {
      type: Object,
      /* 默认值(对象)需要包括小括号 */
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      offset: null,
      limit: 9999,
      list: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({ type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit })
        console.log(res)
        this.list = res.data.data.results
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style lang="less" scoped>
.comment {
  margin-top: 92px;
}
.contain {
  margin-bottom: 110px;
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 750px;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: #ef5959;
  .van-button {
    background-color: #f2f1a7;
    border: none;
    color: #ef5959;
  }
}
</style>
