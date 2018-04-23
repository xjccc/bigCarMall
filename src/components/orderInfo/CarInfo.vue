<template>
  <!-- 显示车辆信息 -->
  <div class="item-select">
    <div class="item-front">
      <figure>
        <img :src="info.product_img" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
      </figure>
      <div class="item-content">
        <div class="title">{{info.product_name}}</div>
        <div class="price">
          <span class="price-front">裸车价：</span>
          <span class="true-price">{{info.VehiclePrice ? `${info.VehiclePrice}万元` : '暂无'}}</span>
        </div>
      </div>
    </div>
    <div class="item-footer" v-if="info.DealerLevel || info.dealer_name">
      <span class="level" v-if="info.DealerLevel">{{info.DealerLevel}}</span>
      <span class="company-name">{{info.dealer_name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['info'],
  data: () => ({})
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
  .item-front figure{
    width: 90px;
    height: 60px;
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
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .price-front{
    font-size: 12px;
    font-weight: bold;
    color: #17181A;
    line-height: 18px;
  }
  .true-price{
    font-size: 12px;
    font-weight: bold;
    color: #17181A;
    line-height: 18px;
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
