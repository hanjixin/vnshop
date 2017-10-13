<template>
  <div>
    <div class="nav-breadcrumb-wrap">
      <div class="container">
        <nav class="nav-breadcrumb">
          <a href="/">Home</a>
          <span>Goods</span>
        </nav>
      </div>
    </div>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" @click="getlist()" class="default cur">默认</a>
          <a href="javascript:void(0)" @click="getlistS()" class="price">价格<svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" @click="getlist()">All</a></dd>
              <dd>
                <a href="javascript:void(0)" @click="getlistL(0)">0 - 100</a>
              </dd>
              <dd>
                <a href="javascript:void(0)" @click="getlistL(1)">100 - 500</a>
              </dd>
              <dd>
                <a href="javascript:void(0)" @click="getlistL(2)">500 - 1000</a>
              </dd>
              <dd>
                <a href="javascript:void(0)" @click="getlistL(3)">1000 - 2000</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li  v-for="item in list">
                  <div class="pic">
                    <a href="#"><img v-lazy="'static/img/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}元</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                  ...
                </div>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :loginModalFlag="show">
      <p slot="message"> 加入购物车成功</p>
      <div slot="btnGroup">
        <router-link class="btn btn--m" to="cart">查看购物车</router-link>
        <!--<br>-->
        <a  href="javascript:void (0)" style="float: right" class="btn btn--m" @click="show=!show">继续购买</a>
      </div>
    </modal>
  </div>
</template>
<script>

import axios from "axios";
import Modal from "../components/modal.vue";
  export default{
    name:"headbar",
    components:{
      Modal
    },
    data:function () {
      return {
            list:[],
             busy:true,
             flag:false,
             page:1,
             pagesize:8,
            show:false
      }},
   created:function () {
     this.getlist();
   },
    methods:{
   getlist:function () {
     axios.get("goods/list?page="+this.page+"&pagesize="+this.pagesize).then(res=>{
          console.log(res);
       if(this.flag){
         if (res.data.data.length==0){
           this.busy=true;
           this.page=1;
           this.flag=false;

         }else {
           this.list=this.list.concat(res.data.data);
           this.busy=false
         }

       }else {
         this.list=res.data.data;
         this.busy=false

       }

     })
   }
   ,
      getlistS:function () {
        axios.get("goods/list?sort=-1").then(res=>{
          console.log(res);
          this.list=res.data.data;

        })
      },
      getlistD:function () {
        axios.get("goods/list?sort=1").then(res=>{
          console.log(res);
          this.list=res.data.data;
//          res.data.data;
        })
      }
      ,
      getlistL:function (L) {
        axios.get("/goods/list?level="+L).then(res=>{
          console.log(res);
          this.list=res.data.data;
        })
      },
      loadMore: function() {
        this.busy = true;

        setTimeout(() => {
          this.page++;
          this.flag=true;
          this.getlist();


        }, 1000);
      },
      addCart:function (productId) {

        axios.post('goods/addCart',{productId:productId}).then(result=>{
          let res = result.data;
          if(res.status == 1){
            alert('加入购物车失败！')
          }else{
           this.show=true;
          }

        })
}

    }


  }
</script>
<style>

</style>
<!--http://element.eleme.io/#/-->
<!--https://ant.design/docs/react/introduce-cn-->
<!--htttp://wwwsemantic-ui.cn/-->
<!--http://dev.dcloud.net.cn/mui/ui/-->
<!--http://m.smi.taobao.org/conponents/-->
<!--https://materrial.angular.io/-->
