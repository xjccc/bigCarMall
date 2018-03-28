<template>
  <div class="dealer">
    <div class="filters" @click="filterType">
      <span>{{selectBrand}}</span>
    </div>
    <div class="only-active">
      <div class="checkbox" @click="check">
        <span class="check-icon" :class="checkInfo ? 'checked' : ''"></span>
        <span class="icon-name">只看有活动的</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['selectBrand', 'checkInfo'],
  data: () => ({}),
  methods: {
    filterType() {
      this.$emit('filterType')
    },
    check() {
      this.$emit('changeCheck', this.checkInfo ? 0 : 1)
    }
  }
}
</script>
<style scoped>
  .dealer{
    display: flex;
    flex-direction: row;
    height: 88px;
    background: #fff;
    box-shadow: 0 -2px 0 0 #F5F5F5;
  }
  .dealer .filters{
    position: relative;
    width: 300px;
    display: flex;
    align-items: center;
    padding: 24px;
    white-space: nowrap;
  }
  .dealer .filters:after{
    content: "";
    position: absolute;
    top: 24px;
    right: 0;
    width: 2px;
    height: 40px;
    background: #EDEDED;
  }
  .dealer .filters span{
    position: relative;
    display: flex;
    flex: 1;
    font-size: 28px;
    color: #5C6066;
    line-height: 40px;
  }
  .dealer .filters span:after{
    font-family: 'carMall';
    content: "\e718";
    position: absolute;
    top: 0;
    right: 0;
    font-size: 24px;
    color: #CFD3D8;
    transform: scale(.5);
  }
  .only-active{
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  .checkbox{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 32px;
  }
  .check-icon{
    position: relative;
    margin-right: 8px;
    width: 32px;
    height: 32px;
    border: 2px solid rgba(161,169,179,0.30);
    box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.20);
    border-radius: 4px;
    box-sizing: border-box;
  }
  .checked::before{
    content: "\e707";
    font-family: 'carMall';
    position: absolute;
    top: 0;
    left: 0;
    font-size: 24px;
    line-height: 28px;
    color: #5C6066;
  }
  .icon-name{
    margin-right: 24px;
    font-size: 28px;
    line-height: 28px;
    color: #A1A9B3;
  }
</style>
