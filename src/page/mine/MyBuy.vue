<template>
  <div class="my-car">
    <top-header :title="'我买的车'"></top-header>
    <div class="car-content" @scroll="loadMore" ref="content">
      <template v-for="(item, index) in carData">
        <item-car :data="item" @toOrderDetail="toOrderDetail(item.order_code, index)"></item-car>
      </template>
      <!-- 空内容 -->
      <div class="empty" v-if="!carData.length">
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
    <!-- 页面loading -->
    <div class="loading" v-if="isLoading">
      <v-loading></v-loading>
    </div>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import ItemCar from '@/components/mine/ItemCar'

let flag = false
export default {
  components: {
    TopHeader,
    ItemCar
  },
  data: () => ({
    // 进入页面loading
    isLoading: true,
    // 用户id
    userid: '',
    // 类型， 1、整车 2、活动
    type: 1,
    // 当前页
    page: 1,
    // 每页条数
    size: 10,
    // 数组数据
    carData: [],
    // 加载loading
    loadingMore: false,
    // 没有更多
    noMore: false
  }),
  created() {
    // app传title
    this.callNativeMethod('onChangeWebTitle', {
      changeWebTitle: '我买的车'
    })
    // 没有地区筛选
    this.callNativeMethod('onShowLocationInfo', { location: '' })
    // 不显示分享按钮
    this.callNativeMethod('onShowShareButton', {
      isShow: false
    })
    // this.userid = this.$route.query.id
    // let info = this.getStorage('myBuyCarList')
    // if (info) {
    //   this.carData = info
    // } else {
    //   this.fetch()
    // }
  },
  methods: {
    // 进行数据请求
    fetch() {
      this.ajax(
        `User/Order/GetOrderList.aspx?userid=${this.userid}&type=${
          this.type
        }&currentpage=${this.page}&pagesize=${this.size}`,
        res => {
          if (this.page === 1) {
            this.carData = res.data.order
          } else {
            this.carData = this.carData.concat(res.data.order)
            this.$nextTick(() => {
              flag = false
              // 取消加载
              this.loadingMore = false
              if (res.data.CurrentPage !== 1 && !res.data.order.length) {
                flag = true
                this.noMore = true
              }
            })
          }
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
    // 跳转订单详情
    toOrderDetail(id, index) {
      let content = this.$refs.content
      let info = {
        top: content.scrollTop,
        page: this.page
      }
      this.setStorage('myBuyCarInfo', info)
      this.$router.push({
        path: `/dacheshi/orderInfo/complete/${id}`,
        query: {
          index: index
        }
      })
    }
  },
  // 路由进入
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 隐藏微信菜单
      vm.wxHideMenus()
      vm.userid = vm.$route.query.id
      flag = false
      if (from.name === 'CompletePay') {
        let info = vm.getStorage('myBuyCarInfo')
        let data = vm.getStorage('myBuyCarList')
        vm.carData = data
        if (info) {
          // 延迟进行top赋值
          setTimeout(() => {
            vm.$refs.content.scrollTop = info.top
            vm.page = info.page
            vm.isLoading = false
          }, 300)
        }
      } else {
        // 非详情页跳转回来
        vm.fetch()
      }
    })
  },
  // 路由跳转
  beforeRouteLeave(to, from, next) {
    if (to.name === 'CompletePay') {
      this.setStorage('myBuyCarList', this.carData)
    } else {
      this.removeStorage('myBuyCarList')
      this.removeStorage('myBuyCarInfo')
    }
    next()
  }
}
</script>
<style scoped>
  .my-car{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .car-content{
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>
