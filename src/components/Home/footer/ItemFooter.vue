<template>
  <div class="item-footer">
    <figure :class="`figure-${item.id}`">
      <img :src="item.img" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
    </figure>
    <span>{{item.name}}</span>
  </div>
</template>
<script>
export default {
  props: ['item']
}
</script>
<style scoped>
  .item-footer{
    height: 170px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .item-footer .figure-car{
    width: 70px;
    height: 46px;
  }
  .item-footer .figure-pay{
    width: 52px;
    height: 60px;
  }
  .item-footer .figure-shop{
    width: 60px;
    height: 60px;
  }
  .item-footer .figure-price{
    width: 52px;
    height: 60px;
  }
  .item-footer figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .item-footer span{
    margin-top: 8px;
    font-size: 24px;
    color: #A1A9B2;
    line-height: 40px;
  }
</style>
