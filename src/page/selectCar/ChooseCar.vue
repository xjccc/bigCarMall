<template>
  <div class="choose-car">
    <!-- 头部信息 -->
    <top-header :type="'location'" :title="'选车'" :data="cityData" @location="showSelectLocation"></top-header>
    <!-- 筛选 -->
    <filter-header @filter="filterType"></filter-header>
    <!-- 重置 -->
    <div v-if="resetShow">
      <reset :data="resetList" @delete-item="deleteItem" @reset="reset"></reset>
    </div>
    <!-- 筛选组件 -->
    <div :class="resetShow ? 'filters' : ''" class="car-content"  @scroll="loadMore" ref="content">
      <template v-for="item in filterData">
        <item-select :data="item" @toDetail="toDetail"></item-select>
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
    <!-- 类别弹层 -->
    <subcate-view :id="submit.subcategoryid" :data="allSubcate" :showSubcate="showSubcate" @choose-subcate="chooseSubcate" @pop="pop"></subcate-view>
    <!-- 价格弹层 -->
    <price-view :val="submit.priceVal" :data="allPrice" :showPrice="showPrice" @choose-price="choosePrice" @pop="pop"></price-view>
    <!-- 选择城市弹层 -->
    <location :locationShow="locationShow" :list="allProvinceList" :navList="provinceListLetter" :submit="submit" @chooseUsed="chooseUsed" @chooseAll="chooseAll" @locationPop="locationPop" @chooseCity="chooseCity"></location>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import FilterHeader from '@/components/selectCar/FilterHeader'
import ItemSelect from '@/components/selectCar/ItemSelect'
import Reset from '@/components/selectCar/Reset'
import BrandView from '@/components/selectCar/BrandView'
import SubcateView from '@/components/selectCar/SubcateView'
import PriceView from '@/components/selectCar/PriceView'
import Location from '@/components/Location'
import Empty from '@/components/selectCar/Empty'
let flag = false

