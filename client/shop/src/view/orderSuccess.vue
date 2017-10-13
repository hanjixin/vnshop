<template>
  <div>
  <heads></heads>
    <!--<nav-bread><span>购买完毕</span></nav-bread>-->
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="/static/img/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>Congratulations! <br>Your order is under processing!</h3>
          <p>
            <span>Order ID：{{orderId}}</span>
            <span>Order total：{{orderTotal}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/cart"> 购物车列表 </router-link>
              <!-- <a href="javascript:;" class="btn btn--m">Cart List</a> -->
            </div>
            <div class="btn-r-wrap">
              <router-link  class="btn btn--m" to="/">商品列表</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  <foot></foot>
  </div>
</template>
<script>
  import Heads from "../components/Head.vue";
  import Foot from "../components/Foot.vue";
  import Headbar from "../components/HeadBar";
  export default {
    name:'orderSuccess',
    data(){
      return {
        orderId:'',
        orderTotal:0
      }
    },
    components: {
      Headbar,
      Foot,
      Heads},
    mounted(){
      var orderId = this.$route.query.orderId;
      if(!orderId){
        return;
      }
      this.$http.get("/users/orderDetail",{
        params:{
          orderId:orderId
        }
      }).then((response) =>{
        let res = response.data;
        if(res.status == '0'){
          this.orderId = orderId;
          this.orderTotal = res.result.orderTotal;
        }
      })
    }
  }
</script>
