<template>
  <div class="order-info">
    <div class="title">订单编号{{info.order_code}}</div>
    <div class="content">
      <!-- 订单状态 -->
      <div class="item-front" :class="status === 'used' || status === 'invalid' ? 'refund' : ''">
        <div class="item-content" :class="orderStatus">
          <div class="order">
            <span class="end-time">抵扣券有效期至{{info.validity_end_time}}</span>
            <span class="code">{{info.code}}</span>
          </div>
        </div>
        <div class="status-img" v-if="status">
          <img :src="`https://s.kcimg.cn/bigCarMall/image/${status}.png`">
        </div>
      </div>

      <div class="item">
        <span>支付金额</span>
        <div class="price">{{info.pay_money}}元</div>
      </div>
      <div class="item">
        <span>支付方式</span>
        <div class="pay-type">
          <span class="icon" :class="info.paytype_name !== '支付宝' ? 'wx-icon' : 'zfb-icon'"></span>
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
  computed: {
    // 优惠卷状态
    orderStatus() {
      if (this.info.is_use_code) {
        return 'order-used'
      } else if (this.info.refund_time) {
        return 'order-invalid'
      }
      return 'order-now'
    },
    // 右上角图片
    status() {
      if (this.info.is_use_code) {
        return 'used'
      } else if (this.info.refund_time) {
        return 'invalid'
      }
      return ''
    }
  },
  data: () => ({})
}
</script>
<style scoped>
  .order-info{
    padding: 0 16px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
  .title{
    font-size: 14px;
    color: #17181A;
    height: 39px;
    line-height: 39px;
    border-bottom: 1px solid #EDEDED;
  }
  .content{
    position: relative;
    padding: 8px 0;
    display: flex;
    flex-direction: column;
  }
  .status-img{
    position: absolute;
    right: 0;
    top: 0;
    width: 75px;
    height: 60px;
  }
  .status-img img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
    object-fit: cover;
  }
  .item{
    height: 30px;
    line-height: 30px;
    display: flex;
    flex-direction: row;
  }
  .item span:first-child{
    font-size: 14px;
    color: #5C6066;
  }
  .item span:last-child{
    margin-left: 8px;
    font-size: 14px;
    color: #17181A;
  }
  .item .price{
    font-size: 14px;
    color: #FF6600;
    margin-left: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .pay-type{
    margin-left: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .item .pay-type .type{
    margin-left: 4px;
  }
  .icon{
    position: relative;
    width: 20px;
    height: 20px;
  }
  .wx-icon:before{
    position: absolute;
    top: 0;
    left: 0;
    font-family: 'carMall';
    content: "\e714";
    font-size: 20px;
    line-height: 20px;
    color: #00B700;
  }
  .zfb-icon:before{
    position: absolute;
    top: 0;
    left: 0;
    font-family: 'carMall';
    content: "\e716";
    font-size: 20px;
    line-height: 20px;
    color: #0799E2;
  }
  .item-front{
    margin: 0 auto;
    padding: 8px 0;
  }
  .item-content{
    width: 288px;
    height: 98px;
  }
  .order-now{
    background-image: url('https://s.kcimg.cn/bigCarMall/image/coupon-now.png');
    background-size: cover;
  }
  .order-used{
    background-image: url('https://s.kcimg.cn/bigCarMall/image/coupon-used.png');
    background-size: cover;
  }
  .order-invalid{
    background-image: url('https://s.kcimg.cn/bigCarMall/image/coupon-invalid.png');
    background-size: cover;
  }
  .order{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .end-time{
    margin-top: 12px;
    font-size: 12px;
    color: #fff;
    line-height: 18px;
  }
  .code{
    margin-top: 10px;
    font-size: 24px;
    color: #fff;
    line-height: 30px;
  }
</style>
