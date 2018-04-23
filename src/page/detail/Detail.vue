<template>
  <div class="detail" v-cloak>
    <top-header :type="'share'" :title="'车型详情'" @share="shareInfo"></top-header>
    <div class="detail-content" ref="detail">
      <!-- 图片轮播 -->
      <swiper :data="imgData"></swiper>
      <!-- 车辆信息 -->
      <car-info :info="carInfoData" v-if="carInfoData"></car-info>
      <!-- 认证显示 -->
      <div class="show-tips">
        <span>真实车源</span>
        <span>认证商家</span>
        <span>订金随时退</span>
        <span>支付无忧</span>
      </div>
      <!-- 其他优惠 -->
      <div class="new-discount" v-if="couponList.length">
        <div class="new-discount-header">
          <span class="header-title">更多优惠</span>
          <!-- <span class="more" @click="moreDiscount">更多</span> -->
        </div>
        <template v-for="item in couponList">
          <div class="new-discount-content" @click="otherCoupon(item.ProductId)">
            <span class="new-discount-pre">活动</span>
            <span class="new-discount-title">{{item.TitleStr}}</span>
          </div>
        </template>
      </div>
      <!-- 参数配置 -->
      <config :data="configData" @showMoreDetail="showMoreDetail"></config>
      <!-- 测评文章 -->
      <shop-article :articleData="articleData" v-if="articleData.length"></shop-article>
      <!-- 购车流程 -->
      <buy-process></buy-process>
      <!-- 为什么选择卡车之家大车市 -->
      <why-choose></why-choose>
      <!-- 店内新车 -->
      <new-car :newCarData="newCarData" @toDetail="toDetail" @more="moreCar" v-if="newCarData.length"></new-car>
    </div>
    <!-- 页面loading -->
    <div class="loading" v-if="isLoading">
      <v-loading></v-loading>
    </div>
    <!-- 显示分享 -->
    <share-info :showShare="showShare" @cancle="cancle" @shareFriend="shareFriend" @shareCircle="shareCircle"></share-info>
    <!-- 微信中分享提示 -->
    <wx-share :wxShow="wxShow" v-show="wxShow"></wx-share>
    <!-- m端分享提示 -->
    <m-share :mShow="mShow" v-show="mShow" @cancle="mShareCancle"></m-share>
    <!-- 更多参数 -->
    <more-config :data="configData" :showDetail="showDetail" @close="close"></more-config>
    <!-- 进行预约支付 -->
    <div class="detail-footer">
      <span class="buyCall" @click="tel" v-if="Dealer400Tel">购车咨询</span>
      <div class="ordered order-now" @click="lookCarAndPay" v-if="productState === 1">
        <span class="look-car">预约看车</span>
        <span class="pre-pay">(支付{{pay_price}}元订金)</span>
      </div>
      <div class="ordered order-pre" v-if="productState === 4">{{status}}</div>
      <div class="ordered order-none" v-if="productState === 2 || productState === 3">{{status}}</div>
    </div>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import Swiper from '@/components/detail/Swiper'
import CarInfo from '@/components/detail/CarInfo'
import Config from '@/components/detail/Config'
import MoreConfig from '@/components/detail/MoreConfig'
import ShopArticle from '@/components/detail/ShopArticle'
import BuyProcess from '@/components/detail/BuyProcess'
import WhyChoose from '@/components/detail/WhyChoose'
import NewCar from '@/components/detail/NewCar'
import ShareInfo from '@/components/ShareInfo'
import WxShare from '@/components/WxShare'
import MShare from '@/components/MShare'
import TruckLogin from '../../mixins/login.js'

