<template>
  <div class="item-quoted" @click="toDetail(item.ProductId)">
    <figure>
      <img :src="item.MainImg" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
    </figure>
    <div class="descripe">
      <span class="detail">{{item.Title}}</span>
      <span class="price">{{item.VehiclePrice}}万元</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['item'],
  data: () => ({}),
  methods: {
    toDetail(id) {
      this.$router.push({ path: `/dacheshi/carDetail/${id}` })
    }
  }
}
</script>
<style scoped>
  .item-quoted{
    position: relative;
    margin-bottom: 16px;
    height: 180px;
    width: calc(50vw - 20px);
    display: flex;
    flex-direction: column;
  }
  .item-quoted:nth-child(2n-1){
    margin-right: 4px;
  }
  .item-quoted:nth-child(2n){
    margin-left: 4px;
  }
  .item-quoted figure{
    width: 100%;
    height: 110px;
  }
  .item-quoted figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .descripe{
    flex: 1;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .detail{
    font-size: 14px;
    color: #17181A;
    line-height: 20px;
    text-overflow:ellipsis;
    overflow:hidden;
    word-break: break-all;
    display:-webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp:2;
  }
  .price{
    margin-top: 2px;
    font-size: 14px;
    color: #FF6600;
    line-height: 20px;
    font-weight: bold;
  }
</style>
