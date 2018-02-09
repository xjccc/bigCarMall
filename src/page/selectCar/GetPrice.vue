<template>
  <div class="get-price">
    <!-- 头部信息 -->
    <top-header :title="'获取报价'"></top-header>
    <!-- 填写内容 -->
    <div class="item-content">
      <div class="item" @click="showBrandView">
        <span>意向品牌</span>
        <span class="input" :class="brand ? 'active' : ''">{{brand ? brand : '请选择您的意向品牌'}}</span>
        <span class="arrow">&#xe70d;</span>
      </div>
      <div class="item" @click="showSeriesView">
        <span>意向车型</span>
        <span class="input" :class="carType ? 'active' : ''">{{carType ? carType : '请选择您的意向车型'}}</span>
        <span class="arrow">&#xe70d;</span>
      </div>
      <div class="item" @click="showDistrict">
        <span>提车地区</span>
        <span class="input active" v-if="cityData.city">{{cityData.province}} {{cityData.city}}</span>
        <span class="input" v-else>请选择提车地区</span>
        <span class="arrow">&#xe70d;</span>
      </div>
      <div class="item">
        <span>尊姓大名</span>
        <input type="text" maxlength="11" v-model="name" placeholder="请填写您的姓名" />
      </div>
      <div class="item">
        <span>电话号码</span>
        <input type="tel" v-model="telphone" maxlength="11" placeholder="请填写您的电话号码" />
      </div>
    </div>
    <div class="submitInfo" @click="submitInfo">提交信息</div>
    <!-- 品牌弹层 -->
    <brand-view :id="submit.brandid" :data="allBrand" :letter="allBrandLetter" :showBrand="showBrand" @pop="pop" @choose-brand="chooseBrand"></brand-view>
    <!-- 类别弹层 -->
    <series-view :id="submit.seriesid" :data="allSeries" :showSeries="showSeries"  @choose-series="chooseSeries" @pop="closeSeries"></series-view>
    <!-- 选择城市弹层 -->
    <location :locationShow="locationShow" :list="allProvinceList" :navList="provinceListLetter" :submit="submit" @chooseUsed="chooseUsed" @locationPop="locationPop" @chooseCity="chooseCity"></location>
    <!-- 错误提示 -->
    <dialog-content v-if="dialogShowToast" :info="dialogInfo"  :type="'know'" @close="closeDialog" @confirm="closeDialog"></dialog-content>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import BrandView from '@/components/selectCar/BrandView'
import SeriesView from '@/components/selectCar/SeriesView'
import Location from '@/components/Location'
import DialogContent from '@/components/Dialog'

