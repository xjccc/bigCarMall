<template>
  <div class="discount-active">
    <top-header :type="'location'" :title="'促销新闻'" :data="cityData" @location="showSelectLocation"></top-header>
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
    <!-- 页面loading -->
    <div class="loading" v-if="isLoading">
      <v-loading></v-loading>
    </div>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import Item from '@/components/discountActive/Item'
import Location from '@/components/Location'
let flag = false

export default {
  components: {
    TopHeader,
    Item,
    Location
  },
  data: () => ({
    // 进入页面loading
    isLoading: true,
    // 显示地区弹层
    locationShow: false,
    // 地区列表
    allProvinceList: [],
    // 地区侧边栏字母
    provinceListLetter: [],
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
      citysn: ''
    },
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
      fromDetail: false
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
    fetch() {
      this.ajax(
        `Dealer/GetDealerPromotionalArticleList.aspx?currentpage=${
          this.page
        }&pagesize=${this.size}&provincesn=${this.submit.provincesn}&citysn=${
          this.submit.citysn
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
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>
