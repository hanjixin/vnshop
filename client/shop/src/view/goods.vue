<template>
  <div>
    <!--<modal :show="8888">-->
      <!--<button slot="header">韩吉鑫</button>-->
    <!--</modal>-->
   <Heads></Heads>
   <headbar></headbar>
    <Foot></Foot>



  </div>
</template>
<script>

  import Heads from "../components/Head.vue";
  import Foot from "../components/Foot.vue";
  import Headbar from "../components/HeadBar";

  export default{
    components: {

      Headbar,
      Foot,
      Heads},
    name:"goods"
  }
</script>
<style>

</style>
