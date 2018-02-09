<template>
  <div :class="['price', showPrice ? 'visible' : '']">
    <div class="header">
      <span class="back" @click="pop">&#xe711;</span> 选择类别
    </div>
    <div class="content">
      <div class="price-list">
        <div class="list-item" :class="item.priceVal === val ? 'activeSelect' : ''" v-for="item in data" @click="choosePrice(item)">
          {{item.showStr}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['showPrice', 'data', 'val'],
  data: () => ({}),
  methods: {
    // 关闭弹层
    pop() {
      this.$emit('pop')
    },
    // 选择子类
    choosePrice(item) {
      this.$emit('choose-price', item)
    }
  }
}
</script>
<style scoped>
  .price{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    transform: translate3d(100%, 0, 0);
    transition: all .3s ease;
    z-index: 10;
  }
  .visible {
    transform: translate3d(0, 0, 0);
  }
  .header {
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 36px;
    box-shadow: 0 6px 8px 0 rgba(0,0,0,0.06), 0 -2px 0 0 #F5F5F5;
  }
  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 120px;
    height: 88px;
    color: #17181A;
    line-height: 88px;
    font-family: 'carMall'
  }
  .content{
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .activeSelect{
    color: #09BB07;
  }
  .list-item{
    margin-left: 32px;
    height: 86px;
    line-height: 86px;
    border-bottom: 2px solid #EDEDED;
    font-size: 28px;
    color: #17181A;
  }
  .list-item:last-child{
    height: 88px;
    line-height: 88px;
    border-bottom: none;
  }
</style>
