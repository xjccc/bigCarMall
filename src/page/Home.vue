<template>
  <div class="home" v-cloak>
    <div class="container" ref="container" @scroll="containScroll">
      <!-- 顶部按键 v-if="getType() !== 'app'" -->
      <div class="home-top" v-if="getType() !== 'app'">
        <div class="select-city" @click="chooseProvince">
          <span class="city">{{cityData.city ? cityData.city : '全国'}}</span>
        </div>
        <div class="title">大车市</div>
      </div>
      <!-- 轮播图 -->
      <swiper :data="swiperData"></swiper>
      <!-- 点选按钮 -->
      <div class="nav-icon">
        <div class="nav-item" v-for="item in navData" @click="jumpTo(item.url, item.insidetype)">
          <img :class="`select-${item.insidetype}`" :src="item.imgurl" />
          <span class="item-title">{{item.title}}</span>
        </div>
      </div>
      <!-- 最新报价 -->
      <quoted :listData="quoteData" v-if="quoteData && quoteData.length"></quoted>
      <!-- 最新优惠 -->
      <discount :data="discountData" v-if="discountData && discountData.length"></discount>
      <!-- 最新促销新闻 -->
      <sale-news :list="articalList" v-if="articalList && articalList.length"></sale-news>
      <!-- 经销商 -->
      <dealer :dealer="dealerList" v-if="dealerList && dealerList.length"></dealer>
      <!-- 页脚 -->
      <home-footer></dacheshi-footer>
      <!-- 页面loading -->
      <div class="loading" v-if="isLoading">
        <v-loading></v-loading>
      </div>
    </div>
    <!-- 选择城市弹层 -->
    <location :locationShow="locationShow" :list="allProvinceList" :navList="provinceListLetter" :submit="submit" @chooseUsed="chooseUsed" @chooseAll="chooseAll" @locationPop="locationPop" @chooseCity="chooseCity"></location>
    <!-- 返回顶部 -->
    <div class="fixed-btn to-top" :class="showToTop ? '' : 'show-none'" @click="toTop"></div>
    <!-- 联系客服 -->
    <div class="fixed-btn concat-us" :class="showConcatUs ? '' : 'show-none'" @click="concatUs"><span>客服</span></div>
    <div class="fixed-btn suggest" :class="showSuggest ? '' : 'show-none'" @click="suggest"><span>意见反馈</span></div>
  </div>
</template>
<script>
import Swiper from '@/components/home/Swiper'
import Quoted from '@/components/home/newQuoted/Quoted'
import Discount from '@/components/home/newDiscount/Discount'
import SaleNews from '@/components/home/newSaleNews/SaleNews'
import Dealer from '@/components/home/dealer/Dealer'
import HomeFooter from '@/components/home/footer/Footer'
import Location from '@/components/Location'
import TruckLogin from '../mixins/login.js'
let flag = false

