<template>
  <div class="dealer">
    <top-header :type="'location'" :title="'经销商报价'" :data="cityData" @location="showSelectLocation"></top-header>
    <!-- 筛选头部 -->
    <filter-header @filterType="filterType" :selectBrand="selectBrand" @changeCheck="changeCheck" :checkInfo="isActive"></filter-header>
    <!-- 显示内容 -->
    <div class="content" @scroll="loadMore" ref="content">
      <template v-for="item in dealerData">
        <item-dealer :item="item" @toDetail="toDetail"></item-dealer>
      </template>
      <div class="other-title" v-if="dealerData.length < 5 && otherDealerData.length">———— 以下为本省合作经销商 ————</div>
      <template v-for="item in otherDealerData" v-if="dealerData.length < 5">
        <item-dealer :item="item" @toDetail="toDetail"></item-dealer>
      </template>
      <!-- 空内容 -->
      <div class="empty" v-if="!dealerData.length && !otherDealerData.length">
        <img src="https://s.kcimg.cn/newBusiness/newSass/images/empty.png" alt=""> 暂时没有相关数据~
      </div>
      <!-- 加载loading -->
      <div class="loading-more" v-show="loadingMore">
        <v-loading></v-loading>
      </div>
      <div class="no-loading-more" v-show="noMore">
        ———— 我是有底线的~ ————
      </div>
    </div>
    <!-- 品牌弹层 -->
    <brand-view :id="submit.brandid" :data="allBrand" :letter="allBrandLetter" :showBrand="showBrand" @pop="pop" @chooseAll="chooseAllBrand" @choose-brand="chooseBrand"></brand-view>
    <!-- 选择城市弹层 -->
    <location :locationShow="locationShow" :list="allProvinceList" :navList="provinceListLetter" :submit="submit" @chooseUsed="chooseUsed" @chooseAll="chooseAll" @locationPop="locationPop" @chooseCity="chooseCity"></location>
    <!-- 页面loading -->
    <div class="loading" v-if="isLoading">
      <v-loading></v-loading>
    </div>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import FilterHeader from '@/components/dealer/FilterHeader'
import ItemDealer from '@/components/home/dealer/ItemDealer'
import BrandView from '@/components/selectCar/BrandView'
import Location from '@/components/Location'
let flag = false

