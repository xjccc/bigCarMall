<template>
  <div class="car-info">
    <div class="title" v-if="info.product_name">{{info.product_name}}</div>
    <div class="price">支付<span>{{info.pay_money}}</span>元抵扣<span>{{info.Deductible}}</span>元
    </div>
    <span class="price-tip">自下单日期开始计算60天内有效</span>
    <div class="time">
      <span class="start-time">开始时间：{{info.OnSaleTime}}</span>
      <span class="end-time">结束时间：{{info.EndTime}}</span>
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
  .price span{
    margin: 0 4px;
    font-size: 16px;
    color: #FF6600;
    line-height: 20px;
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
