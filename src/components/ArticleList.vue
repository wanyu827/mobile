<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          :title="item.title"
          value="内容"
          label="描述信息"
          v-for="(item, index) in articleList"
          :key="index"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/api/home'
let ele = null //
let scrollTop = 0 // 记录滚动的位置
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true

    }
  },
  created () {
    this.getArticleList()
  },
  mounted () {
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      scrollTop = this.scrollTop
    })
  },
  activated () {
    // console.log(ele)
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      // 清空列表数据

      this.finished = false
      // 重新加载数据

      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.timestamp = Date.now()
      this.getArticleList()
    },
    async getArticleList () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        // console.log(res)

        this.timestamp = res.data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped>
.van-cell-group {
  margin-top: 174px;
}
</style>