export default {
  components: {
    TopHeader,
    BrandView,
    SeriesView,
    Location,
    DialogContent
  },
  data: () => ({
    // 显示选择地区
    locationShow: false,
    // 省份列表
    allProvinceList: [],
    // 字母
    provinceListLetter: [],
    // 城市列表
    cityList: [],
    // 所以品牌
    allBrand: [],
    // 侧边栏字母
    allBrandLetter: [],
    // 显示brand弹层
    showBrand: false,
    // 全部车型
    allSeries: [],
    // 显示车型弹层
    showSeries: false,
    // 意向品牌
    brand: '',
    // 意向车型
    carType: '',
    // 提车地区
    cityData: {
      province: '',
      city: ''
    },
    // 尊姓大名
    name: '',
    // 电话号码
    telphone: '',
    // 提交数据
    submit: {
      // 品牌id
      brandid: '',
      // 车型id
      seriesid: '',
      // 省份
      provincesn: '',
      // 城市
      citysn: ''
    },
    // 错误提示
    dialogInfo: '',
    // 显示错误提示
    dialogShowToast: false
  }),
  created() {
    // 隐藏wx分享菜单
    this.wxHideMenus()
    // 获取省市
    let provincecitylist = this.getStorage('provincecitylist')
    let provincecityletters = this.getStorage('provincecityletters')
    this.allProvinceList = provincecitylist
    this.provinceListLetter = provincecityletters
    // 获取品牌
    let brand = this.getStorage('allbrandlist')
    if (brand) {
      this.allBrand = brand
    }
    // 获取品牌侧边栏字母
    let brandletter = this.getStorage('allbrandlistletters')
    if (brandletter) {
      this.allBrandLetter = brandletter
    }
  },
  methods: {
    // 显示品牌弹层
    showBrandView() {
      this.showBrand = true
    },
    // 显示车型弹层
    showSeriesView() {
      if (!this.submit.brandid) {
        this.dialogInfo = '请选择意向品牌~'
        this.dialogShowToast = true
        return
      }
      this.getData(
        `https://dealer-api.360che.com/Dealer/getSeriesCategory.aspx?bid=${
          this.submit.brandid
        }`,
        res => {
          if (res.status === 200) {
            this.allSeries = res.data
            this.showSeries = true
          }
        }
      )
    },
    // 显示地区选择
    showDistrict() {
      this.locationShow = true
    },
    // 选择品牌
    chooseBrand(item) {
      this.showBrand = false
      this.brand = item.brandname
      this.submit.brandid = item.brandid
      // 置空选择车型
      this.carType = ''
      this.submit.seriesid = ''
    },
    // 关闭品牌弹层
    pop() {
      this.showBrand = false
    },
    // 选择车型
    chooseSeries(item) {
      this.showSeries = false
      this.carType = item.label
      this.submit.seriesid = item.value
    },
    // 关闭弹层
    closeSeries() {
      this.showSeries = false
    },
    // 选择常用地区
    chooseUsed(submit) {
      this.submit.provincesn = submit.provincesn
      this.submit.citysn = submit.citysn
      this.cityData.province = submit.provinceName
      this.cityData.city = submit.cityName
    },
    // 选择全国
    chooseAll() {
      this.submit.provincesn = ''
      this.submit.citysn = ''
      this.cityData.province = ''
      this.cityData.city = ''
    },
    chooseCity(submit) {
      this.submit.provincesn = submit.provincesn
      this.submit.citysn = submit.citysn
      this.cityData.province = submit.provinceName
      this.cityData.city = submit.cityName
    },
    // 关闭弹层
    locationPop() {
      this.locationShow = false
    },
    // 关闭错误提示
    closeDialog() {
      this.dialogShowToast = false
    },
    // 提交信息
    submitInfo() {
      // 如果没有选择品牌
      if (!this.submit.brandid) {
        this.dialogInfo = '请选择意向品牌~'
        this.dialogShowToast = true
        return
      }
      // 如果没有选择品牌
      if (!this.submit.seriesid) {
        this.dialogInfo = '请选择意向车型~'
        this.dialogShowToast = true
        return
      }
      // 如果没有填写提车地区
      if (!this.submit.citysn) {
        this.dialogInfo = '请选择提车地区~'
        this.dialogShowToast = true
        return
      }
      // 名字不能为空
      if (!this.name) {
        this.dialogInfo = '名字不能为空~'
        this.dialogShowToast = true
        return
      }
      let phone = this.telphone
      // 电话不能为空
      if (!phone) {
        this.dialogInfo = '电话不能为空~'
        this.dialogShowToast = true
        return
      }
      if (
        phone.length !== 11 ||
        !phone.match(
          /1(([38]\d)|(4[57])|(5[012356789])|(7[0135678])|(9[9]))\d{8}/
        )
      ) {
        this.dialogInfo = '请填写正确的手机号码~'
        this.dialogShowToast = true
        return
      }
      this.getData(
        `https://dealer-api.360che.com/Dealer/submitDealerClues.aspx?relname=${
          this.name
        }&tel=${this.telphone}&provincesn=${this.submit.provincesn}&citysn=${
          this.submit.citysn
        }&seriesextendid=${this.submit.seriesid}&brandid=${
          this.submit.brandid
        }&clueresource=18`,
        res => {
          if (res.data.isok === 1) {
            this.$showToast.show({
              type: 'success',
              text: '提交成功'
            })
          } else {
            this.$showToast.show({
              type: 'error',
              text: '请勿重复提交'
            })
          }
        }
      )
    }
  }
}
</script>
<style scoped>
  .get-price{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .item-content{
    padding: 0 32px;
    background: #fff;
  }
  .item{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 86px;
    border-bottom: 2px solid #EDEDED;
  }
  .item:last-child{
    height: 88px;
    border-bottom: 0;
  }
  .item span{
    font-size: 32px;
    color: #5C6066;
  }
  .item input{
    margin-left: 24px;
    flex: 1;
    color: #17181A;
  }
  .item span.input{
    margin-left: 24px;
    flex: 1;
    color: #D1D1D1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item span.active{
    color: #17181A;
  }
  .item input::-webkit-input-placeholder{
    color: #D1D1D1;
  }
  .item span.arrow{
    font-family: 'carMall';
    font-size: 24px;
    color: #CFD3D8;
  }
  .submitInfo{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 96px;
    line-height: 96px;
    text-align: center;
    background: #508DFD;
    font-size: 36px;
    color: #fff;
  }
</style>
