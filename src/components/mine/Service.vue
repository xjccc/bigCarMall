<template>
  <div class="service"  :class="showService ? 'content-visible' : ''">
    <div class="mask" :class="showService ? 'visible' : 'visible-none'" @click="close" @touchmove.prevent></div>
    <div class="service-content" :class="showService ? 'content-visible' : ''">
      <div class="content">
        <span class="title">大车市用户协议</span>
        <span class="details" v-html="content"></span>
      </div>
      <div class="close" @click="close">关闭</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['showService'],
  data: () => ({
    content:
      '《腾讯游戏许可及服务协议》（以下简称“本协议”）由您与腾讯游戏服务提供方共同缔结，本协议具有合同效力。请您务必审慎阅读并同意该条款的合法性及有效性。</br>1.2 游戏规则：指腾讯游戏服务提供方不时发布并修订的关于腾讯游戏的用户守则、玩家条例、游戏公告、提示及通知等内容。</br>1.3 腾讯游戏服务提供方：指向您提供腾讯游戏及其服务的深圳市腾讯计算机系统有限公司，在本协议中简称为“腾讯”。</br>1.4 腾讯游戏：指由腾讯负责运营的游戏的统称，</br>包括计算机客户端游戏、网页游戏、HTML5游戏（H5游戏）、移动终端游戏、电视端游戏以及其他形式的游戏；</br>腾讯游戏可能以软件形式提供，这种情况下，腾讯游戏还包括该相关软件及相关文档。'
  }),
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
  .service{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translate3d(0,100%,0);
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
  .visible{
    animation: .6s opacitys 0s
  }
  @keyframes opacitys {
    0% {opacity: 0}
    100% {opacity: 1}
  }

  .service-content{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    display: flex;
    flex-direction: column;
    background: #EDEDED;
    z-index: 9;
    transform: translate3d(0,100%,0);
    transition: all .6s ease;
  }
  .content-visible{
    opacity: 1;
    transform: translate3d(0,0,0)
  }
  .content{
    flex: 1;
    height: 720px;
    background: #fff;
    display: flex;
    flex-direction: column;
  }
  .title{
    height: 76px;
    line-height: 76px;
    text-align: center;
    border-bottom: 2px solid #EDEDED;
    font-size: 32px;
    color: #333;
  }
  .details{
    padding: 24px 32px;
    flex: 1;
    font-size: 28px;
    color: #5C6066;
    line-height: 40px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .close{
    margin-top: 8px;
    height: 96px;
    line-height: 96px;
    text-align: center;
    background: #fff;
    font-size: 32px;
    color: #17181A;
  }
</style>