export default {
  components: {
    TopHeader,
    Swiper,
    CarInfo,
    Config,
    MoreConfig,
    ShopArticle,
    BuyProcess,
    WhyChoose,
    NewCar,
    ShareInfo,
    WxShare,
    MShare
  },
  computed: {
    status() {
      switch (this.productState) {
        case 2:
          return '已下架'
        case 3:
          return '已抢光'
        case 4:
          return '活动未开始'
        default:
          return '参与活动'
      }
    }
  },
  data: () => ({
    // 用户userid
    userid: null,
    // loading
    isLoading: true,
    // 显示分享
    showShare: false,
    // 详情页title
    title: '',
    // 产品productid
    id: '',
    // 经销商id
    dealerId: '',
    // 图片数组
    imgData: [],
    // 车辆信息
    carInfoData: {},
    // 其他优惠
    couponList: [],
    // 显示更多参数
    showDetail: false,
    // 参数配置
    configData: [],
    // 测评文章
    articleData: [],
    // 店内新车
    newCarData: [],
    // 支付金额
    pay_price: '',
    // 联系商家
    Dealer400Tel: '',
    // 更多新车
    moreCarUrl: '',
    // 微信中分享提示
    wxShow: false,
    // m端分享提示
    mShow: false,
    // 按钮状态1. 正常 (参与活动)  2.活动结束 3.已抢光 4.活动未开始
    productState: 1
  }),
  beforeCreate() {
    TruckLogin.init()
  },
  created() {
    this.id = this.$route.params.id
    this.fetch()
    // app传title
    this.callNativeMethod('onChangeWebTitle', {
      changeWebTitle: '车型详情'
    })
    // 没有地区筛选
    this.callNativeMethod('onShowLocationInfo', { location: '' })
    // 显示分享
    this.callNativeMethod('onShowShareButton', {
      isShow: true
    })
  },
  mounted() {
    // 判断登录状态
    this.getUserUid()
  },
  methods: {
    // 分享当前页
    shareNowPage() {
      let wx = window.wx
      wx.ready(() => {
        wx.hideAllNonBaseMenuItem()
        wx.onMenuShareTimeline({
          title: `${this.carInfoData.product_name}报价_手机卡车之家大车市`, // 分享标题
          link: location.href, // 分享链接
          imgUrl: this.imgData[0].ImgUrl, // 分享图标
          success: () => {}
        })
        wx.onMenuShareAppMessage({
          title: `${this.carInfoData.product_name}报价_手机卡车之家大车市`, // 分享标题
          desc: `${this.carInfoData.product_name}报价：商城价${
            this.carInfoData.VehiclePrice
          }万元,${this.carInfoData.Introduction}。${
            this.carInfoData.product_name
          }价格信息，由【卡车之家大车市】提供。`, // 分享描述
          link: location.href, // 分享链接
          imgUrl: this.imgData[0].ImgUrl, // 分享图标
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
        `https://dealer-api.360che.com/bigchemall/User/GetUserInfo.aspx`,
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
    fetch() {
      this.ajax(
        `ShopProduct/GetShopSaleProductInfo.aspx?longproduct=${this.id}`,
        res => {
          if (res.data.status === 1) {
            // 图片赋值
            this.imgData = res.data.ListImg
            // 经销商id
            this.dealerId = res.data.DealerId
            // 车辆相关信息
            this.$set(this.carInfoData, 'product_name', res.data.TitleStr)
            this.$set(this.carInfoData, 'VehiclePrice', res.data.VehiclePrice)
            this.$set(this.carInfoData, 'level_name', res.data.Levelstr)
            this.$set(this.carInfoData, 'dealer_name', res.data.DealerName)
            // 副标题
            this.$set(this.carInfoData, 'Introduction', res.data.Introduction)
            // 库存
            this.$set(this.carInfoData, 'Inventory', res.data.Inventory)
            // 是否附加条件
            this.$set(this.carInfoData, 'Isextras', res.data.Isextras)
            // 支付金额
            this.$set(this.carInfoData, 'Margin', res.data.Margin)
            // 店铺跳转url
            this.$set(this.carInfoData, 'dealerUrl', res.data.mUrl)
            // 支付金额
            this.pay_price = res.data.Margin
            // 其他优惠
            this.couponList = res.data.ShopOtherProductCouponList
            // 参数配置
            this.configData = res.data.ListParameter
            // 测评文章
            this.articleData = res.data.ShopArticleCategoryList
            this.newCarData = res.data.OtherProductlist
            // 400电话
            this.Dealer400Tel = res.data.Dealer400Tel
            // 更多新车
            this.moreCarUrl = res.data.mUrl
            // 活动状态
            this.productState = res.data.ProductState
            // 设置标题头
            document.title = `${res.data.TitleStr}报价_手机卡车之家大车市`
            document.querySelector('meta[name=keywords]').content =
              res.data.TitleStr
            document.querySelector('meta[name=description]').content = `${
              res.data.TitleStr
            }报价：商城价${res.data.VehiclePrice}万元，${
              res.data.Introduction
            }。${res.data.TitleStr}价格信息，由【卡车之家大车市】提供`
            // 分享设置
            this.shareNowPage()
          }
        }
      )
    },
    // 更多优惠
    moreDiscount() {
      console.log('更多优惠')
    },
    // 其他优惠
    otherCoupon(id) {
      this.$router.push({ path: `/dacheshi/active/detail/${id}` })
    },
    // 显示更多参数
    showMoreDetail() {
      this.showDetail = true
    },
    // 关闭更多参数弹层
    close() {
      this.showDetail = false
    },
    // 跳转详情
    toDetail(id) {
      this.$router.push({ path: `/dacheshi/carDetail/${id}` })
    },
    // 更多新车跳转店铺
    moreCar() {
      window.location.href = this.moreCarUrl
    },
    // 购车咨询
    tel() {
      window.location.href = `tel://${this.Dealer400Tel}`
    },
    // 预约看车
    lookCarAndPay() {
      // 先判断是否登陆过，没有登陆过，需要进行登陆
      if (this.userid === null || this.userid === '0' || !this.userid) {
        // 跳转登陆存储id值
        this.setStorage('detailLogin', `_${this.id}`)
        TruckLogin.ToLogin()
      } else {
        this.$router.push({
          path: '/dacheshi/orderInfo/confirm',
          query: {
            info: JSON.stringify(this.carInfoData),
            img: this.imgData[0].ImgUrl,
            id: this.id,
            dealerid: this.dealerId,
            dealerTel: this.Dealer400Tel
          }
        })
      }
    },
    // 分享
    shareInfo() {
      if (this.getType() === 'weixin') {
        this.wxShow = true
        let timer = setTimeout(() => {
          this.wxShow = false
          timer && clearTimeout(timer)
        }, 1500)
      } else {
        this.showShare = true
      }
    },
    // 取消分享
    cancle() {
      this.showShare = false
    },
    // 分享给朋友
    shareFriend() {
      this.mShow = true
      this.showShare = false
    },
    // 分享到朋友圈
    shareCircle() {
      this.mShow = true
      this.showShare = false
    },
    // m 端关闭分享弹层
    mShareCancle() {
      this.mShow = false
    }
  },
  // 路由改变时
  beforeRouteUpdate(to, from, next) {
    this.id = to.params.id
    this.isLoading = true
    this.$refs.detail.scrollTop = 0
    this.fetch()
    this.getUserUid()
    next()
  }
}
</script>
<style scoped>
  .detail{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .detail-content{
    flex: 1;
    padding-bottom: 58px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .new-discount{
    font-size: 0;
    padding: 0 16px 10px;
    background: #fff;
  }
  .new-discount-pre{
    display: inline-block;
    width: 24px;
    height: 12px;
    line-height: 12px;
    padding: 3px 4px;
    font-size: 12px;
    border-radius: 2px;
    color: #fff;
    background-color: #F44336;
  }
  .new-discount-title{
    flex: 1;
    word-break: break-all;
    font-size: 14px;
    line-height: 20px;
    color: #17181A;
    margin-left: 4px;
  }
  .new-discount-content{
    padding: 6px 0;
  }
  .new-discount-header{
    margin-top: 8px;
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .header-title{
    font-size: 20px;
    font-weight: bold;
    color: #17181A;
    line-height: 30px;
  }
  .more{
    width: 80px;
    text-align: right;
    font-size: 14px;
    color: #A1A9B2;
    line-height: 48px;
  }
  .more:after{
    font-family: 'carMall';
    margin-left: 4px;
    font-size: 12px;
    content: "\e70d";
    color: #CFD3D8;
  }
  .show-tips{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px 16px;
    background: #FAFAFA;
  }
  .show-tips span{
    margin-right: 12px;
    font-size: 12px;
    color: #94BAFF;
    line-height: 18px;
  }
  .show-tips span:before{
    margin-right: 2px;
    font-family: 'carMall';
    content: "\e6b0";
  }
  .detail-footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    background: #fff;
    box-shadow: 0 0 0 0 #DDDDDD;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 4;
  }
  .buyCall{
    flex: 1;
    text-align: center;
    color: #5C6066;
  }
  .buyCall:before{
    margin-right: 4px;
    font-family: 'carMall';
    content: "\e706";
    color: #5C6066;
  }
  .ordered{
    height: 50px;
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .order-now{
    background: #FF6600;
  }
  .order-none{
    background: #FFC299;
  }
  .order-pre{
    background: #FFD158;
  }
  .look-car{
    font-weight: bold;
    font-size: 18px;
    color: #fff;
    line-height: 20px;
  }
  .pre-pay{
    margin-top: 2px;
    font-size: 12px;
    color: rgba(255,255,255,0.70);
    line-height: 14px;
  }
</style>