export default {
  components: {
    Swiper,
    Quoted,
    Discount,
    SaleNews,
    Dealer,
    HomeFooter,
    Location
  },
  data: () => ({
    // loading
    isLoading: true,
    // 用户userid
    userid: null,
    // 地区列表
    allProvinceList: [],
    // 地区侧边栏字母
    provinceListLetter: [],
    // 全部品牌&车系
    allCarSeriesList: [],
    // 显示地区弹层
    locationShow: false,
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
    // 轮播图
    swiperData: [],
    // 点选按钮
    navData: [],
    // 最新报价
    quoteData: [],
    // 最新优惠
    discountData: [],
    // 文章列表
    articalList: [],
    // 经销商
    dealerList: [],
    // 显示回到顶部
    showToTop: false,
    // 显示联系客服
    showConcatUs: false,
    // 显示意见反馈
    showSuggest: false
  }),
  beforeCreate() {
    TruckLogin.init()
  },
  created() {
    document.title = '卡车之家大车市 - 低价优惠选好卡车'
    document.querySelector('meta[name=keywords]').content =
      '货车报价,卡车价格,货车特价,货车促销,货车优惠,大车市'
    // 如果是通过详情页登陆获取缓存
    let activeLogin = this.getStorage('activeLogin')
    let detailLogin = this.getStorage('detailLogin')
    if (activeLogin) {
      let id = activeLogin.split('_')[1]
      this.removeStorage('activeLogin')
      this.$router.push({ path: `/dacheshi/active/detail/${id}` })
    }
    if (detailLogin) {
      let id = detailLogin.split('_')[1]
      this.removeStorage('detailLogin')
      this.$router.push({ path: `/dacheshi/carDetail/${id}` })
    }
    // 获取选择地区缓存
    let city = this.getStorage('bigmallChooseCity')
    if (city) {
      this.submit.provincesn = city.provincesn
      this.submit.citysn = city.citysn
      this.cityData.province = city.provinceName
      this.cityData.city = city.cityName
    }
    // 获取省份
    let allsubcategorylist = this.getStorage('allsubcategorylist')
    let allbrandlist = this.getStorage('allbrandlist')
    let allbrandlistletters = this.getStorage('allbrandlistletters')
    let provincecitylist = this.getStorage('provincecitylist')
    let provincecityletters = this.getStorage('provincecityletters')
    let allCarSeriesList = this.getStorage('allCarSeriesList')
    if (
      allsubcategorylist &&
      allbrandlist &&
      allbrandlistletters &&
      provincecitylist &&
      provincecityletters &&
      allCarSeriesList
    ) {
      this.allProvinceList = provincecitylist
      this.provinceListLetter = provincecityletters
    } else {
      // 进行请求
      this.getLocation()
    }
    // 获取轮播图相关信息
    this.getFront()
    // 获取最新报价
    this.getNewPrice()
    // 获取最新优惠
    this.getNewDiscount()
    // 获取经销商
    this.getDealerList()
    // 获取文章列表
    this.getArticalList()
    // 更改app标题
    this.setTitle()
  },
  mounted() {
    // 获取用户userid
    this.getUserUid()
    document.querySelector(
      'meta[name=description]'
    ).content = `卡车之家大车市】为您提供${new Date().getFullYear()}(${
      this.cityData.city ? this.cityData.city : '全国'
    })载货车、牵引车、自卸车等货车报价、优惠、促销信息。卡车之家大车市，值得信赖的线上购车商城。`
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
            // 获取最新报价
            this.getNewPrice()
            // 获取最新优惠
            this.getNewDiscount()
            // 获取经销商
            this.getDealerList()
            // 获取文章列表
            this.getArticalList()
          }
        }
      )
    })
  },
  methods: {
    // 改变app title
    setTitle() {
      // app传title
      this.callNativeMethod('onChangeWebTitle', {
        changeWebTitle: '大车市'
      })
      // 不显示分享按钮
      this.callNativeMethod('onShowShareButton', {
        isShow: false
      })
      // app调用位置弹层
      this.callNativeMethod('onShowLocationInfo', {
        location: this.cityData.city ? this.cityData.city : '全国',
        url:
          'https://dealerm.360che.com/dacheshitest/dist/index.htm#/dacheshi/app/location'
      })
      let timer = setTimeout(() => {
        if (!flag) {
          this.setTitle()
        }
        if (window.WebViewJavascriptBridge) {
          flag = true
          timer && clearTimeout(timer)
        }
      }, 400)
    },
    // 进行微信分享
    shareHomePage() {
      let wx = window.wx
      wx.ready(() => {
        wx.hideAllNonBaseMenuItem()
        wx.onMenuShareTimeline({
          title: '卡车之家大车市', // 分享标题
          link: location.href, // 分享链接
          imgUrl: this.swiperData[0].imgurl,
          success: () => {}
        })
        wx.onMenuShareAppMessage({
          title: '卡车之家大车市', // 分享标题
          desc: '车辆相关报价，由【卡车之家大车市】提供。', // 分享描述
          link: location.href, // 分享链接
          imgUrl: this.swiperData[0].imgurl,
          type: '',
          dataUrl: '',
          success: () => {}
        })
        wx.showMenuItems({
          menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
        })
      })
    },
    // 先获取用户登录
    getUserUid() {
      // 获取用户信息
      this.getUserInfo(
        'https://dealer-api.360che.com/bigchemall/User/GetUserInfo.aspx',
        res => {
          if (res.data.status === 0) {
            this.userid = res.data.data.uid
            this.setStorage('bigCarMallUserInfo', res.data.data)
          } else {
            let info = this.getStorage('bigCarMallUserInfo')
            if (info) {
              this.removeStorage('bigCarMallUserInfo')
            }
          }
          this.$nextTick(() => {
            // 请求完用户信息，进行取消弹层
            this.isLoading = false
          })
        },
        e => {
          console.log(e, 'catch')
          this.$nextTick(() => {
            // 请求完用户信息，进行取消弹层
            this.isLoading = false
          })
        }
      )
    },
    // 获取省份 品牌 子类
    getLocation() {
      this.ajax(`Common/GetAllCategory.aspx`, res => {
        let data = res.data
        if (data.status === 1) {
          // 缓存子类
          this.setStorage('allsubcategorylist', data.data.subcategorylist)
          // 缓存品牌
          this.setStorage('allbrandlist', data.data.brandlist)
          // 缓存品牌侧边栏字母
          this.setStorage('allbrandlistletters', data.data.brandletters)
          // 缓存城市列表
          this.allProvinceList = data.data.provincecitylist
          this.setStorage('provincecitylist', data.data.provincecitylist)
          // 缓存城市侧边栏字母
          this.provinceListLetter = data.data.provincecityletters
          this.setStorage('provincecityletters', data.data.provincecityletters)
          // 缓存全部车型车系
          this.setStorage('allCarSeriesList', data.data.brandserieslist)
        }
      })
    },
    // 获取轮播和点选按钮信息
    getFront() {
      this.ajax(`Config/GetSlideAndType.aspx`, res => {
        if (res.data.status === 1) {
          this.swiperData = res.data.listSlide
          this.navData = res.data.data.menu
          // 分享
          this.shareHomePage()
        }
      })
    },
    // 获取最新报价
    getNewPrice() {
      this.ajax(
        `ShopProduct/GetShopSaleProduct.aspx?type=1&currentpage=1&pagesize=4&provincesn=${
          this.submit.provincesn
        }&citysn=${this.submit.citysn}`,
        res => {
          if (res.data.status === 1) {
            this.quoteData = res.data.list_date
          }
        }
      )
    },
    // 获取最新优惠
    getNewDiscount() {
      this.ajax(
        `ShopProduct/GetShopSaleProduct.aspx?type=2&orderby=1&currentpage=1&pagesize=3&provincesn=${
          this.submit.provincesn
        }&citysn=${this.submit.citysn}`,
        res => {
          if (res.data.status === 1) {
            this.discountData = res.data.list_date
          }
        }
      )
    },
    // 获取经销商列表
    getDealerList() {
      this.ajax(
        `Dealer/GetDealerList.aspx?currentpage=1&pagesize=4&provincesn=${
          this.submit.provincesn
        }&citysn=${this.submit.citysn}`,
        res => {
          if (res.data.status === 1) {
            this.dealerList = res.data.data.dealerlist
          }
        }
      )
    },
    // 获取文章列表
    getArticalList() {
      this.ajax(
        `Dealer/GetDealerPromotionalArticleList.aspx?pagesize=4&provincesn=${
          this.submit.provincesn
        }&citysn=${this.submit.citysn}`,
        res => {
          if (res.data.status === 1) {
            this.articalList = res.data.data.articlelist
          }
        }
      )
    },
    // 选择全国
    chooseAll() {
      this.submit.provincesn = ''
      this.submit.citysn = ''
      this.cityData.province = ''
      this.cityData.city = ''
      // 获取最新报价
      this.getNewPrice()
      // 获取最新优惠
      this.getNewDiscount()
      // 获取经销商
      this.getDealerList()
      // 获取文章列表
      this.getArticalList()
    },
    // 选择常用地区
    chooseUsed(submit) {
      this.submit.provincesn = submit.provincesn
      this.submit.citysn = submit.citysn
      this.cityData.province = submit.provinceName
      this.cityData.city = submit.cityName
      // 获取最新报价
      this.getNewPrice()
      // 获取最新优惠
      this.getNewDiscount()
      // 获取经销商
      this.getDealerList()
      // 获取文章列表
      this.getArticalList()
    },
    // 选择城市
    chooseCity(submit) {
      this.submit.provincesn = submit.provincesn
      this.submit.citysn = submit.citysn
      this.cityData.province = submit.provinceName
      this.cityData.city = submit.cityName
      // 获取最新报价
      this.getNewPrice()
      // 获取最新优惠
      this.getNewDiscount()
      // 获取经销商
      this.getDealerList()
      // 获取文章列表
      this.getArticalList()
    },
    // 显示选择城市弹层
    chooseProvince() {
      this.locationShow = true
    },
    // 关闭弹层
    locationPop() {
      this.locationShow = false
    },
    // 跳转相关页面
    jumpTo(url, insidetype) {
      // 不是后端给的跳转链接，路由跳转
      if (!url) {
        if (insidetype === 'mine') {
          if (this.userid === null || this.userid === '0' || !this.userid) {
            TruckLogin.ToLogin()
            return
          }
          this.$router.push(`/dacheshi/${insidetype}`)
        }
        this.$router.push(`/dacheshi/${insidetype}`)
      } else {
        window.location.href = url
      }
    },
    // container滚动事件
    containScroll() {
      let container = this.$refs.container
      // 屏幕距离
      let offsetHeight = container.offsetHeight
      let scrollHeight = container.scrollHeight
      let top = container.scrollTop
      // 到底部距离
      let toBottom = scrollHeight - offsetHeight - top

      if (top < offsetHeight) {
        this.showToTop = false
        this.showConcatUs = false
      }
      if (top > offsetHeight) {
        this.showToTop = true
        this.showConcatUs = true
      }
      if (toBottom < 10) {
        this.showSuggest = true
      } else {
        this.showSuggest = false
      }
    },
    // 返回顶部
    toTop() {
      let container = this.$refs.container
      container.scrollTop = 0
    },
    // 联系客服
    concatUs() {
      // 拨打电话
      window.location.href = `tel://${4006136188}`
    },
    // 意见反馈
    suggest() {
      this.$router.push('/dacheshi/mine/suggest')
    }
  }
}
</script>
<style scoped>
  .home{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .home-top{
    position: relative;
    padding: 0 16px;
    height: 44px;
    line-height: 44px;
    background: #fff;
  }
  .select-city{
    position: absolute;
    top: 0;
    left: 34px;
    line-height: 44px;
  }
  .city{
    display: inline-block;
    max-width: 100px;
    height: 44px;
    font-size: 14px;
    color: #17181A;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .select-city:before{
    position: absolute;
    left: -18px;
    top: 16px;
    font-family: 'carMall';
    content: "\e71a";
    font-size: 14px;
    line-height: 14px;
    color: #FF6600;
  }
  .title{
    flex: 1;
    font-size: 18px;
    color: #333;
    font-weight: bold;
    text-align: center;
  }
  .nav-icon{
    padding: 18px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #fff;
  }
  .nav-item{
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .item-title{
    font-size: 12px;
    color: #17181A;
    line-height: 16px;
  }
  .select-car{
    width: 44px;
    height: 30px;
    margin-bottom: 12px;
    object-fit: cover;
  }
  .select-active{
    width: 30px;
    height: 34px;
    object-fit: cover;
    margin-bottom: 8px;
  }
  .select-dealer{
    width: 32px;
    height: 34px;
    object-fit: cover;
    margin-bottom: 8px;
  }
  .select-mine{
    width: 30px;
    height: 34px;
    object-fit: cover;
    margin-bottom: 8px;
  }
  .fixed-btn{
    position: fixed;
    right: 12px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 1px solid #EDEDED;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,0.10);
    text-align: center;
    z-index: 10;
  }
  .to-top{
    background: rgba(0,0,0,0.80);
    border: none;
    bottom: 226px;
  }
  .to-top:after{
    position: absolute;
    top: 11px;
    left: 15px;
    font-family: 'carMall';
    font-size: 19px;
    content: "\e70e";
    color: #fff;
  }
  .concat-us{
    background: rgba(255,255,255,0.90);
    bottom: 166px;
    font-size: 0;
  }
  .concat-us span{
    font-size: 12px;
    color: #5C6066;
    line-height: 18px;
  }
  .concat-us span:before{
    margin-top: 8px;
    display: block;
    font-family: 'carMall';
    content: "\e710";
    font-size: 14px;
    color: #5C6066;
  }
  .suggest{
    bottom: 107px;
    background: rgba(255,255,255,0.90);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .suggest span{
    width: 24px;
    font-size: 12px;
    color: #5C6066;
    line-height: 12px;
  }
  .show-none{
    display: none;
  }
</style>
