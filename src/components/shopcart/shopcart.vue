<template>
  <div class="shopcart-wrapper">
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
            <div class="logo-have">
              <i class="icon-shopping_cart"></i>
            </div>
          </div>

          <div class="price" :class="{'highlight':totalPrice>0}">¥ {{totalPrice}}</div>
          <div class="desc">
            另需配送费¥ {{deliveryPrice}}元
          </div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="{'enough':totalPrice>=minPrice}">
            <div>{{payDesc}}</div>
          </div>
        </div>

      </div>

      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>¥ {{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>

    </div>

    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>

  </div>

</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'

  export default {
    props: {
      selectFoods: {
        type: Array,
        default: function () {
          return [
            {
              price: 10,
              count: 0
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 20
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        fold: true
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      hideList() {
        this.fold = true
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert('结算')
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return ` ¥${this.minPrice}起送`;//ES6反引号,在有变量的时候,不用加号拼字符串
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差¥${diff}起送`;
        } else {
          return '去结算';
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      },
    },
    components: {
      cartcontrol
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .shopcart-wrapper
    .shopcart
      position: fixed
      left: 0
      bottom: 0
      z-index: 50
      width: 100%
      height: 48px
      .content
        display: flex
        background: #141d27
        font-size: 0
        color: rgba(255, 255, 255, .4)
        .content-left
          flex: 1
          background: #141d27
          .logo-wrapper
            display: inline-block
            position: relative
            vertical-align: top
            top: -10px
            margin: 0 12px
            padding: 6px
            width: 56px
            height: 56px
            box-sizing: border-box
            border-radius: 50%
            background: #141d27
            .logo
              width: 100%
              height: 100%
              border-radius: 100%
              background: #2b343c
              text-align: center
              &.highlight
                background: rgb(0, 160, 220)
                .icon-shopping_cart
                  line-height: 44px
                  font-size: 24px
                  color: #80858a
                  &.highlight
                    color: #fff
            .num
              position: absolute
              right: 0
              top: 0
              width: 24px
              height: 16px
              line-height: 16px
              text-align: center
              font-weight: 700
              font-size: 9px
              border-radius: 16px
              background: rgb(240, 20, 20)
              color: white
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)
          .price
            display: inline-block
            vertical-align: top
            margin-top: 12px
            font-size: 16px
            font-weight: 700
            line-height: 24px
            padding-right: 12px
            box-sizing: border-box
            border-right: 1px solid rgba(255, 255, 255, 0.1)
            &.highlight
              color: #fff
          .desc
            display: inline-block
            vertical-align: top
            margin: 12px 0 0 12px
            line-height: 24px
        .content-right
          flex: 0 0 105px
          width: 105px
          .pay
            height: 48px
            line-height: 48px
            text-align: center
            font-size: 12px
            font-weight: 700
            background: #2b333b
            &.enough
              font-weight: 700
              color: #fff
              background: #00b43c
      .shopcart-list
        position: absolute
        z-index: -1
        left: 0
        bottom: 100%
        width: 100%
        &.fold-enter-active, &.fold-leave-active
          transition: all 0.5s
          transform: translate3d(0, 0, 0)
        &.fold-enter, &.fold-leave-to
          transform: translate3d(0, 100%, 0)
        .list-header
          padding: 0 18px
          line-height: 40px
          height: 40px
          background: #f3f5f7
          border-bottom: 1px solid rgb(7, 17, 27, .1)
          .title
            float: left
            color: rgb(7, 17, 27)
            font-size: 14px
            line-height: 40px
          .empty
            float: right
            font-size: 12px
            color: rgb(0, 160, 220)
        .list-content
          padding: 0 18px
          max-height: 217px
          overflow: hidden
          background: #fff
          .food
            position: relative
            padding: 12px 0
            box-sizing: border-box
            border-1px(rgba(7, 17, 27, 0.1))
            .name
              font-size: 14px
              color: rgb(7, 17, 27)
              line-height: 24px
            .price
              position: absolute
              right: 90px
              bottom: 12px
              font-size: 14px
              line-height: 24px
              color: rgb(240, 20, 20)
              font-weight: 700
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 6px

    .list-mask
      position: fixed
      top: 0
      left: 0
      height: 100%
      width: 100%
      z-index: 40
      backdrop-filter: blur(10px)
      background: rgba(7, 17, 27, 0.6)
      &.fade-enter, &.fade-leave-to
        opacity: 0
      &.fade-enter-active, &.fade-leave-active
        transition: all .7s
</style>
