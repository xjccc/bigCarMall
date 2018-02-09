<template>
  <div class="config">
    <span class="config-title">参数配置</span>
    <template v-for="(item,index) in data">
      <div class="item" v-if="index < 6">
        <div class="item-key">
          <span class="item-title">{{item.KeyStr}}</span>
        </div>
        <span class="item-content">{{item.ValStr}}</span>
      </div>
    </template>
    <div class="show-more" v-if="show" @click="showMoreDetail">查看详细参数配置</div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    show() {
      if (this.data.length > 6) {
        return true
      }
      return false
    }
  },
  data: () => ({}),
  methods: {
    showMoreDetail() {
      this.$emit('showMoreDetail')
    }
  }
}
</script>
<style scoped>
  .config{
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    background: #fff;
  }
  .config-title{
    padding-left: 32px;
    height: 110px;
    line-height: 110px;
    font-size: 40px;
    font-weight: bold;
    color: #17181A;
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
    flex: 1;
    font-size: 28px;
    line-height: 78px;
    color: #17181A;
    padding-left: 30px;
    word-break: break-all;
  }
  .show-more{
    height: 78px;
    line-height: 78px;
    border-top: 2px solid #EDEDED;
    text-align: center;
    font-size: 28px;
    color: #A1A9B2;
  }
  .show-more:after{
    margin-left: 8px;
    font-family: 'carMall';
    content: "\e70d";
  }
</style>
