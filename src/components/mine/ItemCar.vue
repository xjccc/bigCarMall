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
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    background: #fff;
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
  .refund{
    opacity: 0.6;
  }
  .order-num{
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #EDEDED;
    font-size: 14px;
    color: #A1A9B2;
  }
  .item-front{
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    border-bottom: 1px solid #EDEDED;
  }
  .item-front figure{
    width: 120px;
    height: 80px;
  }
  .item-front figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .item-content{
    margin-left: 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  .title{
    font-size: 14px;
    color: #17181A;
    height: 40px;
    line-height: 20px;
    text-overflow:ellipsis;
    word-break: break-all;
    overflow:hidden;
    display:-webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp:2;
  }
  .descript{
    margin-top: 4px;
    font-size: 12px;
    color: #A1A9B2;
    line-height: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
  }
  .descript span{
    position: relative;
    width: 1px;
    height: 12px;
    margin: 0 8px;
  }
  .descript span:before{
    content: "";
    position: absolute;
    top: 1px;
    left: 0;
    height: 10px;
    width: 1px;
    background: #EDEDED;
  }
  .descript .engine{
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .price{
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .price-front{
    font-size: 12px;
    color: #FF6600;
    line-height: 20px;
  }
  .true-price{
    font-size: 14px;
    color: #FF6600;
    line-height: 20px;
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
