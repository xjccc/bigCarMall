<template>
  <div class="confirm" v-cloak>
    <top-header :title="'预约订单'"></top-header>
    <div class="confirm-content">
      <!-- 显示车辆信息 -->
      <car-info :info="info"></car-info>
      <!-- 购车人信息 -->
      <div class="item-info">
        <div class="item-person">
          <span>购车人信息</span>
        </div>
        <div class="item">
          <span>填写姓名</span>
          <input type="text" maxlength="11" v-model="name" placeholder="请输入您的姓名">
          <em>*</em>
        </div>
        <div class="item">
          <span>电话号码</span>
          <input type="tel" maxlength="11" v-model="telNumber" placeholder="请输入您的联系方式">
          <em>*</em>
        </div>
        <div class="item" @click="chooseCity">
          <span>提车城市</span>
          <span class="city-info" v-if="cityData.provinceName">{{cityData.provinceName}} {{cityData.cityName}}</span>
          <span class="choose-city" v-else>请选择提车城市</span>
          <em v-if="!cityData.provinceName">*</em>
        </div>
      </div>
      <div class="order-price">
        <div class="item">
          <span>支付金额</span>
          <span class="price-pay">{{info.Margin}}元<em class="pre-price">(订金)</em></span>
        </div>
      </div>
      <div class="tips">
        <span class="is-tips">*不买车可随时退还订金</span>
        <span class="user-service" @click="showServiceView">用户服务协议</span>
      </div>
    </div>
    <div class="confirm-footer">
      <span class="buy-call" @click="concatDealer" v-if="dealerTel">联系商家</span>
      <span class="pay-money" @click="showPay">确认支付</span>
    </div>
    <!-- 用户协议 -->
    <service :showService="showService" @close="closeService"></service>
    <!-- 支付弹层 -->
    <pay :showPay="showPayView" :payMoney="info.Margin" @pay="pay" @close="closePay"></pay>
    <!-- 提车城市 -->
    <action-sheet :showAction="showSelectCity" :provinceData="provinceData" :dealerId="dealerId" @close="closeSelectCity" @chooseCity="confirmChooseCity"></action-sheet>
    <!-- 错误提示 -->
    <dialog-content :type="'know'" v-if="dialogShowToast" :info="dialogInfo" @close="closeDialog"></dialog-content>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import CarInfo from '@/components/orderInfo/CarInfo'
import Service from '@/components/mine/Service'
import Pay from '@/components/orderInfo/Pay'
import ActionSheet from '@/components/orderInfo/ActionSheet'
import DialogContent from '@/components/Dialog'
let flag = false

