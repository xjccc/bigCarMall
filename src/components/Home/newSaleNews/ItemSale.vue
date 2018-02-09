<template>
  <div class="item-news" @click="jumpTo">
    <span :class="['pre-type', type]">{{item.articletypename}}</span>
    <span class="news-title">{{item.title}}</span>
    <span class="creat-time">{{item.publishshortdate}}</span>
  </div>
</template>
<script>
export default {
  props: ['item'],
  computed: {
    type() {
      if (this.item.type === '促销') {
        return 'type-news'
      }
      return 'type-discount'
    }
  },
  data: () => ({}),
  methods: {
    jumpTo() {
      window.location.href = this.item.linkurl
    }
  }
}
</script>
<style scoped>
  .item-news{
    padding: 0 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 80px;
  }
  .pre-type{
    width: 48px;
    height: 24px;
    line-height: 24px;
    padding: 6px 8px;
    font-size: 24px;
    border-radius: 4px;
    color: #fff;
  }
  .type-discount{
    background: #FF8600;
  }
  .type-news{
    background: #508DFD;
  }
  .news-title{
    flex: 1;
    margin-left: 8px;
    font-size: 28px;
    color: #17181A;
    line-height: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .creat-time{
    width: 90px;
    font-size: 28px;
    color: #A1A9B2;
    line-height: 80px;
    text-align: right;
  }
</style>
