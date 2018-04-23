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
    height: 85px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .item-footer .figure-car{
    width: 35px;
    height: 23px;
  }
  .item-footer .figure-pay{
    width: 26px;
    height: 30px;
  }
  .item-footer .figure-shop{
    width: 30px;
    height: 30px;
  }
  .item-footer .figure-price{
    width: 26px;
    height: 30px;
  }
  .item-footer figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .item-footer span{
    margin-top: 4px;
    font-size: 12px;
    color: #A1A9B2;
    line-height: 20px;
  }
</style>