export default {
  components: {
    TopHeader,
    CarInfo,
    Service,
    Pay,
    ActionSheet,
    DialogContent
  },
  created() {
    this.info = JSON.parse(this.$route.query.info)
    this.info['product_img'] = this.$route.query.img
    this.productid = this.$route.query.id
    this.dealerId = this.$route.query.dealerid
    this.dealerTel = this.$route.query.dealerTel
    let info = this.getStorage('bigCarMallUserInfo')
    if (info) {
      this.userInfo = info
      this.telNumber = info.mobile
    }
    // 获取提车城市
    this.getCarCity()
  },
  data: () => ({
    // 用户的userInfo
    userInfo: '',
    // 订单的productid
    productid: '',
    // 经销商id
    dealerId: '',
    // 车辆信息
    info: {},
    // 车辆图片
    img: '',
    // 姓名
    name: '',
    // 电话
    telNumber: '',
    // 显示支付弹层
    showPayView: false,
    // 是否显示选择城市弹层
    showSelectCity: false,
    // 传入选择省份数据
    provinceData: [],
    // 显示省份城市
    cityData: {
      provinceName: '',
      cityName: ''
    },
    // 提交城市省份
    submit: {
      provincesn: '',
      citysn: ''
    },
    // 显示用户协议
    showService: false,
    // 经销商电话
    dealerTel: '',
    // 错误提示
    dialogInfo: '',
    // 显示错误提示
    dialogShowToast: false
  }),
  methods: {
    // 获取提车城市
    getCarCity() {
      this.ajax(
        `User/GetDealerSalesArea.aspx?dealerid=${this.dealerId}`,
        res => {
          this.provinceData = res.data
        }
      )
    },
    // 显示选择城市
    chooseCity() {
      this.showSelectCity = true
    },
    // 关闭
    closeSelectCity() {
      this.showSelectCity = false
    },
    // 确认选择提车城市
    confirmChooseCity(submit) {
      this.submit.provincesn = submit.provincesn
      this.submit.citysn = submit.citysn
      this.cityData.provinceName = submit.provinceName
      this.cityData.cityName = submit.cityName
    },
    // 显示用户服务协议
    showServiceView() {
      this.showService = true
    },
    // 关闭服务协议
    closeService() {
      this.showService = false
    },
    // 联系商家
    concatDealer() {
      window.location.href = `tel://${this.dealerTel}`
    },
    // 吊起支付弹层
    showPay() {
      // 防止重复点击
      if (flag) return
      flag = true
      // 名字不能为空
      if (!this.name) {
        this.dialogInfo = '名字不能为空~'
        this.dialogShowToast = true
        return
      }
      // 只能是中文
      let abc = /[^\u4e00-\u9fa5]/g
      abc.lastIndex = 0
      if (abc.test(this.name)) {
        this.dialogInfo = '名字只能是中文~'
        this.dialogShowToast = true
        return
      }
      let phone = this.telNumber
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
      // 提车城市不能为空
      if (!this.submit.citysn) {
        this.dialogInfo = '请选择提车城市~'
        this.dialogShowToast = true
        return
      }
      this.showPayView = true
    },
    // 关闭支付弹层
    closePay() {
      flag = false
      this.showPayView = false
    },
    // 关闭提示
    closeDialog() {
      flag = false
      this.dialogShowToast = false
    },
    // 确认支付
    pay(type) {
      this.showPayView = false
      this.ajax(
        `User/Order/AddOrder.aspx?userid=${this.userInfo.uid}&productid=${
          this.productid
        }&username=${this.name}&usertel=${this.telNumber}&provincesn=${
          this.submit.provincesn
        }&citysn=${this.submit.citysn}&paytype=${type}`,
        res => {
          if (res.data.isok === '1') {
            window.location.href = res.data.pay_url
          } else {
            this.$showToast.show({
              type: 'error',
              text: res.data.msg
            })
            this.$router.go(-1)
          }
          flag = false
        }
      )
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.wxHideMenus()
    })
  }
}
</script>
<style scoped>
  .confirm{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  .confirm-content{
    flex: 1;
  }
  .item-info{
    margin-top: 16px;
    padding: 0 32px;
    background: #fff;
  }
  .item-info > .item-person{
    height: 78px;
    line-height: 78px;
    font-size: 28px;
    color: #17181A;
    border-bottom: 2px solid #EDEDED;
  }
  .item-info > .item{
    height: 88px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 2px solid #EDEDED;
  }
  .item-info > .item:last-child{
    height: 90px;
    border-bottom: 0;
  }
  .item-info > .item span{
    width: 128px;
    font-size: 32px;
    color: #5C6066;
  }
  .item-info > .item input{
    margin-left: 24px;
    flex : 1;
    font-size: 32px;
    color: #17181A;
  }
  .item-info > .item input::-webkit-input-placeholder{
    font-size: 32px;
    color: #D1D1D1;
  }
  .item-info > .item em{
    font-size: 32px;
    color: #F44336;
  }
  .item-info > .item span.city-info{
    position: relative;
    margin-left: 24px;
    flex : 1;
    font-size: 32px;
    color: #17181A;
  }
  .item-info > .item span.city-info:after{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 28px;
    line-height: 28px;
    font-family: 'carMall';
    content: "\e70d";
    color: #CFD3D8;
  }
  .item-info > .item span.choose-city{
    padding-left: 24px;
    flex: 1;
    font-size: 32px;
    color: #D1D1D1;
  }
  .order-price{
    margin-top: 16px;
    padding-left: 32px;
    height: 90px;
    line-height: 90px;
    background: #fff;
  }
  .order-price > .item{
    display: flex;
    flex-direction: row;
  }
  .order-price > .item span.price-pay{
    margin-left: 24px;
    font-size: 32px;
    color: #FF6600;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .order-price > .item em.pre-price{
    margin-left: 8px;
    font-size: 24px;
    color: #A1A9B2;
  }
  .tips{
    padding: 0 32px;
    height: 72px;
    line-height: 72px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .is-tips{
    font-size: 24px;
    color: #F44336;
  }
  .user-service{
    font-size: 24px;
    color: #508DFD;
    text-decoration: underline;
  }
  .confirm-footer{
    height: 100px;
    background: #fff;
    box-shadow: 0 0 0 0 #DDDDDD;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .buy-call{
    flex: 1;
    font-size: 28px;
    color: #5C6066;
    text-align: center;
  }
  .buy-call:before{
    margin-right: 8px;
    font-family: 'carMall';
    content: "\e706";
    color: #5C6066;
  }
  .pay-money{
    flex: 2;
    background: #FF6600;
    line-height: 100px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    color: #fff;
  }
</style>
