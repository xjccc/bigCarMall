<template>
  <div class="item-select" @click="toDetail(data.ProductId)">
    <div :class="['item-front', !showFooter ? 'item-front-no-line' : '']">
      <figure>
        <img :src="data.MainImg" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
      </figure>
      <div class="item-content">
        <div class="title">{{data.Title}}</div>
        <div class="descript" v-if="data.Blowdown"><span>{{data.Blowdown}}</span><em v-if="data.Blowdown && data.Engine"></em><span class="engine">{{data.Engine}}</span></div>
        <div class="price">
          <span class="price-front">裸车价：</span>
          <span class="true-price">{{data.VehiclePrice}}万元</span>
        </div>
      </div>
    </div>
    <div class="item-footer" v-if="showFooter">
      <span class="level" v-if="data.DealerLevel">{{data.DealerLevel}}</span>
      <span class="company-name">{{data.DealerName}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    showFooter() {
      if (!this.data.DealerLevel && !this.data.DealerName) {
        return false
      }
      return true
    }
  },
  data: () => ({}),
  methods: {
    toDetail(ProductId) {
      this.$emit('toDetail', ProductId)
    }
  }
}
</script>
<style scoped>
  .item-select{
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    padding: 0 32px;
    background: #fff;
  }
  .item-front{
    display: flex;
    flex-direction: row;
    padding: 32px 0 14px;
    border-bottom: 2px solid #EDEDED;
  }
  .item-front-no-line{
    padding: 32px 0 16px;
    border-bottom: 0;
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
    word-break: break-all;
    text-overflow:ellipsis;
    overflow:hidden;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .descript{
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .descript span{
    white-space: nowrap;
    font-size: 24px;
    color: #A1A9B2;
    line-height: 24px;
  }
  .descript .engine{
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .descript em{
    position: relative;
    margin: 0 16px;
    width: 2px;
    height: 20px;
  }
  .descript em:before{
    position: absolute;
    content: "";
    width: 2px;
    height: 20px;
    top: 0;
    left: 0;
    background: #A1A9B2;
  }
  .price{
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
  }
  .price-front{
    font-size: 24px;
    color: #FF6600;
    line-height: 40px;
  }
  .true-price{
    font-size: 28px;
    font-weight: bold;
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
