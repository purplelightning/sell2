<template>
  <div class="goods-wrapper">
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item"
              :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon"
                  :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul class="licon">
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
                <div class="icon">
                  <img width="57" height="57" v-bind:src="food.icon">
                </div>
                <div class="content">
                  <div class="name">{{food.name}}</div>
                  <div class="des">{{food.description}}</div>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥ {{food.price}}</span><span v-show="food.oldPrice"
                                                                   class="old">{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" v-on:decrease="decrecount" v-on:add="addcount"
                    ></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="shopcart-wrapper">
        <shopcart :delivery-price="seller.deliveryPrice"
                  :min-price="seller.minPrice"
                  :select-foods="selectFoods"></shopcart>
      </div>

    </div>

    <food :food="selectedFood" ref="food"></food>
  </div>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import food from 'components/food/food'

  const ERR_OK = 0

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('/api/goods').then((res) => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.goods = res.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      decrecount() {
//        this.food.count--
        console.log('减少一个')
      },
      addcount() {
//        this.food.count++
        console.log('增加一个11')
      },
      _initScroll() {
//        better-scroll会对click事件做prevent default
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,//实时监听位置,不论是缓动还是快速滑动
          click: true//使点击可以触发
        })
        //监听位置
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },

      _calculateHeight() {
        //一个Item块的高度
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu(index, event) {
//        console.log(index)
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]//要滚动到的列表
        this.foodsScroll.scrollToElement(el, 300)

      },
      selectFood(food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood=food
        //父组件调用子组件方法,在js里操作子组件
        this.$refs.food.show()
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .goods-wrapper
    .goods
      display: flex
      position: absolute
      top: 174px
      bottom: 46px
      width: 100%
      overflow: hidden
      .menu-wrapper
        flex: 0 0 80px
        width: 80px
        background: #f3f5f7
        .menu-item
          display: table
          padding: 12px
          width: 56px
          height: 54px
          line-height: 14px
          &.current
            position: relative
            z-index: 10
            margin-top: -1px
            font-weight: 700
            color: #000
            background: #ffffff
            .text
              border-none()
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
          .text
            display: table-cell
            vertical-align: middle
            width: 56px
            font-size: 12px
            border-1px(rgba(7, 17, 27, 0.1))

      .foods-wrapper
        flex: 1
        .title
          padding-left: 14px
          height: 26px
          line-height: 26px
          font-size: 12px
          color: rgb(147, 153, 159)
          border-left: 2px solid #d9dde1
          background: #f3f5f7;
        .licon
          .food-item
            display: flex
            margin: 18px
            padding-bottom: 18px
            border-1px(rgba(7, 17, 27.0 .1))
            &:last-child
              border-none()
              margin-bottom: 0

            .icon
              flex: 0 0 57px
              margin-right: 10px
            .content
              flex: 1
              vertical-align: top
              margin-top: 2px
              .name
                margin-bottom: 8px
                height: 14px
                font-size: 14px
                color: rgb(7, 17, 27)
                line-height: 14px
              .des
                margin-bottom: 8px
                font-size: 10px
                line-height: 12px
                color: rgb(147, 153, 159)
              .extra
                line-height: 10px
                color: rgb(147, 153, 159)
                font-size: 10px
                .count
                  margin-right: 12px
              .price
                font-weight: 700
                line-height: 24px
                .now
                  margin-right: 8px
                  font-size: 14px
                  color: rgb(240, 20, 20)
                .old
                  text-decoration: line-through
                  font-size: 10px
                  color: rgb(147, 153, 159)
              .cartcontrol-wrapper
                position: absolute
                right: 0
                bottom: 12px


</style>













