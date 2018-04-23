<template>
  <div class="share" :class="showShare ? 'content-visible' : ''" @touchmove.prevent>
    <div class="mask" :class="showShare ? 'visible' : 'visible-none'" @click="cancle"></div>
    <div class="share-content" :class="showShare ? 'content-visible' : ''">
      <div class="content">
        <div class="share-friend" @click="shareFriend">
          <span class="icon friend-icon"></span>
          <span>微信好友</span>
        </div>
        <div class="share-circle" @click="shareCircle">
          <span class="icon circle-icon"></span>
          <span>朋友圈</span>
        </div>
      </div>
      <div class="cancle-share" @click="cancle">取消分享</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['showShare'],
  data: () => ({}),
  methods: {
    cancle() {
      this.$emit('cancle')
    },
    shareFriend() {
      this.$emit('shareFriend')
    },
    shareCircle() {
      this.$emit('shareCircle')
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
  .share-content{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
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
    background: #fff;
    height: 126px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .share-friend,.share-circle{
    font-size: 14px;
    color: #A1A9B2;
    line-height: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .share-friend{
    margin-right: 27px;
  }
  .share-circle{
    margin-left: 27px;
  }
  .icon{
    margin-bottom: 7px;
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #4DAE46;
  }
  .circle-icon{
    background: #66D020;
  }
  .icon:before{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-family: 'carMall';
    content: "\e600";
    font-size: 24px;
    color: #fff;
  }
  .friend-icon:before{
    content: "\e600";
  }
  .circle-icon:before{
    content: "\e70f";
  }
  .cancle-share{
    margin-top: 4px;
    font-size: 16px;
    color: #17181A;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: #fff;
  }
</style>
