<template>
  <div class="action" v-if="showAction">
    <div class="mask" :class="showAction ? 'visible' : 'visible-none'" @click="close"></div>
    <div class="action-content" :class="showAction ? 'visible' : ''">
      <div class="content">
        <span class="title">提车城市</span>
        <div class="data-content" :class="showCity ? 'province-visible' : ''">
          <div class="data-item" v-for="item in provinceData" @click="chooseProvince(item)">{{item.ProvinceName}}</div>
        </div>
        <div class="city-content" :class="showCity ? 'city-visible' : ''">
          <div class="data-item" v-for="item in cityData" @click="chooseCity(item)">{{item.CityName}}</div>
        </div>
      </div>
      <div class="close" @click="back" v-show="showCity">上一页</div>
      <div class="close" @click="close" v-show="!showCity">关闭</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['showAction', 'provinceData', 'dealerId'],
  data: () => ({
    cityData: [],
    showCity: false,
    submit: {
      provinceName: '',
      provincesn: '',
      cityName: '',
      citysn: ''
    }
  }),
  methods: {
    close() {
      this.$emit('close')
    },
    back() {
      this.showCity = false
    },
    chooseProvince(item) {
      this.showCity = true
      this.submit.provinceName = item.ProvinceName
      this.submit.provincesn = item.ProvinceSn
      this.cityData = item.CityList
    },
    chooseCity(item) {
      this.submit.cityName = item.CityName
      this.submit.citysn = item.CitySn
      this.$emit('close')
      this.$emit('chooseCity', this.submit)
    }
  }
}
</script>
<style scoped>
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
  .action-content{
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
  .visible{
    opacity: 1;
    transform: translate3d(0,0,0)
  }
  .content{
    flex: 1;
    max-height: 360px;
    background: #fff;
    display: flex;
    flex-direction: column;
  }
  .data-content{
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .city-content{
    display: none;
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .province-visible{
    display: none;
  }
  .city-visible{
    display: block;
  }
  .data-item{
    padding: 0 16px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-bottom: 1px solid #EDEDED;
  }
  .data-item:last-child{
    height: 45px;
    line-height: 45px;
    border-bottom: 0;
  }
  .title{
    height: 38px;
    line-height: 38px;
    text-align: center;
    border-bottom: 1px solid #EDEDED;
    font-size: 16px;
    color: #333;
  }
  .close{
    margin-top: 4px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: #fff;
    font-size: 16px;
    color: #17181A;
  }
</style>
