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
    padding: 8px 16px;
    margin-top: 8px;
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .dealer-shop:after{
    font-family: 'carMall';
    content: "\e70d";
    font-size: 12px;
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
    margin-right: 4px;
    font-size: 12px;
    line-height: 12px;
    padding: 3px 2px;
    color: #508DFD;
    background: #F9FBFF;
    border: 1px solid #CADDFF;
    border-radius: 2px;
    box-sizing: border-box;
  }
  .dealer-name{
    flex: 1;
    font-size: 16px;
    color: #17181A;
    line-height: 24px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .address{
    margin-top: 4px;
    font-size: 12px;
    color: #5C6066;
    line-height: 18px;
  }
</style>
