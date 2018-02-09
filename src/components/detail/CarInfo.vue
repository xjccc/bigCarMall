<template>
  <div class="car-info">
    <div class="title" v-if="info.product_name">{{info.product_name}}</div>
    <div class="price">裸车价：<span>{{info.VehiclePrice ? `${info.VehiclePrice}万元` : '暂无'}}</span><em>{{inventory}}</em>
    </div>
    <span class="price-tip" v-if="info.Isextras">此价格可能包含其他费用，请与经销商确认</span>
    <span class="gift" v-if="info.Introduction">{{info.Introduction}}</span>
    <div class="item-footer" :class="info.dealerUrl ? 'dealer-shop' : ''" v-if="info.level_name || info.dealer_name" @click="jump(info.dealerUrl)">
      <span class="level" v-if="info.level_name">{{info.level_name}}</span>
      <span class="company-name">{{info.dealer_name}}</span>
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
        return `(库存：${this.info.Inventory})`
      }
      return '(卖完啦)'
    }
  },
  methods: {
    jump(url) {
      if (!url) return
      window.location.href = url
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
    font-size: 32px;
    color: #17181A;
    font-weight: bold;
    line-height: 48px;
    word-break: break-all;
    text-overflow:ellipsis;
    overflow:hidden;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .price{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 8px 0;
    font-size: 32px;
    color: #17181A;
  }
  .price span{
    font-size: 48px;
    color: #FF6600;
    line-height: 60px;
    font-weight: bold;
  }
  .price em{
    margin-left: 8px;
    font-size: 24px;
    color: #A1A9B2;
  }
  .price-tip{
    padding-bottom: 16px;
    font-size: 24px;
    color: #A1A9B2;
    line-height: 36px;
  }
  .price-tip:before{
    font-family: 'carMall';
    content: "\e6b7";
    margin-right: 8px;
    width: 24px;
    height: 24px;
    color: #CFD3D8;
  }
  .gift{
    padding: 16px 0;
    border-top: 2px solid #EDEDED;
    font-size: 24px;
    color: #FF6600;
  }
  .item-footer{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 86px;
    border-top: 2px solid #EDEDED;
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
  .dealer-shop:after{
    font-family: 'carMall';
    content: "\e70d";
    font-size: 24px;
    color: #CFD3D8;
  }
</style>
