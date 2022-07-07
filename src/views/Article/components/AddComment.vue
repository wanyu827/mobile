<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    center
    ref="field"
  >
    <template #extra>
      <van-button
        :disabled="message.length === 0"
        type="default"
        @click="onClick"
        >发布</van-button
      >
    </template>
  </van-field>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'AddComment',
  props: {
    target: {
      type: [Number, String],
      required: true
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message

        })
        console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    // 组件最后会变成dom结构 $el可以获取这个组件的根标签dom
    this.$refs.field.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
button {
  border: none;
  color: #6ba3d8;
}
/deep/.van-field__value {
  background-color: #f5f7f9;
  color: #333;
}
</style>
