<template>
  <div class="share" @touchmove.prevent>
    <div class="mask" :class="mShow ? '' : 'visible-none'" @click="cancle"></div>
    <div class="share-tips">
      <p class="tips">请点击下方的分享图标</p>
      <p class="tips">分享到微信<span class="icon wx-icon"></span></p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['mShow'],
  data: () => ({}),
  methods: {
    cancle() {
      this.$emit('cancle')
    }
  }
}
</script>
<style scoped>
  .share{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
  }
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 8;
  }
  .visible-none{
    display: none;
  }
  .share-tips{
    position: absolute;
    bottom: 17px;
    left: 50%;
    padding: 20px;
    width: 220px;
    margin-left: -110px;
    background: #fff;
    box-sizing: border-box;
    border-radius: 8px;
    z-index: 9;
  }
  .tips{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18px;
    line-height: 30px;
  }
  .icon{
    display: inline-block;
    position: relative;
    width: 27px;
    height: 27px;
    line-height: 27px;
    margin-left: 10px;
    background: #00B700;
    border-radius: 4px;
  }
  .wx-icon:before{
    position: absolute;
    top: 0;
    left: 3px;
    font-family: 'carMall';
    content: "\e600";
    font-size: 24px;
    line-height: 27px;
    color: #fff;
  }
</style>
