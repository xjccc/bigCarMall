<template>
  <div class="item-dealer" @click="jumpUrl(item.pcurl)">
    <figure>
      <img :src="item.brandlogoimgurl" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
    </figure>
    <div class="item-content">
      <div class="title">
        <span class="promotions" v-if="item.promotions">{{item.promotions}}</span>
        <span class="name">{{item.name}}</span>
      </div>
      <div class="label">
        <span class="level" v-if="item.dealerlevelstr">{{item.dealerlevelstr}}</span>
        <!-- 1、售全国  3售多市  4售本省 -->
        <span class="ragion-type" v-if="item.SalestRegionType">{{regionType}}</span>
        <span class="years" v-if="item.years">{{item.years}}</span>
      </div>
      <span class="address">地址：{{item.address}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['item'],
  computed: {
    regionType() {
      if (this.item.SalestRegionType === 1) {
        return '售全国'
      } else if (this.item.SalestRegionType === 3) {
        return '售多市'
      } else if (this.item.SalestRegionType === 4) {
        return '售本省'
      }
      return ''
    }
  },
  data: () => ({}),
  methods: {
    jumpUrl(url) {
      this.$emit('toDetail', url)
    }
  }
}
</script>
<style scoped>
  .item-dealer{
    padding: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #EDEDED;
  }
  .item-dealer figure{
    width: 112px;
    height: 75px;
  }
  .item-dealer figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .item-content{
    margin-left: 8px;
    flex: 1;
    height: 75px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  .title{
    height: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .name{
    flex: 1;
    font-size: 16px;
    color: #17181A;
    line-height: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .promotions{
    margin-right: 4px;
    padding: 0 4px;
    line-height: 24px;
    background: #FF4B57;
    color: #fff;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .label{
    margin-top: 4px;
    display: flex;
    flex-direction: row;
  }
  .level, .ragion-type, .years{
    margin-right: 4px;
    font-size: 12px;
    line-height: 12px;
    padding: 3px 2px;
    color: #508DFD;
    background: #F9FBFF;
    border: 1px solid #CADDFF;
    border-radius: 2px;
    box-sizing: border-box;
  }
  .address{
    margin-top: 11px;
    font-size: 12px;
    color: #5C6066;
    line-height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
