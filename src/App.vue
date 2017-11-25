<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link class="rl" to="/goods"><span class="ro">商品</span></router-link>
      </div>
      <div class="tab-item">
        <router-link class="rl" to="/ratings"><span class="ro">评论</span></router-link>
      </div>
      <div class="tab-item">
        <router-link class="rl" to="/seller"><span class="ro">商家</span></router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue'

  const ERR_OK = 0

  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then((res) => {
        res = res.body//转换成json对象
        if (res.errno === ERR_OK) {
          this.seller = res.data//后端数据获得的seller对象
//          console.log(this.seller)
        }
      })
    },
    components: {
      'v-header': header
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import 'common/stylus/mixin.styl'

  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      /*border-bottom:1px solid rgba(7,17,27,.1)*/
      border-1px: rgba(7, 17, 27, 0.1)
      .tab-item
        flex: 1
        text-align: center
        .rl
          display: block
          color: rgb(77, 85, 93)
          span
            font-size: 14px
            font-weight: 100
            line-height: 14px
          &.active
            color: rgb(240, 20, 20)

</style>
