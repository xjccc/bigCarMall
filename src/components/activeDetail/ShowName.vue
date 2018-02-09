<template>
  <div>
    <div class="used-brand" v-if="showNames === 'brand'">
      <span class="title">适用品牌</span>
      <div class="descript">
        <span>{{info.brandName}}</span>
      </div>
    </div>
    <div class="used-brand" v-if="showNames === 'series'">
      <span class="title">适用车系</span>
      <div class="descript">
        <span>{{info.SeriesName}}</span>
      </div>
    </div>
    <div class="used-truck" v-if="showNames === 'truck-name'">
      <span class="title">适用车型</span>
      <div class="truck-descript">
        <span>{{info.TruckProductName}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['info'],
  computed: {
    // 显示适用品牌 车型 车系
    showNames() {
      if (this.info.TruckProductName) {
        return 'truck-name'
      } else if (this.info.SeriesName) {
        return 'series'
      } else if (this.info.brandName) {
        return 'brand'
      }
      return ''
    }
  },
  data: () => ({})
}
</script>
<style scoped>
  .used-brand{
    margin-top: 16px;
    padding: 24px 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #fff;
  }
  .title{
    font-size: 40px;
    color: #17181A;
    line-height: 60px;
  }
  .descript{
    font-size: 0;
    height: 36px;
    line-height: 36px;
    color: #508DFD;
  }
  .used-truck {
    margin-top: 16px;
    padding: 24px 32px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    overflow: hidden;
  }
  .truck-descript{
    display: flex;
    margin-top: 32px;
    font-size: 0;
    color: #508DFD;
  }
  .truck-descript span{
    flex: 1;
    font-size: 24px;
    line-height: 24px;
    padding: 4px 16px;
    background: #F9FBFF;
    border: 2px solid #CADDFF;
    border-radius: 20px;
    line-height: 32px;
    word-break: break-all;
  }
  .descript span{
    display: inline-block;
    padding: 4px 16px;
    font-size: 24px;
    line-height: 24px;
    background: #F9FBFF;
    border: 2px solid #CADDFF;
    border-radius: 20px;
  }
</style>
