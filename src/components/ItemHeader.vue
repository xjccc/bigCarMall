<template>
  <div class="header">
    <span class="header-title">{{title}}</span>
    <span class="more" @click="more">更多</span>
  </div>
</template>
<script>
export default {
  props: ['title'],
  data: () => ({}),
  methods: {
    more() {
      this.$emit('more')
    }
  }
}
</script>
<style scoped>
  .header{
    padding: 0 16px;
    margin-top: 8px;
    height: 48px;
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .header-title{
    font-size: 20px;
    font-weight: bold;
    color: #17181A;
    line-height: 30px;
  }
  .more{
    width: 80px;
    text-align: right;
    font-size: 14px;
    color: #A1A9B2;
    line-height: 48px;
  }
  .more:after{
    font-family: 'carMall';
    margin-left: 4px;
    font-size: 12px;
    content: "\e70d";
    color: #CFD3D8;
  }
</style>
