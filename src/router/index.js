import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import goods from 'components/goods/goods.vue'
import ratings from 'components/ratings/ratings.vue'
import seller from 'components/seller/seller.vue'


Vue.use(VueRouter)

export default new VueRouter({
  linkActiveClass:'active',//设置激活样式,可以省略
  routes: [
    {
      path:'/',
      redirect:'goods'
    },
    {
      path:'/goods',
      component:goods
    },
    {
      path:'/ratings',
      component:ratings
    },
    {
      path:'/seller',
      component:seller
    }
  ]
})
