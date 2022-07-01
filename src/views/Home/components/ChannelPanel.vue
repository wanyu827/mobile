<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          size="mini"
          round
          plain
          type="danger"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>

      <van-row>
        <van-col
          span="6"
          v-for="(item, index) in myChannelsList"
          :key="item.id"
        >
          <div
            class="inner"
            @click="onClick(index)"
            :style="{ color: active === index ? 'red' : '' }"
          >
            {{ item.name }}
            <van-icon name="close" v-if="index !== 0" v-show="isCloseShow" />
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/localStorge'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanel',
  props: {
    myChannelsList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      this.recommendChannels = res.data.data.channels.filter(item => this.myChannelsList.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id)
      this.myChannelsList.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        // 删除
        if (index === 0) return
        const obj = this.myChannelsList[index]
        this.myChannelsList.splice(index, 1)
        this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    myChannelsList: {
      // 登陆过 把持久化放在后台服务器（用ajax）未登录 放本地存储
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) {
          // 登陆过
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          // 处理频道数据
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else { // 未登录
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 16px;
    h3 {
      font-size: 32px;
      font-weight: 400;
      color: #333333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
      color: #f85959;
    }
  }
  .van-col {
    margin-bottom: 22px;
  }
  .inner {
    width: 160px;
    height: 86px;
    background: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: 400;
    color: #222222;
    text-align: center;
    line-height: 86px;
    margin-left: 14px;
    position: relative;
    .van-icon-close {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
    }
  }
}
</style>
