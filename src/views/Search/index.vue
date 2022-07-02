<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#ef5959"
        @cancel="$router.go(-1)"
        @search="onSearch"
        autofocus
        @focus="isSearch = false"
      />
      <SearchHistory
        v-if="searchText === ''"
        @search="onSearch"
      ></SearchHistory>
      <template v-else>
        <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
        <SearchSuggest
          v-else
          :searchText="searchText"
          @search="onSearch"
        ></SearchSuggest>
      </template>
    </form>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchResult from './components/SearchResult.vue'
import SearchSuggest from './components/SearchSuggest.vue'
export default {
  name: 'Search',
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false
    }
  },
  methods: {
    onSearch (str) {
      this.searchText = str
      this.isSearch = true
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchHistory, SearchResult, SearchSuggest }
}
</script>

<style scoped lang='less'>
/deep/.van-field__control::placeholder {
  /* WebKit browsers */
  color: #810749;
}
</style>
