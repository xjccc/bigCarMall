<template>
  <div class="item-car" :class="status === 'refund' ? 'refund' : ''" @click="toOrderDetail">
    <!-- 订单状态 -->
    <div class="status-img" v-if="status">
      <img :src="`https://s.kcimg.cn/bigCarMall/image/${status}.png`">
    </div>
    <span class="order-num">订单编号：{{data.order_code}}</span>
    <div class="item-front">
      <figure>
        <img :src="data.main_img" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
      </figure>
      <div class="item-content">
        <div class="title">{{data.product_name}}</div>
        <div class="descript" v-if="data.blow_down || data.engine"><em>{{data.blow_down}}</em><span v-if="data.blow_down && data.engine"></span><em class="engine">{{data.engine}}</em></div>
        <div class="price">
          <span class="price-front">裸车价：</span>
          <span class="true-price">{{data.margin}}万元</span>
        </div>
      </div>
    </div>
    <div class="item-footer" v-if="data.level_name || data.dealername">
      <span class="level">{{data.level_name}}</span>
      <span class="company-name">{{data.dealername}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    status() {
      if (this.data.status_name === '已提车') {
        return 'picked-car'
      } else if (
        this.data.status_name === '已退款' ||
        this.data.status_name === '退款中'
      ) {
        return 'refund'
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
  .item-car{
    position: relative;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    padding: 0 32px;
    background: #fff;
  }
  .status-img{
    position: absolute;
    right: 0;
    top: 0;
    width: 150px;
    height: 120px;
  }
  .status-img img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
    object-fit: cover;
  }
  .refund{
    opacity: 0.6;
  }
  .order-num{
    height: 76px;
    line-height: 76px;
    border-bottom: 2px solid #EDEDED;
    font-size: 28px;
    color: #A1A9B2;
  }
  .item-front{
    display: flex;
    flex-direction: row;
    padding: 16px 0;
    border-bottom: 2px solid #EDEDED;
  }
  .item-front figure{
    width: 240px;
    height: 160px;
  }
  .item-front figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .item-content{
    margin-left: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  .title{
    font-size: 28px;
    color: #17181A;
    height: 80px;
    line-height: 40px;
    text-overflow:ellipsis;
    word-break: break-all;
    overflow:hidden;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .descript{
    margin-top: 8px;
    font-size: 24px;
    color: #A1A9B2;
    line-height: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
  }
  .descript span{
    position: relative;
    width: 2px;
    height: 24px;
    margin: 0 16px;
  }
  .descript span:before{
    content: "";
    position: absolute;
    top: 2px;
    left: 0;
    height: 20px;
    width: 2px;
    background: #EDEDED;
  }
  .descript .engine{
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .price{
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .price-front{
    font-size: 24px;
    color: #FF6600;
    line-height: 40px;
  }
  .true-price{
    font-size: 28px;
    color: #FF6600;
    line-height: 40px;
  }
  .item-footer{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 80px;
  }
  .level{
    margin-right: 8px;
    font-size: 24px;
    line-height: 24px;
    padding: 5px 4px;
    color: #508DFD;
    background: #F9FBFF;
    border: 2px solid #CADDFF;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .company-name{
    flex: 1;
    font-size: 28px;
    color: #17181A;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
