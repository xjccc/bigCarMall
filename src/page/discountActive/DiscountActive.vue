<template>
  <div class="discount-active">
    <top-header :type="'location'" :title="'促销新闻'" :data="cityData" @location="showSelectLocation"></top-header>
    <!-- 筛选 -->
    <filter-header :brandName="brandName" :seriesName="seriesName" @filter="filterType"></filter-header>
    <!-- 重置 -->
    <div v-if="resetShow">
      <reset :data="resetList" @delete-item="deleteItem" @reset="reset"></reset>
    </div>
    <div class="active-content" @scroll="loadMore" ref="content">
      <template v-for="item in activeData">
        <item :data="item" @toDetail="toDetail"></item>
      </template>
      <!-- 空内容 -->
      <div class="empty" v-if="!activeData.length">
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
    <!-- 选择城市弹层 -->
    <location :locationShow="locationShow" :list="allProvinceList" :navList="provinceListLetter" :submit="submit" @chooseUsed="chooseUsed" @chooseAll="chooseAll" @locationPop="locationPop" @chooseCity="chooseCity"></location>
    <!-- 品牌弹层 -->
    <brand-view :id="submit.brandid" :data="allBrand" :letter="allBrandLetter" :showBrand="showBrand" @pop="pop" @chooseAll="chooseAllBrand" @choose-brand="chooseBrand"></brand-view>
    <!-- 全部车系 -->
    <series :showSeries="showSeries" :brandid="submit.brandid" :id="submit.seriesid" :data="allCarSeriesList" @choose-series="chooseSeries" @pop="pop"></series>
    <!-- 提示 -->
    <!-- 错误提示 -->
    <dialog-content :type="'know'" v-if="dialogShowToast" :info="'请先选择品牌'" @close="closeDialog"></dialog-content>
    <!-- 页面loading -->
    <div class="loading" v-if="isLoading">
      <v-loading></v-loading>
    </div>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import Item from '@/components/discountActive/Item'
import FilterHeader from '@/components/discountActive/FilterHeader'
import Series from '@/components/discountActive/Series'
import Location from '@/components/Location'
import BrandView from '@/components/selectCar/BrandView'
import Reset from '@/components/selectCar/Reset'
import DialogContent from '@/components/Dialog'
let flag = false

