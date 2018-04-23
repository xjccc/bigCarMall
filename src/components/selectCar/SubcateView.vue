<template>
  <div :class="['subcategory', showSubcate ? 'visible' : '']">
    <div class="header">
      <span class="back" @click="pop">&#xe711;</span> 选择类别
    </div>
    <div class="content">
      <div class="sub-list">
        <div class="list-item" :class="item.subcategoryid === id ? 'activeSelect' : ''" v-for="item in data" @click="chooseSubcate(item)">
          {{item.subcategoryname}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['showSubcate', 'data', 'id'],
  data: () => ({}),
  methods: {
    // 关闭弹层
    pop() {
      this.$emit('pop')
    },
    // 选择子类
    chooseSubcate(item) {
      this.$emit('choose-subcate', item)
    }
  }
}
</script>
<style scoped>
  .subcategory{
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
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,0.06), 0 -1px 0 0 #F5F5F5;
  }
  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 44px;
    color: #17181A;
    line-height: 44px;
    font-family: 'carMall'
  }
  .content{
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .list-item{
    margin-left: 16px;
    height: 43px;
    line-height: 43px;
    border-bottom: 1px solid #EDEDED;
    font-size: 14px;
    color: #17181A;
  }

  .list-item:last-child{
    height: 44px;
    line-height: 44px;
    border-bottom: none;
  }

  .activeSelect{
    color: #09BB07;
  }
</style>
