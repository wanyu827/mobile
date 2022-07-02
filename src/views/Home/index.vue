<template>
  <div>
    <van-nav-bar title="标题" fixed>
      <template #title>
        <van-button icon="search" class="search-btn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated>
      <van-tab :title="obj.name" v-for="obj in myChannelsList" :key="obj.id">
        <ArticleList :id="obj.id"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="menu" @click="isChannelPannelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelPannelShow"
      position="bottom"
      :style="{ height: '100%', paddingTop: '1.3rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPanel
        :myChannelsList="myChannelsList"
        :active="active"
        @change-active="
          active = $event;
          isChannelPannelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>

import ChannelPanel from './components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/localStorge'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.getMyChannel()
  },
  data () {
    return {
      active: 0,
      myChannelsList: [],
      isChannelPannelShow: false
    }
  },
  methods: {
    async getMyChannel () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.myChannelsList = channels
      } else {
        try {
          const res = await getMyChannels()
          // console.log(res)
          this.myChannelsList = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},

  filters: {},
  components: { ArticleList, ChannelPanel }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(242, 241, 167, 0.2);

  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
.van-button__text {
  color: #f2f1a7;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  height: 6px;
  background: #ef5959;
  border-radius: 3px;
}
.menu {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 40px;
  }
}
.menu1 {
  min-width: 66px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
}
/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 2;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
