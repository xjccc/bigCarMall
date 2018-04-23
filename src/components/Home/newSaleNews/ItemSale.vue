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
    padding: 0 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
  }
  .pre-type{
    width: 24px;
    height: 12px;
    line-height: 12px;
    padding: 3px 4px;
    font-size: 12px;
    border-radius: 2px;
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
    margin-left: 4px;
    font-size: 14px;
    color: #17181A;
    line-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .creat-time{
    width: 45px;
    font-size: 14px;
    color: #A1A9B2;
    line-height: 40px;
    text-align: right;
  }
</style>
