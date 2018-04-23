<template>
  <div class="select-car">
    <div class="filters" @click="filterType('brand')">
      <span>品牌</span>
    </div>
    <div class="filters" @click="filterType('subcategory')">
      <span>类别</span>
    </div>
    <div class="filters" @click="filterType('price')">
      <span>价格</span>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  methods: {
    filterType(type) {
      this.$emit('filter', type)
    }
  }
}
</script>
<style scoped>
  .select-car{
    display: flex;
    flex-direction: row;
    height: 44px;
    background: #fff;
    box-shadow: 0 -1px 0 0 #F5F5F5;
  }
  .select-car .filters{
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 12px;
  }
  .select-car .filters:after{
    content: "";
    position: absolute;
    top: 12px;
    right: 0;
    width: 1px;
    height: 20px;
    background: #EDEDED;
  }
  .select-car .filters:last-child:after{
    width: 0;
  }
  .select-car .filters span{
    position: relative;
    display: flex;
    flex: 1;
    font-size: 14px;
    color: #5C6066;
    line-height: 20px;
  }
  .select-car .filters span:after{
    font-family: 'carMall';
    content: "\e718";
    position: absolute;
    top: 0;
    right: 0;
    font-size: 12px;
    color: #CFD3D8;
    transform: scale(.5);
  }
</style>
