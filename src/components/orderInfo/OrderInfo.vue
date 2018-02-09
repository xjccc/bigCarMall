<template>
  <div class="order">
    <div class="title">订单编号{{info.order_code}}</div>
    <div class="content">
      <div class="item">
        <span>支付金额</span>
        <div class="price">
          <span>{{info.pay_money}}元</span>
          <em>(订金)</em>
        </div>
      </div>
      <div class="item">
        <span>支付方式</span>
        <div class="pay-type">
          <span class="icon" :class="info.paytype_name === '微信' ? 'wx-icon' : 'zfb-icon'"></span>
          <span class="type">{{info.paytype_name}}</span>
        </div>
      </div>
      <div class="item">
        <span>支付时间</span>
        <span>{{info.pay_date}}</span>
      </div>
      <div class="item" v-if="info.finish_date">
        <span>提车时间</span>
        <span>{{info.finish_date}}</span>
      </div>
      <div class="item" v-if="info.apply_refund_time">
        <span>退款时间</span>
        <span>{{info.apply_refund_time}}</span>
      </div>
      <div class="item" v-if="info.refund_time">
        <span>完成退款</span>
        <span>{{info.refund_time}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['info'],
  data: () => ({})
}
</script>
<style scoped>
 .order{
   padding: 0 32px;
   margin-top: 16px;
   display: flex;
   flex-direction: column;
   background: #fff;
  }
  .content{
    padding: 16px 0;
    display: flex;
    flex-direction: column;
  }
  .title{
    font-size: 28px;
    color: #17181A;
    height: 78px;
    line-height: 78px;
    border-bottom: 2px solid #EDEDED;
  }
  .item{
    height: 60px;
    line-height: 60px;
    display: flex;
    flex-direction: row;
  }
  .item span:first-child{
    font-size: 28px;
    color: #5C6066;
  }
  .item span:last-child{
    margin-left: 16px;
    font-size: 28px;
    color: #17181A;
  }
  .item .price{
    margin-left: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .item .price span{
    font-size: 28px;
    color: #FF6600;
  }
  .item .price em{
    margin-left: 10px;
    font-size: 24px;
    color: #A1A9B2;
  }
  .pay-type{
    margin-left: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .item .pay-type .type{
    margin-left: 8px;
  }
  .icon{
    position: relative;
    width: 40px;
    height: 40px;
  }
  .wx-icon:before{
    position: absolute;
    top: 0;
    left: 0;
    font-family: 'carMall';
    content: "\e714";
    font-size: 40px;
    line-height: 40px;
    color: #00B700;
  }
  .zfb-icon:before{
    position: absolute;
    top: 0;
    left: 0;
    font-family: 'carMall';
    content: "\e716";
    font-size: 40px;
    line-height: 40px;
    color: #0799E2;
  }
</style>