export default {
  components: {
    TopHeader,
    Item,
    Reset,
    Series,
    DialogContent,
    FilterHeader,
    Location,
    BrandView
  },
  data: () => ({
    // 进入页面loading
    isLoading: true,
    // 显示地区弹层
    locationShow: false,
    // 显示全部品牌
    showBrand: false,
    // 显示全部车系
    showSeries: false,
    // 地区列表
    allProvinceList: [],
    // 地区侧边栏字母
    provinceListLetter: [],
    // 全部车型&车系
    allCarSeriesList: [],
    // 全部品牌
    allBrand: [],
    // 全部品牌侧边栏
    allBrandLetter: [],
    // 选择地区
    cityData: {
      province: '',
      city: ''
    },
    // 选择地区 省份id
    submit: {
      // 省份
      provincesn: '',
      // 城市
      citysn: '',
      // 品牌id
      brandid: '',
      // 车型id
      seriesid: ''
    },
    // 筛选品牌名称
    brandName: '',
    // 筛选车系名称
    seriesName: '',
    // 筛选数组
    resetList: ['', ''],
    // 页数
    page: 1,
    // 每页请求条数
    size: 10,
    // 活动列表
    activeData: [],
    // 加载loading
    loadingMore: false,
    // 没有更多
    noMore: false,
    // from-detail 判断是否通过详情页跳转回来的
    fromDetail: false,
    // 存储优惠活动信息
    discountActiveInfo: {
      top: 0,
      page: 1,
      cityData: {},
      submit: {},
      resetList: [],
      fromDetail: false
    },
    // 显示错误提示
    dialogShowToast: false
  }),
  computed: {
    // 判断是否存在重置数组
    resetShow() {
      for (let i = 0; i < 3; i++) {
        if (this.resetList[i]) {
          return true
        }
      }
      return false
    }
  },
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
    // 获取全部车型车系
    let allCarSeriesList = this.getStorage('allCarSeriesList')
    this.allCarSeriesList = allCarSeriesList
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
    // 显示地区弹层
    showSelectLocation() {
      this.locationShow = true
    },
    // 关闭弹层
    locationPop() {
      this.locationShow = false
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
    // 筛选
    filterType(type) {
      if (type === 'brand') {
        // 选择品牌
        this.showBrand = true
      } else {
        // 选择车系
        if (!this.submit.brandid) {
          this.dialogShowToast = true
        } else {
          this.showSeries = true
        }
      }
    },
    // 关闭提示
    closeDialog() {
      this.dialogShowToast = false
    },
    fetch() {
      this.ajax(
        `Dealer/GetDealerPromotionalArticleList.aspx?currentpage=${
          this.page
        }&pagesize=${this.size}&provincesn=${this.submit.provincesn}&citysn=${
          this.submit.citysn
        }&brandid=${this.submit.brandid}&seriesextendid=${
          this.submit.seriesid
        }`,
        res => {
          if (res.data.status === 1) {
            if (this.page === 1) {
              this.activeData = res.data.data.articlelist
            } else {
              this.activeData = this.activeData.concat(
                res.data.data.articlelist
              )
              this.$nextTick(() => {
                flag = false
                this.loadingMore = false
                this.noMore = false
                if (!res.data.data.articlelist.length) {
                  flag = true
                  this.noMore = true
                }
              })
            }
          }
          this.setStorage('discountActiveList', this.activeData)
          // 关闭页面loading
          this.isLoading = false
        }
      )
    },
    // 删除已选参数
    deleteItem(index) {
      this.noMore = false
      if (index === 0) {
        this.submit.brandid = ''
        this.submit.seriesid = ''
        this.brandName = ''
        this.seriesName = ''
        this.resetList = ['', '']
      } else {
        this.submit.seriesid = ''
        this.seriesName = ''
        // 设置数组
        this.$set(this.resetList, 1, '')
      }
      this.resetFetch()
    },
    // 重置
    reset() {
      this.noMore = false
      this.brandName = ''
      this.seriesName = ''
      this.resetList = ['', '']
      this.submit.brandid = ''
      this.submit.seriesid = ''
      this.resetFetch()
    },
    // 选择 不限品牌
    chooseAllBrand() {
      this.submit.brandid = ''
      this.submit.seriesid = ''
      this.brandName = ''
      this.seriesName = ''
      // 设置数组
      this.resetList = ['', '']
      this.resetFetch()
    },
    // 选择品牌
    chooseBrand(item) {
      this.showBrand = false
      this.submit.brandid = item.brandid
      this.brandName = item.brandname
      this.submit.seriesid = ''
      this.seriesName = ''
      this.$set(this.resetList, 0, item.brandname)
      this.$set(this.resetList, 1, '')
      this.resetFetch()
    },
    // 选择车系
    chooseSeries(item) {
      this.showSeries = false
      this.submit.seriesid = item.seriesextendidlist
      this.seriesName = item.seriesname
      this.$set(this.resetList, 1, item.seriesname)
      this.resetFetch()
    },
    // 关闭弹层
    pop() {
      this.showBrand = false
      this.showSeries = false
    },
    // 加载更多
    loadMore() {
      let content = this.$refs.content
      let offsetHeight = content.offsetHeight
      let scrollHeight = content.scrollHeight
      let top = content.scrollTop
      this.discountActiveInfo.top = top
      this.discountActiveInfo.page = this.page
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
      this.discountActiveInfo.cityData = this.cityData
      this.discountActiveInfo.submit = this.submit
      this.discountActiveInfo.resetList = this.resetList
      this.discountActiveInfo.fromDetail = true
      this.setStorage('discountActiveInfo', this.discountActiveInfo)
      window.location.href = url
    },
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
      // 隐藏wx菜单
      vm.wxHideMenus()
      flag = false
      let info = vm.getStorage('discountActiveInfo')
      vm.fromDetail = info !== null ? info.fromDetail : false
      if (
        from.name === 'Home' ||
        (to.name === 'DiscountActive' && !vm.fromDetail)
      ) {
        vm.fetch()
      } else {
        let data = vm.getStorage('discountActiveList')
        vm.activeData = data
        if (info) {
          vm.page = info.page
          vm.submit = info.submit
          vm.cityData = info.cityData
          vm.resetList = info.resetList
          // 延迟进行top赋值
          setTimeout(() => {
            vm.$refs.content.scrollTop = info.top
            vm.removeStorage('discountActiveInfo')
            vm.isLoading = false
          }, 300)
        }
      }
    })
  },
  // 路由跳转
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Home') {
      this.removeStorage('discountActiveList')
      this.removeStorage('discountActiveInfo')
    }
    next()
  }
}
</script>
<style scoped>
  .discount-active{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .active-content{
    margin-top: 8px;
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>
