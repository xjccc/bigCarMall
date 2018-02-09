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
    padding: 0 32px;
    margin-top: 16px;
    height: 96px;
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .header-title{
    font-size: 40px;
    font-weight: bold;
    color: #17181A;
    line-height: 60px;
  }
  .more{
    width: 160px;
    text-align: right;
    font-size: 28px;
    color: #A1A9B2;
    line-height: 96px;
  }
  .more:after{
    font-family: 'carMall';
    margin-left: 8px;
    font-size: 24px;
    content: "\e70d";
    color: #CFD3D8;
  }
</style>
