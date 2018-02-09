<template>
  <div class="share" :class="wxShow ? 'wx' : ''" @click.prevent @touchmove.prevent></div>
</template>
<script>
export default {
  props: ['wxShow'],
  data: () => ({})
}
</script>
<style scoped>
  .share{
    display: none;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.8) url(https://s.kcimg.cn/public/images/wechat-share.png) no-repeat 100% 0;
    -webkit-background-size: 410px 452px;
    background-size: 410px 452px;
  }
  .wx{
    display: block;
  }
</style>
