<template>
  <div class="my-active">
    <top-header :title="'我参加的活动'"></top-header>
    <div class="active-content" @scroll="loadMore" ref="content">
      <template v-for="(item,index) in activeData">
        <item-active :data="item" @toOrderDetail="toOrderDetail(item.order_code, index)"></item-active>
      </template>
      <!-- 空内容 -->
      <div class="empty" v-if="!activeData.length">
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
import ItemActive from '@/components/mine/ItemActive'

let flag = false

export default {
  components: {
    TopHeader,
    ItemActive
  },
  data: () => ({
    // 页面loading
    isLoading: true,
    // 用户id
    userid: '',
    // 类型， 1、整车 2、活动
    type: 2,
    // 当前页
    page: 1,
    // 每页条数
    size: 10,
    // 数据数组
    activeData: [],
    // 加载loading
    loadingMore: false,
    // 没有更多
    noMore: false
  }),
  created() {
    // this.userid = this.$route.query.id
    // this.fetch()
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
            this.activeData = res.data.order
          } else {
            this.activeData = this.activeData.concat(res.data.order)
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
    toOrderDetail(id, index) {
      let content = this.$refs.content
      let info = {
        top: content.scrollTop,
        page: this.page
      }
      this.setStorage('myActiveInfo', info)
      this.$router.push({
        path: `/home/active/complete/${id}`,
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
      if (from.name === 'ActiveCompletePay') {
        let info = vm.getStorage('myActiveInfo')
        let data = vm.getStorage('myActiveList')
        vm.activeData = data
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
    if (to.name === 'ActiveCompletePay') {
      this.setStorage('myActiveList', this.activeData)
    } else {
      this.removeStorage('myActiveList')
      this.removeStorage('myActiveInfo')
    }
    next()
  }
}
</script>
<style scoped>
  .my-active{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .active-content{
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>
