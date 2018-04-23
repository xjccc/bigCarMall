<template>
  <div class="active">
    <top-header :type="'location'" :title="'抵扣券'" :data="cityData" @location="showSelectLocation"></top-header>
    <!-- 筛选头部 -->
    <filter-header @showBrand="showBrandView" :title="orderby" @selectType="selectType" :brandName="brand"></filter-header>
    <!-- 内容数据 -->
    <div class="content" @scroll="loadMore" ref="content">
      <template v-for="item in activeData">
        <item-active :data="item" @toDetail="toDetail"></item-active>
      </template>
      <!-- 加载loading -->
      <div class="loading-more" v-show="loadingMore">
        <v-loading></v-loading>
      </div>
      <div class="no-loading-more" v-show="noMore">
        ———— 我是有底线的~ ————
      </div>
      <!-- 显示筛选为空 -->
      <empty :showEmpty="showEmpty"></empty>
    </div>
    <!-- 页面loading -->
    <div class="loading" v-if="isLoading">
      <v-loading></v-loading>
    </div>
    <!-- 品牌弹层 -->
    <brand-view :id="submit.brandid" :data="allBrand" :letter="allBrandLetter" :showBrand="showBrand" @pop="pop" @chooseAll="chooseAllBrand" @choose-brand="chooseBrand"></brand-view>
    <!-- 选择城市弹层 -->
    <location :locationShow="locationShow" :list="allProvinceList" :navList="provinceListLetter" :submit="submit" @chooseUsed="chooseUsed" @chooseAll="chooseAll" @locationPop="locationPop" @chooseCity="chooseCity"></location>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import FilterHeader from '@/components/active/FilterHeader'
import ItemActive from '@/components/active/ItemActive'
import BrandView from '@/components/selectCar/BrandView'
import Location from '@/components/Location'
import Empty from '@/components/selectCar/Empty'
let flag = false

