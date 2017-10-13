<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition " :class="{'md-show' : loginModalFlag}" >
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">信息展示</div>
          <button class="md-close" @click="loginModalFlag=!loginModalFlag">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
          <slot name="message"></slot>
          </div>
          <div class="login-wrap">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag = false">
    </div>

  </div>
</template>
<script>
  export  default {
    name:"modal",
    props:['loginModalFlag'],
    data(){
      return{
//        userName:'',
//        userPwd:'',
//        nickName:'',
//        loginModalFlag:false
      }
    },
    mounted:function(){

    }
  }
</script>
<style>

</style>
