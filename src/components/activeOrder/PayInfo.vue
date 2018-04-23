<template>
  <div class="car-info">
    <div class="title" v-if="info.product_name">{{info.product_name}}</div>
    <div class="price">{{info.coupon_introduction}}</div>
    <span class="price-tip" v-if="info.validity_end_time">抵扣券有效期至{{info.validity_end_time}}</span>
    <span class="price-tip" v-else>自下单日期开始计算60天内有效</span>
    <div class="time">
      <span class="start-time">开始时间：{{info.product_onsale_time}}</span>
      <span class="end-time">结束时间：{{info.product_end_time}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object
    }
  },
  data: () => ({})
}
</script>
<style scoped>
  .car-info{
    display: flex;
    flex-direction: column;
    padding: 12px 16px 0;
    background: #fff;
  }
  .title{
    font-size: 14px;
    color: #17181A;
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
  .price{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 0;
    font-size: 14px;
    color: #FF6600;
  }
  .price-tip{
    padding-bottom: 8px;
    font-size: 12px;
    color: #A1A9B2;
    line-height: 18px;
    border-bottom: 1px solid #EDEDED;
  }
  .price-tip:before{
    font-family: 'carMall';
    content: "\e6b7";
    margin-right: 4px;
    width: 12px;
    height: 12px;
    color: #CFD3D8;
  }
  .time{
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    color: #A1A9B2;;
  }
  .end-time{
    margin-left: 12px;
  }
</style>
