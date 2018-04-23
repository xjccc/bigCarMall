<template>
  <div class="compelete-footer">
    <div class="footer" v-if="actions === 'all'">
      <span class="buy-call" @click="tel">联系商家</span>
      <span class="back-money" @click="backMoney">申请退款</span>
      <span class="get-car" @click="getCar">确认提车</span>
    </div>
    <div class="footer" v-if="actions === 'back-money'">
      <span class="buy-call" @click="tel">联系商家</span>
    </div>
    <div class="footer" v-if="actions === 'get-car'">
      <span class="buy-call" @click="tel">联系商家</span>
      <span class="concat-us" @click="telUs">联系客服</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['actions'],
  data: () => ({}),
  methods: {
    tel() {
      this.$emit('tel')
    },
    backMoney() {
      this.$emit('backMoney')
    },
    getCar() {
      this.$emit('getCar')
    },
    telUs() {
      this.$emit('telUs')
    }
  }
}
</script>
<style scoped>
  .compelete-footer{
    height: 50px;
    background: #fff;
    box-shadow: 0 0 0 0 #DDDDDD;
  }
  .footer{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .get-car{
    width: 162px;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
    background: #FF6600;
    text-align: center;
  }
  .buy-call,.back-money,.concat-us{
    position: relative;
    flex: 1;
    font-size: 14px;
    line-height: 50px;
    color: #5C6066;
    text-align: center;
  }
  .buy-call:before{
    margin-right: 4px;
    font-family: 'carMall';
    content: "\e706";
    color: #5C6066;
    line-height: 14px;
  }
  .buy-call:after{
    content: "";
    position: absolute;
    top: 17px;
    right: 0;
    width: 1px;
    height: 18px;
    background: #EDEDED;
  }
  .back-money:before{
    margin-right: 4px;
    font-family: 'carMall';
    content: "\e715";
    color: #5C6066;
    line-height: 14px;
  }
  .concat-us:before{
    margin-right: 4px;
    font-family: 'carMall';
    content: "\e710";
  }
</style>
