<template>
  <!-- 支付完成 -->
  <div class="complete-pay">
    <top-header :title="'预约订单'" :type="'home'"></top-header>
    <div class="compelete-content">
      <car-info :info="info"></car-info>
      <buyer-info :info="info"></buyer-info>
      <order-info :info="info"></order-info>
      <div class="tips">
        <span class="is-tips">*不买车可随时退还订金</span>
        <span class="user-service" @click="showServiceView">用户服务协议</span>
      </div>
      <!-- 用户协议 -->
      <service :showService="showService" @close="closeService"></service>
    </div>
    <!-- 底部footer操作 -->
    <complete-footer :actions="footerShow" @tel="tel" @telUs="telUs" @backMoney="backMoney" @getCar="getCar"></complete-footer>
    <!-- 提示 -->
    <dialog-content v-if="showDialog" :info="dialogInfo" @close="closeDialog" @confirm="confirm"></dialog-content>
    <!-- 页面loading -->
    <div class="loading" v-if="isLoading">
      <v-loading></v-loading>
    </div>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import CarInfo from '@/components/orderInfo/CarInfo'
import BuyerInfo from '@/components/orderInfo/BuyerInfo'
import OrderInfo from '@/components/orderInfo/OrderInfo'
import CompleteFooter from '@/components/orderInfo/CompleteFooter'
import Service from '@/components/mine/Service'
import DialogContent from '@/components/Dialog'
let flag = false

export default {
  components: {
    TopHeader,
    CarInfo,
    BuyerInfo,
    OrderInfo,
    CompleteFooter,
    Service,
    DialogContent
  },
  computed: {
    footerShow() {
      if (this.info.finish_date) {
        return 'get-car'
      } else if (this.info.refund_time) {
        return 'back-money'
      }
      return 'all'
    }
  },
  data: () => ({
    // 页面loading
    isLoading: true,
    // 是否显示用户协议
    showService: false,
    // 用户信息
    userInfo: {},
    // 订单信息
    info: {},
    // 订单id
    orderid: '',
    // 通过我的页面点击进来的
    myIndex: -1,
    // 通过我的界面点击进入的，获取list缓存
    myBuyCarList: [],
    // 购车人信息
    buyerInfo: {},
    // 是否显示提示
    showDialog: false,
    // 确认提示
    dialogInfo: '',
    // 确认状态
    dialogType: -1
  }),
  created() {
    // 隐藏wx分享菜单
    this.wxHideMenus()
    this.orderid = this.$route.params.id
    let index = this.$route.query.index
    if (index !== undefined) {
      this.myIndex = index
      this.myBuyCarList = this.getStorage('myBuyCarList')
    }
    this.userInfo = this.getStorage('bigCarMallUserInfo')
    this.fetch()
  },
  methods: {
    // 进行订单详情请求
    fetch() {
      this.ajax(
        `User/Order/GetOrderDetail.aspx?order_code=${this.orderid}&userid=${
          this.userInfo.uid
        }`,
        res => {
          if (res.data.isok === '1') {
            this.info = res.data.data
            this.isLoading = false
          }
        }
      )
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
    tel() {
      window.location.href = `tel://${this.info.dealer_tel}`
    },
    // 联系客服
    telUs() {
      window.location.href = `tel://${4006136188}`
    },
    // 申请退款
    backMoney() {
      // 防止重复点击
      if (flag) return
      flag = true
      this.showDialog = true
      this.dialogInfo = '是否申请退款'
      this.dialogType = 1
    },
    // 确认提车
    getCar() {
      if (flag) return
      flag = true
      this.showDialog = true
      this.dialogInfo = '是否确认提车'
      this.dialogType = 2
    },
    // 取消提示
    closeDialog() {
      flag = false
      this.showDialog = false
    },
    // 确认操作
    confirm() {
      // 点击确定就取消弹窗
      this.showDialog = false
      if (this.dialogType === 1) {
        // 退款中
        this.$showToast.show({
          type: 'loading',
          text: '退款中..'
        })
        // 确认申请退款
        this.ajax(
          `User/Order/ApplyRefund.aspx?order_code=${this.orderid}&userid=${
            this.userInfo.uid
          }`,
          res => {
            if (res.data.isok === '1') {
              this.$showToast.show({
                type: 'success',
                text: '退款成功'
              })
              if (this.myIndex !== -1) {
                this.$set(
                  this.myBuyCarList[this.myIndex],
                  'status_name',
                  '已退款'
                )
                // 重新设置缓存
                this.setStorage('myBuyCarList', this.myBuyCarList)
              }
              this.$set(this.info, 'refund_time', res.data.refund_time)
            } else {
              this.$showToast.show({
                type: 'error',
                text: '退款失败'
              })
            }
            flag = false
          }
        )
      } else {
        // 提车中
        this.$showToast.show({
          type: 'loading',
          text: '提车中..'
        })
        // 确认提车
        this.ajax(
          `User/Order/ExtractVehicle.aspx?order_code=${this.orderid}&userid=${
            this.userInfo.uid
          }`,
          res => {
            if (res.data.isok === '1') {
              this.$showToast.show({
                type: 'success',
                text: '提车成功'
              })
              if (this.myIndex !== -1) {
                this.$set(
                  this.myBuyCarList[this.myIndex],
                  'status_name',
                  '已提车'
                )
                // 重新设置缓存
                this.setStorage('myBuyCarList', this.myBuyCarList)
              }
              this.$set(this.info, 'finish_date', res.data.finish_date)
            } else {
              this.showDialog = false
              this.$showToast.show({
                type: 'error',
                text: '提车失败'
              })
            }
            flag = false
          }
        )
      }
    }
  }
}
</script>
<style scoped>
  .complete-pay{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .compelete-content{
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 16px;
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
</style>