export default {
  components: {
    TopHeader,
    FilterHeader,
    BrandView,
    Location,
    ItemActive,
    Empty
  },
  data: () => ({
    // 页面loading
    isLoading: true,
    // 1、最新发布 2、优惠最多 3、即将结束
    orderby: '1',
    // 地区列表
    allProvinceList: [],
    // 地区侧边栏字母
    provinceListLetter: [],
    // 显示地区弹层
    locationShow: false,
    // 选择地区
    cityData: {
      province: '',
      city: ''
    },
    // 所有品牌
    allBrand: [],
    // 侧边栏字母
    allBrandLetter: [],
    // 显示brand弹层
    showBrand: false,
    // 意向品牌
    brand: '',
    // 提交数据
    submit: {
      // 品牌id
      brandid: '',
      // 省份
      provincesn: '',
      // 城市
      citysn: ''
    },
    // 加载loading
    loadingMore: false,
    // 没有更多
    noMore: false,
    // 页数
    page: 1,
    // 条数
    size: 10,
    // 活动列表数据
    activeData: [],
    // 显示筛选为空
    showEmpty: false,
    // 跳转存储的信息
    activeInfo: {
      top: 0,
      page: 1,
      orderby: '',
      cityData: {},
      submit: {},
      brand: ''
    }
  }),
  created() {
    // 获取home选择的省市
    let city = this.getStorage('bigmallChooseCity')
    if (city) {
      this.submit.provincesn = city.provincesn
      this.submit.citysn = city.citysn
      this.cityData.province = city.provinceName
      this.cityData.city = city.cityName
    }
    // 获取省市
    let provincecitylist = this.getStorage('provincecitylist')
    let provincecityletters = this.getStorage('provincecityletters')
    this.allProvinceList = provincecitylist
    this.provinceListLetter = provincecityletters
    // 获取品牌
    let brand = this.getStorage('allbrandlist')
    this.allBrand = brand
    // 获取品牌侧边栏字母
    let brandletter = this.getStorage('allbrandlistletters')
    this.allBrandLetter = brandletter

    // app传title
    this.callNativeMethod('onChangeWebTitle', {
      changeWebTitle: '抵扣券'
    })
    this.callNativeMethod('onShowLocationInfo', {
      location: city && city.cityName ? city.cityName : '全国',
      url:
        'https://dealerm.360che.com/dacheshitest/dist/index.htm#/dacheshi/app/location'
    })
    // 不显示分享按钮
    this.callNativeMethod('onShowShareButton', {
      isShow: false
    })
  },
  mounted() {
    // 设置标题头
    document.title = `【${
      this.brand ? this.brand : '不限品牌'
    }折扣卷】${new Date().getFullYear()}${
      this.cityData.city ? this.cityData.city : '全国'
    }/促销价格_手机卡车之家大车市`
    // app回调
    this.connectWebViewJavascriptBridge(bridge => {
      bridge.registerHandler(
        'onLocationResultCallBack',
        (data, responseCallback) => {
          if (data) {
            // 获取选择地区缓存
            let city = this.getStorage('bigmallChooseCity')
            if (city) {
              this.submit.provincesn = city.provincesn
              this.submit.citysn = city.citysn
              this.cityData.province = city.provinceName
              this.cityData.city = city.cityName
            } else {
              this.submit.provincesn = ''
              this.submit.citysn = ''
            }
            this.resetFetch()
          }
        }
      )
    })
  },
  methods: {
    // 请求数据
    fetch() {
      this.ajax(
        `ShopProduct/GetShopSaleProduct.aspx?type=2&brand=${
          this.submit.brandid
        }&currentpage=${this.page}&pagesize=${this.size}&orderby=${
          this.orderby
        }&provincesn=${this.submit.provincesn}&citysn=${this.submit.citysn}`,
        res => {
          if (res.data.status === 1) {
            if (this.page === 1 && !res.data.list_date.length) {
              this.showEmpty = true
              flag = true
              this.noMore = false
            }
            if (this.page === 1 && res.data.list_date.length) {
              this.showEmpty = false
            }
            if (this.page === 1) {
              this.activeData = res.data.list_date
            } else {
              this.activeData = this.activeData.concat(res.data.list_date)
              this.$nextTick(() => {
                flag = false
                this.loadingMore = false
                this.noMore = false
                if (!res.data.list_date.length) {
                  flag = true
                  this.noMore = true
                }
              })
            }
          }
          // 关闭loading
          this.isLoading = false
        }
      )
    },
    // 加载更多
    loadMore() {
      let content = this.$refs.content
      let offsetHeight = content.offsetHeight
      let scrollHeight = content.scrollHeight
      let top = content.scrollTop
      this.activeInfo.top = top
      this.activeInfo.page = this.page
      // 到底部距离
      let toBottom = scrollHeight - offsetHeight - top
      if (!flag && toBottom <= 10) {
        // 滚动到底部进行请求
        this.loadingMore = true
        flag = true
        this.page += 1
        this.fetch()
      }
    },
    // 跳转详情
    toDetail(id) {
      this.activeInfo.orderby = this.orderby
      this.activeInfo.cityData = this.cityData
      this.activeInfo.submit = this.submit
      this.activeInfo.brand = this.brand
      this.setStorage('ActiveInfo', this.activeInfo)
      this.$router.push({ path: `/dacheshi/active/detail/${id}` })
    },
    // 显示地区弹层
    showSelectLocation() {
      this.locationShow = true
    },
    // 显示品牌弹层
    showBrandView() {
      this.showBrand = true
    },
    // 选择 不限品牌
    chooseAllBrand() {
      this.submit.brandid = ''
      this.brand = '不限品牌'
      this.resetFetch()
    },
    // 选择品牌
    chooseBrand(item) {
      this.showBrand = false
      this.brand = item.brandname
      this.submit.brandid = item.brandid
      this.resetFetch()
    },
    // 关闭弹层
    pop() {
      this.showBrand = false
    },
    // 选择最新发布
    selectType(type) {
      this.orderby = type
      this.resetFetch()
    },
    // 选择常用地区
    chooseUsed(submit) {
      this.submit.provincesn = submit.provincesn
      this.submit.citysn = submit.citysn
      this.cityData.province = submit.provinceName
      this.cityData.city = submit.cityName
      this.resetFetch()
    },
    // 选择全国
    chooseAll() {
      this.submit.provincesn = ''
      this.submit.citysn = ''
      this.cityData.province = ''
      this.cityData.city = ''
      this.resetFetch()
    },
    // 选择城市信息
    chooseCity(submit) {
      this.submit.provincesn = submit.provincesn
      this.submit.citysn = submit.citysn
      this.cityData.province = submit.provinceName
      this.cityData.city = submit.cityName
      this.resetFetch()
    },
    // 关闭弹层
    locationPop() {
      this.locationShow = false
    },
    // 选择一项后，重新请求
    resetFetch() {
      this.page = 1
      flag = false
      this.fetch()
      this.$nextTick(() => {
        let content = this.$refs.content
        content.scrollTop = 0
      })
    }
  },
  // 路由进入
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 隐藏wx分享菜单
      vm.wxHideMenus()
      flag = false
      if (from.name === 'ActiveDetail') {
        let info = vm.getStorage('ActiveInfo')
        let data = vm.getStorage('ActiveList')
        vm.activeData = data
        if (info && vm.activeData.length) {
          vm.page = info.page
          vm.brand = info.brand
          vm.orderby = info.orderby
          vm.submit = info.submit
          vm.cityData = info.cityData
          // 延迟进行top赋值
          setTimeout(() => {
            vm.$refs.content.scrollTop = info.top
            vm.isLoading = false
          }, 300)
        }
      } else {
        vm.fetch()
      }
    })
  },
  // 路由跳转
  beforeRouteLeave(to, from, next) {
    if (to.name === 'ActiveDetail') {
      this.setStorage('ActiveList', this.activeData)
    } else {
      this.removeStorage('ActiveList')
      this.removeStorage('ActiveInfo')
    }
    next()
  }
}
</script>
<style scoped>
  .active{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content{
    margin-top: 4px;
    padding-bottom: 8px;
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>
