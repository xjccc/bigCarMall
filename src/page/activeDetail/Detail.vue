<template>
  <div class="detail" v-cloak>
    <top-header :type="'share'" :title="'活动详情'" @share="shareInfo"></top-header>
    <div class="detail-content" ref="detail">
      <!-- 图片轮播 -->
      <swiper :data="imgData"></swiper>
      <!-- 车辆信息 -->
      <car-info :info="carInfoData" v-if="carInfoData"></car-info>
      <!-- 经销商信息 -->
      <dealer-info :info="dealerInfoData"></dealer-info>
      <!-- 适用品牌 -->
      <show-name :info="nameInfo"></show-name>
      <!-- 活动规则 -->
      <div class="rules" v-if="ruleExplain">
        <span class="title">活动规则</span>
        <span class="rule-content">{{ruleExplain}}</span>
      </div>
      <!-- 购车流程 -->
      <buy-process></buy-process>
      <!-- 为什么选择卡车之家大车市 -->
      <why-choose></why-choose>
    </div>
    <!-- 进行预约支付 -->
    <div class="detail-footer">
      <span class="buyCall" @click="tel" v-if="Dealer400Tel">联系商家</span>
      <div class="ordered order-now" v-if="productState === 1" @click="payFor">
        <span class="look-car">{{status}}</span>
        <span class="pre-pay">(支付{{carInfoData.pay_money}}元)</span>
      </div>
      <div class="ordered order-pre" v-if="productState === 4">{{status}}</div>
      <div class="ordered order-none" v-if="productState === 2 || productState === 3">{{status}}</div>
    </div>
    <!-- 页面loading -->
    <div class="loading" v-if="isLoading">
      <v-loading></v-loading>
    </div>
    <!-- 显示分享 -->
    <share-info :showShare="showShare" @cancle="cancle" @shareFriend="shareFriend" @shareCircle="shareCircle"></share-info>
    <!-- 微信中分享提示 -->
    <wx-share :wxShow="wxShow"></wx-share>
    <!-- m端分享提示 -->
    <m-share :mShow="mShow" v-if="mShow" @cancle="mShareCancle"></m-share>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import Swiper from '@/components/detail/Swiper'
import CarInfo from '@/components/activeDetail/CarInfo'
import ShowName from '@/components/activeDetail/ShowName'
import DealerInfo from '@/components/activeDetail/DealerInfo'
import BuyProcess from '@/components/detail/BuyProcess'
import WhyChoose from '@/components/detail/WhyChoose'
import ShareInfo from '@/components/ShareInfo'
import WxShare from '@/components/WxShare'
import MShare from '@/components/MShare'
import TruckLogin from '../../mixins/login.js'

export default {
  components: {
    TopHeader,
    Swiper,
    CarInfo,
    ShowName,
    DealerInfo,
    BuyProcess,
    WhyChoose,
    ShareInfo,
    WxShare,
    MShare
  },
  computed: {
    status() {
      switch (this.productState) {
        case 2:
          return '活动结束'
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
    // 页面loading
    isLoading: true,
    // 显示分享
    showShare: false,
    // 产品详情id
    id: '',
    // 图片轮播
    imgData: [],
    // 车辆信息
    carInfoData: {},
    // 经销商信息
    dealerInfoData: {},
    nameInfo: {
      // brandName
      brandName: '',
      // SeriesName
      SeriesName: '',
      // TruckProductName
      TruckProductName: ''
    },
    // 活动规则
    ruleExplain: '',
    // 联系商家
    Dealer400Tel: '',
    // 按钮状态1. 正常 (参与活动)  2.活动结束 3.已抢光 4.活动未开始
    productState: 1,
    // 微信中分享提示
    wxShow: false,
    // m端分享提示
    mShow: false
  }),
  beforeCreate() {
    TruckLogin.init()
  },
  created() {
    this.id = this.$route.params.id
    this.fetch()

    // app传title
    this.callNativeMethod('onChangeWebTitle', {
      changeWebTitle: '活动详情'
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
          title: `${this.carInfoData.product_name}优惠活动_手机卡车之家大车市`, // 分享标题
          link: location.href, // 分享链接
          imgUrl: this.imgData[0].ImgUrl, // 分享图标
          success: () => {}
        })
        wx.onMenuShareAppMessage({
          title: `${this.carInfoData.product_name}优惠活动_手机卡车之家大车市`, // 分享标题
          desc: `${this.carInfoData.product_name}优惠活动：支付${
            this.carInfoData.pay_money
          }折扣${this.carInfoData.Deductible}。${
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
            // 适用品牌
            this.nameInfo.brandName = res.data.BrandName
            // 适用车系
            this.nameInfo.SeriesName = res.data.SeriesName
            // 适用车型
            this.nameInfo.TruckProductName = res.data.TruckProductName
            // 车辆相关信息
            this.$set(this.carInfoData, 'product_name', res.data.TitleStr)
            this.$set(this.carInfoData, 'dealer_name', res.data.DealerName)
            // 开始时间
            this.$set(this.carInfoData, 'OnSaleTime', res.data.OnSaleTime)
            // 结束时间
            this.$set(this.carInfoData, 'EndTime', res.data.EndTime)
            // 库存
            this.$set(this.carInfoData, 'Inventory', res.data.Inventory)
            // 支付金额
            this.$set(this.carInfoData, 'pay_money', res.data.Margin)
            // 折扣金额
            this.$set(this.carInfoData, 'Deductible', res.data.Deductible)
            // 经销商信息
            this.$set(this.dealerInfoData, 'level_name', res.data.Levelstr)
            this.$set(this.dealerInfoData, 'dealer_name', res.data.DealerName)
            this.$set(this.dealerInfoData, 'dealerUrl', res.data.mUrl)
            this.$set(
              this.dealerInfoData,
              'dealer_address',
              res.data.DealerAddress
            )
            // 400电话
            this.Dealer400Tel = res.data.Dealer400Tel
            // 活动状态
            this.productState = res.data.ProductState
            // 设置标题头
            document.title = `${res.data.TitleStr}报价_手机卡车之家大车市`
            document.querySelector('meta[name=keywords]').content =
              res.data.TitleStr
            document.querySelector('meta[name=description]').content = `${
              res.data.TitleStr
            }支付${res.data.Margin}元抵扣${res.data.Deductible}元。${
              res.data.TitleStr
            }价格信息，由【卡车之家大车市】提供`
            // 分享配置
            this.shareNowPage()
          }
        }
      )
    },
    // 购车咨询
    tel() {
      window.location.href = `tel://${this.Dealer400Tel}`
    },
    // 支付
    payFor() {
      // 先判断是否登陆过，没有登陆过，需要进行登陆
      if (this.userid === null || this.userid === '0' || !this.userid) {
        // 跳转登陆存储id值
        this.setStorage('activeLogin', `_${this.id}`)
        TruckLogin.ToLogin()
      } else {
        this.$set(this.dealerInfoData, 'dealerUrl', '')
        this.$router.push({
          path: '/dacheshi/active/confirm',
          query: {
            info: JSON.stringify(this.carInfoData),
            dealerInfo: JSON.stringify(this.dealerInfoData),
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
  .rules{
    margin-top: 8px;
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    background: #fff;
  }
  .rule-content{
    margin-top: 16px;
    font-size: 14px;
    color: #5C6066;
    line-height: 20px;
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
