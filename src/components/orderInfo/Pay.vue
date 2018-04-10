<template>
  <div class="pay" :class="showPay ? 'content-visible' : ''" @touchmove.prevent>
    <div class="mask" :class="showPay ? 'visible' : 'visible-none'" @click="close"></div>
    <div class="pay-content" :class="showPay ? 'content-visible' : ''">
      <div class="content" :class="getType() !== 'weixin' ? 'all-content' : ''">
        <div class="item">
          <div class="item-pay-header">
            <span>支付金额</span>
            <span class="price-pay">{{payMoney}}元<em class="pre-price">(订金)</em></span>
          </div>
        </div>
        <div class="tips">
          <span>订单有效期5分钟，请在有效期内及时付款。</span>
        </div>
        <!-- 微信支付  paytype-bottom-->
        <div class="choose-paytype" :class="getType() !== 'weixin' ? 'paytype-bottom' : ''" @click="changeType('wx')">
          <span class="wx-icon"></span>
          <div class="type-content">
            <span class="choose-title">微信支付</span>
            <span class="choose-des">推荐安装微信客户端的用户使用</span>
          </div>
          <span class="choose" :class="type === 2 ? 'select' : ''"></span>
        </div>
        <!-- 支付宝支付 -->
        <div class="choose-paytype" @click="changeType('zfb')" v-if="getType() !== 'weixin'">
          <span class="zfb-icon"></span>
          <div class="type-content">
            <span class="choose-title">支付宝支付</span>
            <span class="choose-des">推荐安装支付宝客户端的用户使用</span>
          </div>
          <span class="choose":class="type === 1 ? 'select' : ''"></span>
        </div>
      </div>
      <div class="true-pay" @click="pay">确认支付</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['showPay', 'payMoney'],
  data: () => ({
    // 选择支付类型  1、支付宝  2、微信
    type: 2
  }),
  methods: {
    close() {
      this.$emit('close')
    },
    pay() {
      // 如果是m端的微信需要传type为3
      let type = this.type
      let mode = this.getType()
      if (type === 2) {
        if (mode === 'm') {
          type = 3
        } else if (mode === 'app') {
          type = 4
        }
      }
      this.$emit('pay', type)
    },
    changeType(type) {
      if (type === 'wx') {
        this.type = 2
      } else {
        this.type = 1
      }
    }
  }
}
</script>
<style scoped>
  .pay{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translate3d(0,100%,0);
    z-index: 9;
  }
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 8;
  }
  .visible-none{
    display: none;
  }
  .visible{
    animation: .6s opacitys 0s
  }
  @keyframes opacitys {
    0% {opacity: 0}
    100% {opacity: 1}
  }
  .pay-content{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    background: #EDEDED;
    z-index: 9;
    transform: translate3d(0,100%,0);
    transition: all .6s ease;
  }
  .content-visible{
    opacity: 1;
    transform: translate3d(0,0,0)
  }
  .content{
    flex: 1;
    background: #fff;
    height: 268px;
    display: flex;
    flex-direction: column;
  }
  .all-content{
    height: 388px;
  }
  .item{
    padding: 0 32px;
    height: 78px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 2px solid #EDEDED;
  }
  .item-pay-header{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
  }
  .item-pay-header span{
    font-size: 32px;
    line-height: 80px;
    color: #333;
  }
  .item-pay-header .price-pay{
    margin-left: 8px;
    font-size: 32px;
    line-height: 80px;
    color: #FF6600;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .item-pay-header .pre-price{
    margin-left: 8px;
    font-size: 24px;
    line-height: 60px;
    color: #A1A9B2;
  }
  .tips{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px 32px 8px;
    border-radius: 20px;
    background-color: #fff9f9;
    border: solid 2px #ffd8d5;
  }
  .tips span{
    font-size: 24px;
    color: #ff6600;
  }
  .true-pay{
    height: 96px;
    line-height: 96px;
    background: #FF6600;
    text-align: center;
    color: #fff;
    font-size: 36px;
  }
  .paytype-bottom{
    border-bottom: 2px solid #EDEDED;
    height: 118px;
  }
  .choose-paytype{
    padding: 0 32px;
    height: 120px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .wx-icon{
    position: relative;
    width: 76px;
    height: 68px;
  }
  .wx-icon:before{
    position: absolute;
    top: 0;
    left: 0;
    font-family: 'carMall';
    content: "\e714";
    font-size: 68px;
    line-height: 68px;
    color: #00B700;
  }
  .zfb-icon{
    position: relative;
    width: 68px;
    height: 68px;
  }
  .zfb-icon:before{
    position: absolute;
    top: 0;
    left: 0;
    font-family: 'carMall';
    content: "\e716";
    font-size: 68px;
    line-height: 68px;
    color: #0799E2;
  }
  .type-content{
    margin-left: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .choose-title{
    font-size: 32px;
    color: #17181A;
    line-height: 48px;
  }
  .choose-des{
    font-size: 24px;
    color: #A1A9B2;
    line-height: 36px;
  }
  .choose{
    width: 48px;
    height: 48px;
    border: 2px solid #D8D8D8;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .select{
    position: relative;
    background: #FF6600;
    border: 0;
  }
  .select:before{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-family: 'carMall';
    content: "\e707";
    font-size: 24px;
    line-height: 24px;
    color: #fff;
  }
</style>
