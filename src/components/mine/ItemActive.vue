<template>
  <div class="item-active" @click="toOrderDetail">
    <!-- 订单状态 -->
    <div class="status-img" v-if="status">
      <img :src="`https://s.kcimg.cn/bigCarMall/image/${status}.png`">
    </div>
    <span class="order-num">订单编号：{{data.order_code}}</span>
    <div class="item-front" :class="status === 'used' || status === 'invalid' ? 'refund' : ''">
      <div class="item-content" :class="orderStatus">
        <div class="order">
          <span class="end-time">抵扣券有效期至{{data.valid_time}}</span>
          <span class="code">{{data.verification_code}}</span>
        </div>
      </div>
    </div>
    <div class="item-footer" v-if="data.level_name || data.dealername">
      <span class="level" v-if="data.level_name">{{data.level_name}}</span>
      <span class="company-name">{{data.dealername}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    // 优惠卷状态
    orderStatus() {
      if (this.data.status_name === '已使用') {
        return 'order-used'
      } else if (
        this.data.status_name === '已失效' ||
        this.data.status_name === '已退款' ||
        this.data.status_name === '退款中'
      ) {
        return 'order-invalid'
      }
      return 'order-now'
    },
    // 右上角图片
    status() {
      if (this.data.status_name === '已使用') {
        return 'used'
      } else if (
        this.data.status_name === '已失效' ||
        this.data.status_name === '已退款' ||
        this.data.status_name === '退款中'
      ) {
        return 'invalid'
      }
      return ''
    }
  },
  data: () => ({}),
  methods: {
    toOrderDetail() {
      this.$emit('toOrderDetail')
    }
  }
}
</script>
<style scoped>
  .item-active{
    position: relative;
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    background: #fff;
  }
  .refund{
    background: #fff;
    opacity: 0.6;
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
  .order-num{
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #EDEDED;
    font-size: 14px;
    color: #A1A9B2;
  }
  .item-front{
    margin: 0 auto;
    padding: 8px 0;
    border-bottom: 1px solid #EDEDED;
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
  .item-footer{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
  }
  .level{
    margin-right: 4px;
    font-size: 12px;
    line-height: 12px;
    padding: 3px 2px;
    color: #508DFD;
    background: #F9FBFF;
    border: 1px solid #CADDFF;
    border-radius: 2px;
    box-sizing: border-box;
  }
  .company-name{
    flex: 1;
    font-size: 14px;
    color: #17181A;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
