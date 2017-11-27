<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">

          <div class="score-wrapper">
            <div class="title">服务态度</div>
            <star :size="36" :score="seller.serviceScore"></star>
            <div class="score">{{seller.serviceScore}}</div>
          </div>
          <div class="score-wrapper">
            <div class="title">商品评分</div>
            <star :size="36" :score="seller.foodScore"></star>
            <div class="score">{{seller.foodScore}}</div>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>

        </div>
      </div>

      <split></split>
      <ratingselect :ratings="ratings" :select-type="selectType"
                    :onlyContent="onlyContent"
                    @newtype="changeType" @contentchange="changeContent"
      ></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item"
              v-show="needShow(rating.rateType,rating.text)">
            <div class="left">
              <img class="avatar" :src="rating.avatar">
            </div>
            <div class="right">
              <div class="title">
                <div class="name">{{rating.username}}</div>
              </div>
              <div class="detail">
                <star :size="24" :score="rating.score"></star>
                <div class="delivery-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</div>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="bottom">
                <i class="icon-thumb_up" v-show="rating.rateType===0"></i>
                <i class="icon-thumb_down" v-show="rating.rateType===1"></i>
                <span class="recom" v-for="recom in rating.recommend">{{recom}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>

          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'
  import {formatDate} from 'common/js/date'
  import BScroll from 'better-scroll'

  const ALL = 2
  const POSITIVE = 0
  const NEGATIVE = 1
  const ERR_OK = 0

  export default {
    created() {
      this.$http.get('/api/ratings').then((res) => {
        res = res.body
//        console.log(res)
        if (res.errno === ERR_OK) {
          this.ratings = res.data
        }
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      })
    },
    data() {
      return {
        onlyContent: true,
        selectType: ALL,
        ratings: []

      }
    },
    methods: {
      changeType(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      changeContent() {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    props: {
      seller: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, .1)
        text-align: center
        @media only screen and (max-width: 320px)//当手机宽度不超过320px时
          flex: 0 0 120px
          width: 120px

        .score
          margin-bottom: 6px
          font-size: 24px
          color: rgb(255, 153, 0)
          line-height: 28px
        .title
          margin-bottom: 8px
          font-size: 12px
          line-height: 12px
          color: rgb(7, 17, 27)
        .rank
          font-size: 10px
          line-height: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px

        .score-wrapper
          font-size: 0px
          margin-bottom: 8px
          .title
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 18px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            vertical-align: top
            margin: 0 12px
          .score
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 18px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          line-height: 18px
          font-size: 0
          .title
            font-size: 12px
            line-height: 18px
            color: rgb(7, 17, 27)
          .delivery-time
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper //外层上下,里层左右
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px: rgba(7, 17, 27, 0.1)
        .left
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          .avatar
            border-radius: 50%
            width: 28px
            height: 28px
        .right
          position: relative
          flex: 1
          vertical-align: top
          .title
            .name
              margin-bottom: 4px
              font-size: 10px
              color: rgb(7, 17, 27)
              line-height: 12px
          .detail
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              vertical-align: top
              margin-right: 6px
            .delivery-time
              display: inline-block
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
              line-height: 12px
          .text
            margin-bottom: 8px
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
          .bottom
            line-height: 16px
            .icon-thumb_up, .icon-thumb_down
              display: inline-block
              font-size: 9px
              margin-right: 0 8px 4px 0
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(183, 187, 191)
            .recom
              margin-right: 8px
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              color: rgb(147, 153, 159)
              border-radius: 2px
              font-size: 12px
          .time
            position: absolute
            top: 0
            right:10px
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 12px


</style>
