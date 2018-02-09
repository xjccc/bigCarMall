<template>
  <div class="car-info">
    <div class="title" v-if="info.product_name">{{info.product_name}}</div>
    <div class="price">支付<span>{{info.pay_money}}</span>元抵扣<span>{{info.Deductible}}</span>元<em v-html="inventory">{{inventory}}</em>
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
  computed: {
    // 库存
    inventory() {
      if (this.info.Inventory !== 0) {
        return `(剩余<em class="left-num">${this.info.Inventory}</em>份)`
      }
      return '(卖完啦)'
    }
  }
}
</script>
<style scoped>
  .car-info{
    display: flex;
    flex-direction: column;
    padding: 24px 32px 0;
    background: #fff;
  }
  .title{
    font-weight: bold;
    font-size: 32px;
    color: #17181A;
    line-height: 48px;
    text-overflow:ellipsis;
    word-break: break-all;
    overflow:hidden;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .price{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 22px 0 14px;
    font-size: 32px;
    color: #FF6600;
    flex-wrap: wrap;
  }
  .price span{
    font-weight: bold;
    margin: 0 8px;
    font-size: 48px;
    color: #FF6600;
    line-height: 60px;
  }
  .price em{
    margin-left: 8px;
    font-size: 24px;
    color: #A1A9B2;
  }
  .price em.left-num{
    margin-left: 0;
    color: #0B0C00;
  }
  .price-tip{
    padding-bottom: 16px;
    font-size: 24px;
    color: #A1A9B2;
    line-height: 36px;
    border-bottom: 2px solid #EDEDED;
  }
  .price-tip:before{
    font-family: 'carMall';
    content: "\e6b7";
    margin-right: 8px;
    width: 24px;
    height: 24px;
    color: #CFD3D8;
  }
  .time{
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 24px;
    color: #FF6600;
  }
  .end-time{
    margin-left: 24px;
  }
</style>
