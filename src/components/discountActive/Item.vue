<template>
  <div class="item" @click="jumpTo(data.linkurl)">
    <figure>
      <img :src="data.imgurl" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
    </figure>
    <div class="item-content">
      <div class="title">{{data.title}}</div>
      <div class="info">
        <span class="name">{{data.dealername}}</span>
        <span class="time">{{data.publishdate}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data: () => ({}),
  methods: {
    jumpTo(url) {
      this.$emit('toDetail', url)
    }
  }
}
</script>
<style scoped>
  .item{
    display: flex;
    flex-direction: row;
    padding: 16px 16px 15px;
    background: #fff;
    border-bottom: 1px solid #EDEDED;
  }
  .item:last-child{
    padding: 16px;
    border-bottom: 0;
  }
  .item figure{
    width: 112px;
    height: 75px;
  }
  .item figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .item-content{
    flex: 1;
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .title{
    font-size: 16px;
    color: #17181A;
    line-height: 24px;
    text-overflow:ellipsis;
    overflow:hidden;
    display:-webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp:2;
  }
  .info{
    margin-top: 9px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .name{
    width: 140px;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
    font-size: 12px;
    color: #A1A9B2;
    line-height: 18px;
  }
  .time{
    font-size: 12px;
    color: #A1A9B2;
    line-height: 18px;
  }
</style>
