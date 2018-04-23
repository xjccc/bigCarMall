<template>
  <div class="item-active" @click="jumpToDetail(data.ProductId)">
    <div class="item-header">
      <span class="left">剩余<em :class="data.Inventory ? 'active' : 'zero'">{{data.Inventory}}</em>份</span>
      <!-- 超过1小时显示 -->
      <div class="cut-time" v-if="!minutes">倒计时<span>{{showDay}}</span>天<span>{{showHours}}</span>小时</div>
      <!-- 不足1小时显示 -->
      <div class="cut-time" v-else>倒计时<span>{{showHours}}</span>小时<span>{{showMinutes}}</span>分钟</div>
    </div>
    <div class="active-content" :class="!showFooter ? 'no-line' : ''">
      <figure>
        <img :src="data.MainImg" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
      </figure>
      <div class="item-content">
        <div class="title">{{data.Title}}</div>
        <div class="descript">
          <span>{{data.Brand}}</span>
        </div>
        <div class="price">
          支付<span>{{data.Margin}}</span>元抵扣<span>{{data.CouponDeductible}}</span>元
        </div>
      </div>
    </div>
    <div class="item-footer" v-if="showFooter">
      <span class="level" v-if="data.DealerLevel">{{data.DealerLevel}}</span>
      <span class="company-name">{{data.DealerName}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data: () => ({}),
  computed: {
    // 剩余不足1小时
    minutes() {
      if (this.data.TotalMinutes <= 60) {
        return true
      }
      return false
    },
    // 显示分钟
    showMinutes() {
      let m = this.data.TotalMinutes
      if (m < 10) {
        m = `0${m}`
      }
      return m
    },
    // 剩余天数
    showDay() {
      let day = Math.floor(this.data.TotalMinutes / 60 / 24)
      if (day < 10) {
        day = `0${day}`
      }
      return day
    },
    // 获取剩余小时
    showHours() {
      let hours = Math.floor(this.data.TotalMinutes / 60) - this.showDay * 24
      if (hours < 10) {
        hours = `0${hours}`
      }
      return hours
    },
    showFooter() {
      if (!this.data.DealerLevel && !this.data.DealerName) {
        return false
      }
      return true
    }
  },
  methods: {
    jumpToDetail(id) {
      this.$emit('toDetail', id)
    }
  }
}
</script>
<style scoped>
  .item-active{
    padding: 0 16px;
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    background: #fff;
  }
  .item-header{
    height: 39px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #EDEDED;
    font-size: 0;
  }
  .left{
    font-size: 14px;
    color: #A1A9B2;
    line-height: 18px;
  }
  .left .active{
    color: #0B0C00;
  }
  .left .zero{
    color: #FF6600;
  }
  .cut-time{
    font-size: 12px;
    color: #A1A9B2;
    line-height: 18px;
  }
  .cut-time span{
    margin: 0 4px;
    padding: 0 2px;
    display: inline-block;
    height: 16px;
    border-radius: 2px;
    font-size: 12px;
    color: #fff;
    line-height: 16px;
    background: #FF6600;
    text-align: center;
  }
  .active-content{
    display: flex;
    flex-direction: row;
    padding: 8px 0 7px;
    border-bottom: 1px solid #EDEDED;
  }
  .active-content figure{
    width: 120px;
    height: 80px;
  }
  .active-content figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .item-content{
    margin-left: 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    white-space: nowrap;
  }
  .no-line{
    padding: 8px;
    border-bottom: 0;
  }
  .title{
    font-size: 16px;
    color: #17181A;
    height: 24px;
    line-height: 24px;
    text-overflow:ellipsis;
    overflow: hidden;
  }
  .descript{
    font-size: 0;
    margin-top: 12px;
    height: 18px;
    line-height: 18px;
    color: #508DFD;
  }
  .descript span{
    display: inline-block;
    padding: 2px 8px;
    font-size: 12px;
    line-height: 12px;
    background: #F9FBFF;
    border: 1px solid #CADDFF;
    border-radius: 10px;
  }
  .price{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 6px;
    font-size: 12px;
    color: #FF6600;
    line-height: 20px;
  }
  .price span{
    margin: 0 4px;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
  }
  .item-footer{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
  }
  .level{
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
  .company-name{
    flex: 1;
    font-size: 14px;
    color: #17181A;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
