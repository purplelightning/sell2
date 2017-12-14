<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="score-wrapper border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="rating-count">{{seller.ratingCount}}</span>
          <span class="sell-count">月售{{seller.sellCount}}单</span>
        </div>
      </div>

      <ul class="detail">
        <li class="minprice-wrapper">
          <div class="title">起送价</div>
          <div class="min-price">{{seller.minPrice}}<span class="sm">元</span></div>
        </li>
        <li class="method">
          <div class="title">商家配送</div>
          <div class="deliveryfee">{{seller.deliveryPrice}}<span class="sm">元</span></div>
        </li>
        <li class="time">
          <div class="title">平均配送时间</div>
          <div class="deliverytime">{{seller.deliveryTime}}<span class="sm">分钟</span></div>
        </li>
      </ul>
      <split></split>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from 'components/star/star'
  import split from 'components/split/split'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .seller-content
      .overview
        position: relative
        padding: 18px
        .title
          margin-bottom: 8px
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
        .score-wrapper
          padding-bottom: 18px
          line-height: 18px
          font-size: 0
          border-1px: rgba(7, 17, 27, 0.1)
          .star
            display: inline-block
            vertical-align: top
            margin-right: 8px
          .rating-count
            display: inline-block
            vertical-align: top
            margin-right: 12px
            font-size: 10px
            color: rgb(77, 85, 93)
          .sell-count
            display: inline-block
            vertical-align: top
            font-size: 10px
            color: rgb(77, 85, 93)
        .favor
          position: absolute
          width: 50px
          right: 11px
          top: 18px
          text-align: center
          .icon-favorite
            display: block
            margin-bottom: 4px
            font-size: 24px
            color: #d4d6d9
            line-height: 24px
            &.active
              color: rgb(240, 20, 20)
          .text
            color: rgb(77, 85, 93)
            line-height: 10px
            font-size: 10px

      .detail
        display: flex
        padding: 18px
        .minprice-wrapper
          display: inline-block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.2)
          .title
            margin-bottom: 4px
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
          .min-price
            font-size: 24px
            color: rgb(7, 17, 27)
            line-height: 24px
            .sm
              font-size: 10px
        .method
          display: inline-block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          .title
            margin-bottom: 4px
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
          .deliveryfee
            font-size: 24px
            color: rgb(7, 17, 27)
            line-height: 24px
            .sm
              font-size: 10px
        .time
          display: inline-block
          flex: 1
          text-align: center
          .title
            margin-bottom: 4px
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
          .deliverytime
            font-size: 24px
            color: rgb(7, 17, 27)
            line-height: 24px
            .sm
              font-size: 10px

</style>
