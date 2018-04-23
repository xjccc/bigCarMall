<template>
  <!-- 支付完成 -->
  <div class="complete-pay">
    <top-header :title="'活动订单'" :type="'home'"></top-header>
    <div class="compelete-content">
      <pay-info :info="info"></pay-info>
      <dealer-info :info="info"></dealer-info>
      <buyer-info :info="info"></buyer-info>
      <order-info :info="info"></order-info>
    </div>
    <!-- 底部footer操作 -->
    <complete-footer :actions="footerShow" @tel="tel" @telUs="telUs" @backMoney="backMoney"></complete-footer>
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
import PayInfo from '@/components/activeOrder/PayInfo'
import DealerInfo from '@/components/activeDetail/DealerInfo'
import BuyerInfo from '@/components/activeOrder/BuyerInfo'
import OrderInfo from '@/components/activeOrder/OrderInfo'
import CompleteFooter from '@/components/activeOrder/CompleteFooter'
import DialogContent from '@/components/Dialog'
let flag = false

export default {
  components: {
    TopHeader,
    PayInfo,
    DealerInfo,
    BuyerInfo,
    OrderInfo,
    CompleteFooter,
    DialogContent
  },
  computed: {
    footerShow() {
      if (this.info.is_use_code) {
        return 'used'
      } else if (this.info.refund_time) {
        return 'back-money'
      }
      return 'all'
    }
  },
  data: () => ({
    // 页面loading
    isLoading: true,
    // 用户信息
    userInfo: {},
    // 订单信息
    info: {},
    // 订单id
    orderid: '',
    // 通过我的页面点击进来的
    myIndex: -1,
    // 通过我的界面点击进入的，获取list缓存
    myActiveList: [],
    // 购车人信息
    buyerInfo: {},
    // 是否显示提示
    showDialog: false,
    // 确认提示
    dialogInfo: ''
  }),
  created() {
    // 微信中，支付完成跳转白屏
    setTimeout(() => {
      this.orderid = this.$route.params.id
      let index = this.$route.query.index
      if (index !== undefined) {
        this.myIndex = index
        this.myActiveList = this.getStorage('myActiveList')
      }
      this.userInfo = this.getStorage('bigCarMallUserInfo')
      this.fetch()
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
    }, 800)
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
          } else {
            this.$router.go(-2)
          }
        }
      )
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
    // 取消提示
    closeDialog() {
      flag = false
      this.showDialog = false
    },
    confirm() {
      // 点击确定就取消弹窗
      this.showDialog = false
      // 退款中
      this.$showToast.show({
        type: 'loading',
        text: '退款中..'
      })
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
                this.myActiveList[this.myIndex],
                'status_name',
                '已退款'
              )
              // 重新设置缓存
              this.setStorage('myActiveList', this.myActiveList)
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
    padding-bottom: 8px;
  }
</style>
