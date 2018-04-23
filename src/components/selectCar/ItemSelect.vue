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
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    background: #fff;
  }
  .item-front{
    display: flex;
    flex-direction: row;
    padding: 16px 0 7px;
    border-bottom: 1px solid #EDEDED;
  }
  .item-front-no-line{
    padding: 16px 0 8px;
    border-bottom: 0;
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
    word-break: break-all;
    text-overflow:ellipsis;
    overflow:hidden;
    display:-webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp:2;
  }
  .descript{
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .descript span{
    white-space: nowrap;
    font-size: 12px;
    color: #A1A9B2;
    line-height: 12px;
  }
  .descript .engine{
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .descript em{
    position: relative;
    margin: 0 8px;
    width: 1px;
    height: 10px;
  }
  .descript em:before{
    position: absolute;
    content: "";
    width: 1px;
    height: 10px;
    top: 0;
    left: 0;
    background: #A1A9B2;
  }
  .price{
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
  }
  .price-front{
    font-size: 12px;
    color: #FF6600;
    line-height: 20px;
  }
  .true-price{
    font-size: 14px;
    font-weight: bold;
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