export default {
  components: {
    TopHeader,
    FilterHeader,
    ItemDealer,
    BrandView,
    Location
  },
  data: () => ({
    // 进入页面loading
    isLoading: true,
    // 经销商列表数据
    dealerData: [],
    // 不足5条，其他经销商列表
    otherDealerData: [],
    // 页数
    page: 1,
    // 条数
    size: 10,
    // 加载loading
    loadingMore: false,
    // 没有更多
    noMore: false,
    // 跳过显示接口返还
    skipsubdealer: 0,
    // 地区列表
    allProvinceList: [],
    // 地区侧边栏字母
    provinceListLetter: [],
    // 是否只看活动
    isActive: 0,
    // 显示品牌筛选
    showBrand: false,
    // 全部品牌
    allBrand: [],
    // 品牌侧边栏字母
    allBrandLetter: [],
    // 显示地区弹层
    locationShow: false,
    // 选择地区
    cityData: {
      province: '',
      city: ''
    },
    // 选择的品牌
    selectBrand: '不限品牌',
    // 选择地区 省份id
    submit: {
      // 品牌id
      brandid: '',
      // 省份
      provincesn: '',
      // 城市
      citysn: ''
    },
    // fromDetail  判断是否通过详情页跳转回来的
    fromDetail: false,
    // 存储经销商信息
    dealerInfo: {
      top: 0,
      page: 1,
      selectBrand: '不限品牌',
      cityData: {},
      submit: {},
      isActive: 0,
      fromDetail: false
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
      changeWebTitle: '经销商报价'
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
    document.title = `${
      this.cityData.city ? this.cityData.city : '全国'
    }经销商报价`
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
    // 显示地区弹层
    showSelectLocation() {
      this.locationShow = true
    },
    // 只看活动
    changeCheck(e) {
      this.isActive = e
      this.resetFetch()
    },
    // 显示品牌筛选
    filterType() {
      this.showBrand = true
    },
    // 选择 不限品牌
    chooseAllBrand() {
      this.submit.brandid = ''
      // 设置数组
      this.selectBrand = '不限品牌'
      this.resetFetch()
    },
    // 选择品牌
    chooseBrand(item) {
      this.showBrand = false
      this.submit.brandid = item.brandid
      this.selectBrand = item.brandname
      this.resetFetch()
    },
    // 关闭弹层
    pop() {
      this.showBrand = false
    },
    // 请求数据
    fetch() {
      this.ajax(
        `Dealer/GetDealerList.aspx?currentpage=${this.page}&pagesize=${
          this.size
        }&brand=${this.submit.brandid}&provincesn=${
          this.submit.provincesn
        }&citysn=${this.submit.citysn}&skipsubdealer=${
          this.skipsubdealer
        }&isenablecoupon=${this.isActive}`,
        res => {
          let data = res.data
          if (data.status === 1) {
            // 排除显示过的数据
            this.skipsubdealer = data.data.skipsubdealer
              ? data.data.skipsubdealer
              : 0
            if (this.page === 1) {
              this.dealerData = data.data.dealerlist
              if (data.data.otherdealerlist) {
                this.otherDealerData = data.data.otherdealerlist
              }
              this.noMore = false
            } else {
              this.dealerData = this.dealerData.concat(data.data.dealerlist)
              // 本省经销商
              if (
                data.data.otherdealerlist &&
                data.data.otherdealerlist.length
              ) {
                this.otherDealerData = this.otherDealerData.concat(
                  data.data.otherdealerlist
                )
              }
              this.$nextTick(() => {
                flag = false
                // 取消加载
                this.loadingMore = false
                // 只有本省的情况
                if (
                  this.page !== 1 &&
                  (data.data.dealerlist && !data.data.dealerlist.length) &&
                  (data.data.otherdealerlist &&
                    !data.data.otherdealerlist.length)
                ) {
                  flag = true
                  this.noMore = true
                }
                // 没有本省的情况
                if (
                  this.page !== 1 &&
                  !data.data.otherdealerlist &&
                  !data.data.dealerlist.length
                ) {
                  flag = true
                  this.noMore = true
                }
              })
            }
          }
          this.setStorage('DealerList', this.dealerData)
          this.setStorage('DealerOtherList', this.otherDealerData)
          // 关闭页面loading
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
      this.dealerInfo.top = top
      this.dealerInfo.page = this.page
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
    toDetail(url) {
      this.dealerInfo.cityData = this.cityData
      this.dealerInfo.submit = this.submit
      this.dealerInfo.selectBrand = this.selectBrand
      this.dealerInfo.isActive = this.isActive
      this.dealerInfo.fromDetail = true
      this.setStorage('DealerInfo', this.dealerInfo)
      window.location.href = url
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
    // 选择城市
    chooseCity(submit) {
      this.submit.provincesn = submit.provincesn
      this.submit.citysn = submit.citysn
      this.cityData.province = submit.provinceName
      this.cityData.city = submit.cityName
      this.dealerData = []
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
      this.noMore = false
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
      // 隐藏wx菜单
      vm.wxHideMenus()
      flag = false
      let info = vm.getStorage('DealerInfo')
      vm.fromDetail = info !== null ? info.fromDetail : false
      if (
        from.name === 'Home' ||
        (to.path === '/dacheshi/dealer' && !vm.fromDetail)
      ) {
        vm.fetch()
      } else {
        let data = vm.getStorage('DealerList')
        let otherData = vm.getStorage('DealerOtherList')
        vm.dealerData = data
        vm.otherDealerData = otherData
        if (info) {
          vm.page = info.page
          vm.selectBrand = info.selectBrand
          vm.isActive = info.isActive
          vm.submit = info.submit
          vm.cityData = info.cityData
          // 延迟进行top赋值
          setTimeout(() => {
            vm.$refs.content.scrollTop = info.top
            vm.removeStorage('DealerInfo')
            vm.isLoading = false
          }, 300)
        }
      }
    })
  },
  // 路由跳转
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Home') {
      this.removeStorage('DealerList')
      this.removeStorage('DealerOtherList')
      this.removeStorage('DealerInfo')
    }
    next()
  }
}
</script>
<style scoped>
  .dealer{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content{
    margin-top: 8px;
    padding-bottom: 8px;
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #fff;
  }
  .content .item-dealer:last-child{
    height: 92px;
    border-bottom: 0;
  }
  .other-title{
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    color: #A1A9B2;
    text-align: center;
    background: #F5F5F5;
  }
</style>
