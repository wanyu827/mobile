<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link @click="showInput">
      <van-image
        class="avatar"
        fit="cover"
        round
        width="0.9rem"
        height="0.9rem"
        :src="profile.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="profile.name"
      @click="isNameShow = true"
      is-link
    />
    <van-cell
      title="性别"
      :value="profile.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      :value="profile.birthday"
      is-link
      @click="isBirthdayShow = true"
    />
    <van-popup style="height: 100%" position="bottom" v-model="isNameShow">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onNameCancel"
        @click-right="onNameSave"
      />
      <van-field
        :value="profile.name"
        @input="name = $event"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-popup>
    <van-popup position="bottom" v-model="isBirthdayShow">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
    /></van-popup>
    <input
      type="file"
      style="display: none"
      accept="image/jpeg,image/png,image/gif,image/jpg"
      ref="file"
      @change="onChange"
    />
    <van-popup style="height: 100%" v-model="isAvatarShow" position="bottom">
      <UpdateAvatar
        :imgSrc.sync="imgSrc"
        @close="isAvatarShow = false"
      ></UpdateAvatar>
    </van-popup>
  </div>
</template>

<script>
import UpdateAvatar from './components/UpdateAvatar.vue'
import { getUserProfile, updateUserProfile } from '@/api/user'
export default {
  async created () {
    try {
      const res = await getUserProfile()
      console.log(res)
      this.profile = res.data.data
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      profile: {},
      isNameShow: false,
      name: '',
      isBirthdayShow: false,
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2022, 10, 1),
      birthday1: '',
      isAvatarShow: false,
      imgSrc: ''
    }
  },
  methods: {
    onNameCancel () {
      this.isNameShow = false
    },
    async onNameSave () {
      this.profile.name = this.name
      await this.save()
      this.isNameShow = false
    },
    async save () {
      try {
        await updateUserProfile(this.profile)
      } catch (err) {
        console.log(err)
      }
    },
    onConfirm () {
      this.profile.birthday = this.birthday1
      this.save()
      this.isBirthdayShow = false
    },
    showInput () {
      this.$refs.file.click()
    },
    onChange () {
      const url = window.URL.createObjectURL(this.$refs.file.files[0])
      console.log(url)
      this.imgSrc = url
      this.isAvatarShow = true
    }

  },
  computed: {
    currentDate: {
      get () {
        return new Date(this.profile.birthday)
      },
      set (newVal) {
        this.birthday1 = newVal.getFullYear() + '-' + (newVal.getMonth() + 1) + '-' + newVal.getDate()
      }
    }
  },
  watch: {
    imgSrc: {
      handler (newVal) {
        this.profile.photo = newVal
      }
    }
  },
  filters: {},
  components: { UpdateAvatar }
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar__text {
  color: #f2f1a7;
}
</style>
