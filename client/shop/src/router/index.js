import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Cart from '@/view/cart'
import Address from '@/view/Address'
import Order from '@/view/order'
import OrderSuccess from '../view/orderSuccess'
console.log(OrderSuccess)
Vue.use(Router)
import Goods from "@/view/goods.vue";
export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component:Goods
    },
    {
      path: '/cart',
      name: 'cart',
      component:Cart
    },
    {
      path: '/address',
      name: 'address',
      component:Address
    },
    {
      path: '/order',
      name: 'order',
      component:Order
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component:OrderSuccess
    }
  ]
})


