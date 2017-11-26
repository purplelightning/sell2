<template>
  <div class="cartcontrol">
    <transition name="trans">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreCart($event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>

    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle"
         @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        foodCount: {
          type: Number,
          default: 0
        }
      }
    },
    created() {
//      console.log(this.food)
    },
    methods: {
      addCart(event) {
//        this.$emit('add')
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)//添加属性
          this.food.count = 1
        } else {
          this.food.count++
        }
      },
      decreCart(event) {
        if (!event._constructed) {
          return
        }
//        this.$emit('decrease')
        if (this.food.count) {
          this.food.count--
        }
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      z-index:1
      &.trans-enter,&.trans-leave-to
        opacity: 0
        transform: translate3D(24px, 0, 0)
      &.trans-leave-active,&.trans-enter-active
        transition: all .5s linear
        transform: translate3D(0, 0, 0)
      .inner
        display: inline-block
        font-size: 24px
        line-height: 24px
        color: rgb(0, 160, 220)
        &.trans-enter-active,&.trans-leave-active
          transform:rotate(0)
          transition: all .5s linear
        &.trans-enter,&.trans-leave-to
          transform:rotate(180)
    .count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      height: 24px
      color: rgb(147, 153, 159)

    .cart-increase
      display: inline-block
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
</style>
