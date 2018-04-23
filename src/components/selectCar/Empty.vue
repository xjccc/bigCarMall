<template>
  <div class="empty" v-if="showEmpty">
    <img src="https://s.kcimg.cn/bigCarMall/image/empty.png">
    <div class="tips">
      <span v-if="$route.name === 'Active'">经销商暂时未发布抵扣券</span>
      <span v-else>没找到您要的车</span>
      <span>留下您的意向信息，会有经销商与您联系哦～</span>
    </div>
    <div class="get-price" @click="jumpToGetPrice">获取报价</div>
  </div>
</template>
<script>
export default {
  props: ['showEmpty'],
  data: () => ({}),
  methods: {
    jumpToGetPrice() {
      this.$router.push('/dacheshi/car/price')
    }
  }
}
</script>
<style scoped>
  .empty{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .empty img{
    width: 200px;
    height: 150px;
  }
  .empty .tips{
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .empty span{
    font-size: 12px;
    color: #A1A9B2;
    line-height: 18px;
  }
  .get-price{
    margin-top: 16px;
    width: 93px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    background: #fff;
    border: 1px solid #508DFD;
    border-radius: 4px;
    font-size: 16px;
    color: #508DFD;
  }
</style>
