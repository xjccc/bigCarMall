<template>
  <div class="home" v-cloak>
    <div class="container" ref="container" @scroll="containScroll">
      <!-- 顶部按键 -->
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
      <home-footer></home-footer>
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
import Swiper from '@/components/Home/Swiper'
import Quoted from '@/components/Home/newQuoted/Quoted'
import Discount from '@/components/Home/newDiscount/Discount'
import SaleNews from '@/components/Home/newSaleNews/SaleNews'
import Dealer from '@/components/Home/dealer/Dealer'
import HomeFooter from '@/components/Home/footer/Footer'
import Location from '@/components/Location'
import TruckLogin from '../../node_modules/login'

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
    isLoading: true,
    // 用户userid
    userid: null,
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
      this.$router.push({ path: `/home/active/detail/${id}` })
    }
    if (detailLogin) {
      let id = detailLogin.split('_')[1]
      this.removeStorage('detailLogin')
      this.$router.push({ path: `/home/carDetail/${id}` })
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
    if (
      allsubcategorylist &&
      allbrandlist &&
      allbrandlistletters &&
      provincecitylist &&
      provincecityletters
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
    // 分享
    this.shareHomePage()
  },
  mounted() {
    // 获取用户userid
    this.getUserUid()
    document.querySelector(
      'meta[name=description]'
    ).content = `卡车之家大车市】为您提供${new Date().getFullYear()}(${
      this.cityData.city ? this.cityData.city : '全国'
    })载货车、牵引车、自卸车等货车报价、优惠、促销信息。卡车之家大车市，值得信赖的线上购车商城。`
  },
  methods: {
    // 进行微信分享
    shareHomePage() {
      let wx = window.wx
      this.getData(
        `https://saasm.360che.com.cn/newsaasapi/WeiXin/WXJSsignature.aspx?${+new Date()}`,
        res => {
          if (res.data.status === 1) {
            let data = res.data
            // 注册微信信息
            wx.config({
              debug: false,
              appId: data.data.appId,
              timestamp: data.data.timestamp,
              nonceStr: data.data.noncestr,
              signature: data.data.signature,
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'hideMenuItems',
                'showMenuItems',
                'showAllNonBaseMenuItem',
                'hideAllNonBaseMenuItem'
              ]
            })
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
                menuList: [
                  'menuItem:share:appMessage',
                  'menuItem:share:timeline'
                ]
              })
            })
          }
        }
      )
    },
    // 先获取用户登录
    getUserUid() {
      // 获取用户信息
      this.getUserInfo(
        'https://dealer-api.360che.com/bigchemall/User/GetUserInfo.aspx',
        res => {
          if (res.data.status === 0) {
            if (res.data.data.uid) {
              this.userid = res.data.data.uid
              this.setStorage('bigCarMallUid', res.data.data.uid)
            }
            this.setStorage('bigCarMallUserInfo', res.data.data)
          } else {
            let uid = this.getStorage('bigCarMallUid')
            let info = this.getStorage('bigCarMallUserInfo')
            if (uid) {
              this.removeStorage('bigCarMallUid')
            }
            if (info) {
              this.removeStorage('bigCarMallUserInfo')
            }
          }
          // 请求完用户信息，进行取消弹层
          this.isLoading = false
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
        }
      })
    },
    // 获取轮播和点选按钮信息
    getFront() {
      this.ajax(`Config/GetSlideAndType.aspx`, res => {
        if (res.data.status === 1) {
          this.swiperData = res.data.listSlide
          this.navData = res.data.data.menu
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
          if (this.userid === null) {
            TruckLogin.ToLogin()
            return
          }
          this.$router.push(`/home/${insidetype}`)
        }
        this.$router.push(`/home/${insidetype}`)
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
      this.$router.push('/home/mine/suggest')
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
    padding: 0 32px;
    height: 88px;
    line-height: 88px;
    background: #fff;
  }
  .select-city{
    position: absolute;
    top: 0;
    left: 68px;
    line-height: 88px;
  }
  .city{
    display: inline-block;
    max-width: 200px;
    height: 88px;
    font-size: 28px;
    color: #17181A;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .select-city:before{
    position: absolute;
    left: -36px;
    top: 32px;
    font-family: 'carMall';
    content: "\e71a";
    font-size: 28px;
    line-height: 28px;
    color: #FF6600;
  }
  .title{
    flex: 1;
    font-size: 36px;
    color: #333;
    font-weight: bold;
    text-align: center;
  }
  .nav-icon{
    padding: 36px 0;
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
    font-size: 24px;
    color: #17181A;
    line-height: 32px;
  }
  .select-car{
    width: 88px;
    height: 60px;
    margin-bottom: 24px;
    object-fit: cover;
  }
  .select-active{
    width: 60px;
    height: 68px;
    object-fit: cover;
    margin-bottom: 16px;
  }
  .select-dealer{
    width: 64px;
    height: 68px;
    object-fit: cover;
    margin-bottom: 16px;
  }
  .select-mine{
    width: 60px;
    height: 68px;
    object-fit: cover;
    margin-bottom: 16px;
  }
  .fixed-btn{
    position: fixed;
    right: 24px;
    width: 100px;
    height: 100px;
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
    bottom: 452px;
  }
  .to-top:after{
    position: absolute;
    top: 22px;
    left: 28px;
    font-family: 'carMall';
    font-size: 38px;
    content: "\e70e";
    color: #fff;
  }
  .concat-us{
    background: rgba(255,255,255,0.90);
    bottom: 332px;
    font-size: 0;
  }
  .concat-us span{
    font-size: 24px;
    color: #5C6066;
    line-height: 36px;
  }
  .concat-us span:before{
    margin-top: 16px;
    display: block;
    font-family: 'carMall';
    content: "\e710";
    font-size: 28px;
    color: #5C6066;
  }
  .suggest{
    bottom: 214px;
    background: rgba(255,255,255,0.90);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .suggest span{
    width: 48px;
    font-size: 24px;
    color: #5C6066;
    line-height: 24px;
  }
  .show-none{
    display: none;
  }
</style>
