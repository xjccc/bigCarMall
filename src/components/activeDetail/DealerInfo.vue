<template>
  <div class="dealer-info" :class="info.dealerUrl ? 'dealer-shop' : ''" @click="jump(info.dealerUrl)">
    <div class="content">
      <div class="title">
        <span class="level" v-if="info.level_name">{{info.level_name}}</span>
        <span class="dealer-name">{{info.dealer_name}}</span>
      </div>
      <div class="address">地址：{{info.dealer_address}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object
    }
  },
  data: () => ({}),
  methods: {
    jump(url) {
      if (!url) return
      window.location.href = url
    }
  }
}
</script>
<style scoped>
  .dealer-info{
    padding: 16px 32px;
    margin-top: 16px;
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .dealer-shop:after{
    font-family: 'carMall';
    content: "\e70d";
    font-size: 24px;
    color: #CFD3D8;
  }
  .content{
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .title{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .level{
    margin-right: 8px;
    font-size: 24px;
    line-height: 24px;
    padding: 5px 4px;
    color: #508DFD;
    background: #F9FBFF;
    border: 2px solid #CADDFF;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .dealer-name{
    flex: 1;
    font-size: 32px;
    color: #17181A;
    line-height: 48px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .address{
    margin-top: 8px;
    font-size: 24px;
    color: #5C6066;
    line-height: 36px;
  }
</style>
