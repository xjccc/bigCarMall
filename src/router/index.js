import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Home from '@/page/Home'
// 选车
import ChooseCar from '@/page/selectCar/ChooseCar'
// 获取报价
import GetPrice from '@/page/selectCar/GetPrice'
// 促销活动
import DiscountActive from '@/page/discountActive/DiscountActive'
// 车辆详情
import Detail from '@/page/detail/Detail'
// 支付信息
import Confirm from '@/page/orderInfo/Confirm'
// 支付完成
import CompletePay from '@/page/orderInfo/CompletePay'
// 活动列表
import Active from '@/page/active/Active'
// 活动列表详情
import ActiveDetail from '@/page/activeDetail/Detail'
// 活动支付信息
import ActiveComfirm from '@/page/activeOrder/Comfirm'
// 活动支付完成
import ActiveCompletePay from '@/page/activeOrder/CompletePay'
// 经销商报价
import Dealer from '@/page/dealer/Dealer'
// 个人中心
import Mine from '@/page/mine/Mine'
// 意见反馈
import MyBuy from '@/page/mine/MyBuy'
// 意见反馈
import MyActive from '@/page/mine/MyActive'
// 意见反馈
import Suggest from '@/page/mine/Suggest'

// app端的选择城市页面
import AppLocation from '@/page/appLocation/Location'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/dacheshi'
    },
    // 首页
    {
      path: '/dacheshi',
      name: 'Home',
      component: Home
    },
    // 选车
    {
      path: '/dacheshi/car',
      name: 'ChooseCar',
      component: ChooseCar
    },
    // 获取报价
    {
      path: '/dacheshi/car/price',
      name: 'GetPrice',
      component: GetPrice
    },
    // 促销活动
    {
      path: '/dacheshi/discountActive',
      name: 'DiscountActive',
      component: DiscountActive
    },
    // 车辆详情
    {
      path: '/dacheshi/carDetail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      // 确认支付
      path: '/dacheshi/orderInfo/confirm',
      name: 'Confirm',
      component: Confirm
    },
    {
      // 支付完成
      path: '/dacheshi/orderInfo/complete/:id',
      name: 'CompletePay',
      component: CompletePay
    },
    // 活动列表
    {
      path: '/dacheshi/active',
      name: 'Active',
      component: Active
    },
    // 活动详情
    {
      path: '/dacheshi/active/detail/:id',
      name: 'ActiveDetail',
      component: ActiveDetail
    },
    // 活动支付信息
    {
      path: '/dacheshi/active/confirm',
      name: 'ActiveComfirm',
      component: ActiveComfirm
    },
    // 活动支付W按成
    {
      path: '/dacheshi/active/complete/:id',
      name: 'ActiveCompletePay',
      component: ActiveCompletePay
    },
    // 经销商报价
    {
      path: '/dacheshi/dealer',
      name: 'Dealer',
      component: Dealer
    },
    // 个人中心
    {
      path: '/dacheshi/mine',
      name: 'Mine',
      component: Mine
    },
    // 我买的车
    {
      path: '/dacheshi/mine/mycar',
      name: 'MyBuy',
      component: MyBuy
    },
    // 我参加的活动
    {
      path: '/dacheshi/mine/myactive',
      name: 'MyActive',
      component: MyActive
    },
    // 意见反馈
    {
      path: '/dacheshi/mine/suggest',
      name: 'Suggest',
      component: Suggest
    },
    // app端选择地区
    {
      path: '/dacheshi/app/location',
      name: 'AppLocation',
      component: AppLocation
    }
  ]
})

export default router
