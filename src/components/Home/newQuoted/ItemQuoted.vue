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
      this.$router.push({ path: `/home/carDetail/${id}` })
    }
  }
}
</script>
<style scoped>
  .item-quoted{
    margin-bottom: 32px;
    width: 330px;
    height: 360px;
    display: flex;
    flex-direction: column;
  }
  .item-quoted figure{
    width: 330px;
    height: 220px;
  }
  .item-quoted figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .descripe{
    flex: 1;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .detail{
    font-size: 28px;
    color: #17181A;
    line-height: 40px;
    text-overflow:ellipsis;
    overflow:hidden;
    word-break: break-all;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .price{
    margin-top: 4px;
    font-size: 28px;
    color: #FF6600;
    line-height: 40px;
    font-weight: bold;
  }
</style>
