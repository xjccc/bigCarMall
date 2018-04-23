<template>
  <div class="confirm" v-cloak>
    <top-header :title="'活动订单'"></top-header>
    <div class="confirm-content">
      <!-- 显示车辆信息 -->
      <car-info :info="info"></car-info>
      <!-- 显示经销商信息 -->
      <dealer-info :info="dealerInfo"></dealer-info>
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
        <div class="item-text">
          <div class="text-title">
            <span>备注信息<em>(选填)</em></span>
            <span class="content-num">{{num}}/35</span>
          </div>
          <textarea @input="inputTextArea" v-model="textInput" rows="2" maxlength="35" placeholder="备注信息"></textarea>
        </div>
      </div>
    </div>
    <!-- 支付弹层 -->
    <pay :showPay="showPayView" :payMoney="info.pay_money" @pay="pay" @close="closePay"></pay>
    <!-- 错误提示 -->
    <dialog-content :type="'know'" v-if="dialogShowToast" :info="dialogInfo" @close="closeDialog"></dialog-content>
    <div class="confirm-footer">
      <span class="buy-call" @click="concatDealer" v-if="dealerTel">联系商家</span>
      <span class="pay-money" @click="showPay">支付{{info.pay_money}}元</span>
    </div>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import CarInfo from '@/components/activeOrder/CarInfo'
import DealerInfo from '@/components/activeDetail/DealerInfo'
import Pay from '@/components/orderInfo/Pay'
import DialogContent from '@/components/Dialog'
let flag = false

export default {
  components: {
    TopHeader,
    CarInfo,
    DealerInfo,
    Pay,
    DialogContent
  },
  created() {
    this.info = JSON.parse(this.$route.query.info)
    this.dealerInfo = JSON.parse(this.$route.query.dealerInfo)
    this.info['product_img'] = this.$route.query.img
    this.productid = this.$route.query.id
    this.dealerId = this.$route.query.dealerid
    this.dealerTel = this.$route.query.dealerTel
    let info = this.getStorage('bigCarMallUserInfo')
    if (info) {
      this.userInfo = info
      this.telNumber = info.mobile
    }
    // app传title
    this.callNativeMethod('onChangeWebTitle', {
      changeWebTitle: '活动订单'
    })
    // 没有地区筛选
    this.callNativeMethod('onShowLocationInfo', { location: '' })
    // 不显示分享按钮
    this.callNativeMethod('onShowShareButton', {
      isShow: false
    })
  },
  mounted() {
    this.connectWebViewJavascriptBridge(bridge => {
      bridge.registerHandler('onPayCallback', (data, responseCallback) => {
        if (data === 'success') {
          this.$router.replace(`/dacheshi/active/complete/${this.code}`)
        }
      })
    })
  },
  data: () => ({
    // 用户的userInfo
    userInfo: {},
    // 订单的productid
    productid: '',
    // 经销商id
    dealerId: '',
    // 车辆信息
    info: {},
    // 经销商信息
    dealerInfo: {},
    // 车辆图片
    img: '',
    // 姓名
    name: '',
    // 联系电话
    telNumber: '',
    // 备注
    textInput: '',
    // 显示支付弹层
    showPayView: false,
    // 输入备注字数
    num: 0,
    // 经销商电话
    dealerTel: '',
    // 错误提示
    dialogInfo: '',
    // 显示错误提示
    dialogShowToast: false,
    // code  app
    code: ''
  }),
  methods: {
    // 联系商家
    concatDealer() {
      window.location.href = `tel://${this.dealerTel}`
    },
    // 输入字数
    inputTextArea() {
      this.num = this.textInput.length
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
        }&username=${this.name}&usertel=${
          this.telNumber
        }&provincesn=0&citysn=0&paytype=${type}&remark=${this.textInput}`,
        res => {
          if (res.data.isok === '1') {
            // app微信支付
            if (type === 4) {
              window.WebViewJavascriptBridge.callHandler('onPay', {
                prepay_id: res.data.app_parm.prepay_id,
                nonce_str: res.data.app_parm.nonce_str
              })
              this.code = res.data.order_code
            } else {
              window.location.href = res.data.pay_url
            }
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
  }
  .confirm-content{
    flex: 1;
  }
  .item-info{
    margin-top: 8px;
    padding: 0 16px;
    background: #fff;
  }
  .item-info > .item-person{
    height: 39px;
    line-height: 39px;
    font-size: 14px;
    color: #17181A;
    border-bottom: 1px solid #EDEDED;
  }
  .item-info > .item{
    height: 44px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #EDEDED;
  }
  .item-info > .item:last-child{
    height: 45px;
    border-bottom: 0;
  }
  .item-info > .item span{
    width: 64px;
    font-size: 16px;
    color: #5C6066;
  }
  .item-info > .item input{
    margin-left: 12px;
    flex : 1;
    font-size: 16px;
    color: #17181A;
  }
  .item-info > .item input::-webkit-input-placeholder{
    font-size: 16px;
    color: #D1D1D1;
  }
  .item-info > .item em{
    font-size: 16px;
    color: #F44336;
  }
  .item-info > .item-text{
    padding-bottom: 16px;
    display: flex;
    flex-direction: column;
  }
  .item-info > .item-text .text-title{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #5C6066;
    line-height: 44px;
  }
  .text-title span{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .content-num{
    font-size: 12px;
    color: #A1A9B2;
    line-height: 44px;
  }
  .text-title em{
    font-size: 12px;
    color: #A1A9B2;
    line-height: 44px;
  }
  .item-info > .item-text textarea{
    width: 100%;
    padding: 8px;
    background: #F3F4F5;
    border: 1px solid #EDEDED;
    border-radius: 2px;
    font-size: 14px;
    resize: none;
  }
  .item-info > .item-text textarea::-webkit-input-placeholder{
    font-size: 14px;
    color: #A1A9B2;
  }
  .confirm-footer{
    height: 50px;
    background: #fff;
    box-shadow: 0 0 0 0 #DDDDDD;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .buy-call{
    flex: 1;
    font-size: 14px;
    color: #5C6066;
    text-align: center;
  }
  .buy-call:before{
    margin-right: 4px;
    font-family: 'carMall';
    content: "\e706";
    color: #5C6066;
  }
  .pay-money{
    flex: 2;
    background: #FF6600;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #fff;
  }
</style>
