<template>
  <transition name="move">
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>

        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥ {{food.price}}</span>
            <span class="old" v-show="food.oldPrice">¥ {{food.oldPrice}}</span>
          </div>
        </div>

      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {
        type: Object,
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-enter, &.move-leave-to
      opacity: 0
      transform: translateX(100px)
    &.move-enter-active, &.move-leave-active
      transition: all 1s ease
      transform: translateX(0)
    .food-content
      .image-header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 10px
          left: 0
          .icon-arrow_lift
            display: block
            padding: 10px
            font-size: 20px
            color: white



      .content
        padding: 18px
        position: relative
        .title
          font-weight: 700
          color: rgb(7, 17, 27)
          line-height: 14px
          font-size: 14px
          margin-bottom: 8px
        .detail
          line-height: 10px
          height: 10px
          font-size: 0
          margin-bottom: 18px
          color: rgb(147, 153, 159)
          .sell-count
            display: inline-block
            font-size: 10px
            margin-right: 12px
          .rating
            display: inline-block
            font-size: 10px
        .price
          line-height: 24px
          font-weight: 700
          .nowprice
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .oldprice
            font-size: 10px
            color: rgb(147, 153, 159)
            text-decoration: line-through
        .cartcontrol-wrapper
          position: absolute
          right: 12px
          bottom: 12px
        .buy
          position: absolute
          right: 18px
          bottom: 18px
          z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          font-size: 10px
          border-radius: 12px
          color: white
          background: rgb(0, 160, 220)

</style>
