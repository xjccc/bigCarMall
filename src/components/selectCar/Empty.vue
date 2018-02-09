<template>
  <div class="empty" v-if="showEmpty">
    <img src="https://s.kcimg.cn/bigCarMall/image/empty.png">
    <div class="tips">
      <span>没找到您要的车</span>
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
      this.$router.push('/home/car/price')
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
    width: 400px;
    height: 300px;
  }
  .empty .tips{
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .empty span{
    font-size: 24px;
    color: #A1A9B2;
    line-height: 36px;
  }
  .get-price{
    margin-top: 32px;
    width: 186px;
    height: 66px;
    line-height: 66px;
    text-align: center;
    background: #fff;
    border: 2px solid #508DFD;
    border-radius: 8px;
    font-size: 32px;
    color: #508DFD;
  }
</style>
