<template>
  <div class="more-detail" :class="showDetail ? 'content-visible' : ''">
    <div class="mask" :class="showDetail ? 'visible' : 'visible-none'" @click="close" @touchmove.prevent></div>
    <div class="more-detail-content" :class="showDetail ? 'content-visible' : ''">
      <div class="content">
        <span class="title">参数配置</span>
        <div class="detail-content">
          <template v-for="(item,index) in data">
            <div class="item">
              <div class="item-key">
                <span class="item-title">{{item.KeyStr}}</span>
              </div>
              <span class="item-content">{{item.ValStr}}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="close" @click="close" @touchmove.prevent>关闭</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['showDetail', 'data'],
  data: () => ({}),
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
  .more-detail{
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
  .more-detail{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translate3d(0,100%,0);
    z-index: 9;
  }
  .more-detail-content{
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
  .item{
    display: flex;
    flex-direction: row;
    min-height: 78px;
    border-top: 2px solid #EDEDED;
  }
  .item-key{
    display: flex;
    align-items: center;
    background: #FAFAFA;
    border-right: 2px solid #EDEDED;
  }
  .item-title{
    width: 170px;
    line-height: 78px;
    text-align: center;
    font-size: 28px;
    color: #17181A;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-content{
    font-size: 28px;
    line-height: 78px;
    color: #17181A;
    flex: 1;
    padding-left: 30px;
    word-break: break-all;
  }
  .detail-content{
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .detail-content>.item:first-child{
    min-height: 80px;
    line-height: 80px;
    border-top: 0;
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