export default {
  components: {
    TopHeader,
    FilterHeader,
    ItemSelect,
    Reset,
    BrandView,
    SubcateView,
    PriceView,
    Location,
    Empty
  },
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
  data: () => ({
    // 页面loading
    isLoading: true,
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
    // 全部品牌
    allBrand: [],
    // 品牌侧边栏字母
    allBrandLetter: [],
    // 显示brand弹层
    showBrand: false,
    // 全部类别
    allSubcate: [],
    // 显示子类弹层
    showSubcate: false,
    // 全部价格
    allPrice: [],
    // 显示价格弹层
    showPrice: false,
    // 已选数组
    resetList: ['', '', ''],
    // 需要提交的筛选参数
    submit: {
      // 品牌id
      brandid: '',
      // 类别id
      subcategoryid: '',
      // 价格
      priceVal: '',
      // 省份
      provincesn: '',
      // 城市
      citysn: ''
    },
    // 筛选内容
    filterData: [],
    // 加载loading
    loadingMore: false,
    // 没有更多
    noMore: false,
    // 页数
    page: 1,
    // 条数
    size: 10,
    // 显示筛选为空
    showEmpty: false,
    // 存储选车信息
    chooseInfo: {
      top: 0,
      page: 1,
      submit: {},
      cityData: {},
      resetList: []
    }
  }),
  created() {
    // 隐藏wx分享菜单
    this.wxHideMenus()
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
    if (brand) {
      this.allBrand = brand
    }
    // 获取品牌侧边栏字母
    let brandletter = this.getStorage('allbrandlistletters')
    if (brandletter) {
      this.allBrandLetter = brandletter
    }
    // 获取全部子类
    let sub = this.getStorage('allsubcategorylist')
    if (sub) {
      this.allSubcate = sub
    }
    // 获取价格区间
    let price = this.getStorage('allpricelist')
    if (price) {
      this.allPrice = price
    } else {
      this.getPriceRange()
    }
  },
  mounted() {
    // 设置标题头
    document.title = `【${
      this.resetList[1] ? this.resetList[1] : '货车'
    }报价】${new Date().getFullYear()}${
      this.cityData.city ? this.cityData.city : '全国'
    }${this.resetList[2] ? this.resetList[2] : '不限价格'}${
      this.resetList[0] ? this.resetList[0] : ''
    }${
      this.resetList[1] ? this.resetList[1] : '货车'
    }价格及图片大全_手机卡车之家大车市`
  },
  methods: {
    // 显示地区弹层
    showSelectLocation() {
      this.locationShow = true
    },
    // 进行相关条件选择
    filterType(type) {
      if (type === 'brand') {
        // 选择品牌
        this.showBrand = true
      } else if (type === 'subcategory') {
        // 选择类别
        this.showSubcate = true
      } else {
        // 选择价格
        this.showPrice = true
      }
    },
    // 获取价格区间
    getPriceRange() {
      this.ajax(`Config/GetListPriceRange.aspx`, res => {
        this.setStorage('allpricelist', res.data.list_date)
        this.allPrice = res.data.list_date
      })
    },
    // 获取筛选数据
    fetch() {
      this.ajax(
        `ShopProduct/GetShopSaleProduct.aspx?type=1&brand=${
          this.submit.brandid
        }&currentpage=${this.page}&pagesize=${this.size}&subcategory=${
          this.submit.subcategoryid
        }&pricerange=${this.submit.priceVal}&provincesn=${
          this.submit.provincesn
        }&citysn=${this.submit.citysn}`,
        res => {
          if (res.data.status === 1) {
            if (this.page === 1 && !res.data.list_date.length) {
              this.showEmpty = true
              flag = true
              this.noMore = false
            } else {
              this.showEmpty = false
            }
            if (this.page === 1) {
              this.filterData = res.data.list_date
            } else {
              this.filterData = this.filterData.concat(res.data.list_date)
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
      this.chooseInfo.top = top
      this.chooseInfo.page = this.page
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
    // 删除已选参数
    deleteItem(index) {
      this.showEmpty = false
      this.noMore = false
      if (index === 0) {
        this.submit.brandid = ''
      } else if (index === 1) {
        this.submit.subcategoryid = ''
      } else {
        this.submit.priceVal = ''
      }
      // 设置数组
      this.$set(this.resetList, index, '')
      this.resetFetch()
    },
    // 重置
    reset() {
      this.showEmpty = false
      this.noMore = false
      this.brand = ''
      this.subcategory = ''
      this.price = ''
      this.resetList = ['', '', '']
      this.submit = {
        brandid: '',
        subcategoryid: '',
        priceVal: ''
      }
      this.resetFetch()
    },
    // 选择 不限品牌
    chooseAllBrand() {
      this.submit.brandid = ''
      // 设置数组
      this.$set(this.resetList, 0, '')
      this.resetFetch()
    },
    // 选择品牌
    chooseBrand(item) {
      this.showBrand = false
      this.submit.brandid = item.brandid
      this.$set(this.resetList, 0, item.brandname)
      this.resetFetch()
    },
    // 选择类别
    chooseSubcate(item) {
      this.showSubcate = false
      this.submit.subcategoryid = item.subcategoryid
      this.$set(this.resetList, 1, item.subcategoryname)
      this.resetFetch()
    },
    // 选择价格
    choosePrice(item) {
      this.showPrice = false
      this.submit.priceVal = item.Val
      this.$set(this.resetList, 2, item.showStr)
      this.resetFetch()
    },
    // 关闭弹层
    pop() {
      this.showBrand = false
      this.showSubcate = false
      this.showPrice = false
    },
    // 跳转详情页
    toDetail(id) {
      this.chooseInfo.cityData = this.cityData
      this.chooseInfo.submit = this.submit
      this.chooseInfo.resetList = this.resetList
      this.setStorage('myChooseCarInfo', this.chooseInfo)
      this.$router.push({ path: `/home/carDetail/${id}` })
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
      flag = false
      if (from.name === 'Detail') {
        let info = vm.getStorage('myChooseCarInfo')
        let data = vm.getStorage('myChooseCarList')
        vm.filterData = data
        if (info) {
          vm.page = info.page
          vm.resetList = info.resetList
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
    if (to.name === 'Detail') {
      this.setStorage('myChooseCarList', this.filterData)
    } else {
      this.removeStorage('myChooseCarList')
      this.removeStorage('myChooseCarInfo')
    }
    next()
  }
}
</script>
<style scoped>
  .choose-car{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .car-content{
    padding-bottom: 16px;
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .filters .item-select:first-child{
    margin-top: 0;
  }
</style>
