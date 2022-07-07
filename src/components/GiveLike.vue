<template>
  <van-icon
    color="#777"
    :name="attitude === 1 ? 'good-job' : 'good-job-o'"
    @click="onClick"
  />
</template>

<script>
import { delLike, giveLike } from '@/api/article'
// import {giveLike,delLike} from '@/api/article'
export default {
  name: 'GiveLike',
  props: {
    attitude: {
      type: Number,
      required: true
    }
  },
  created () { },
  data () {
    return {

    }
  },
  methods: {
    async onClick () {
      const target = this.$route.params.article_id

      if (this.attitude === -1) {
        try {
          await giveLike(target)
          this.$emit('update:attitude', 1)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await delLike(target)
          this.$emit('update:attitude', -1)
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
