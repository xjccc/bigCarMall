<template>
  <div class="mine">
    <top-header :type="'home'" :title="'个人中心'"></top-header>
    <div class="content">
      <div class="userInfo">
        <img :src="userInfo.headpic">
        <div class="user-content">
          <span class="user-name">{{userInfo.nikename}}</span>
          <span class="level" v-if="userInfo.score">Lv{{userInfo.score.level}}：{{userInfo.score.title}}</span>
          <span class="calory">卡路里：{{userInfo.extcredits8}}</span>
        </div>
        <!-- <span class="login-out" @click="loginOut">注销</span> -->
      </div>
      <div class="mine-content">
        <div class="mine-item" @click="toMyBuy">
          <span class="icon icon-car"></span>
          <span class="item-title">我买的车</span>
        </div>
        <div class="mine-item" @click="toMyActive">
          <span class="icon icon-active"></span>
          <span class="item-title">我参加的活动</span>
        </div>
        <div class="mine-item" @click="toSuggest">
          <span class="icon icon-suggest"></span>
          <span class="item-title">意见反馈</span>
        </div>
        <div class="mine-item" @click="showServiceView">
          <span class="icon icon-service"></span>
          <span class="item-title">用户服务协议</span>
        </div>
      </div>
      <div class="mine-content">
        <div class="mine-item" @click="toHome">
          <span class="icon icon-home"></span>
          <span class="item-title">前往大车市首页</span>
        </div>
      </div>
    </div>
    <div class="mine-footer">
      <div class="concat">
        合作热线：<span @click="telUs">400-613-6188</span> (9:00-18:00)
      </div>
      <div class="truck-home">
        卡车之家@{{new Date().getFullYear()}}http://m.360che.com
      </div>
    </div>
    <!-- 用户协议 -->
    <service :showService="showService" @close="closeService"></service>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import Service from '@/components/mine/Service'

export default {
  components: {
    TopHeader,
    Service
  },
  data: () => ({
    // 用户信息
    userInfo: {},
    // 显示用户协议
    showService: false
  }),
  created() {
    let userInfo = this.getStorage('bigCarMallUserInfo')
    if (userInfo) {
      this.userInfo = userInfo
    }
    // app传title
    this.callNativeMethod('onChangeWebTitle', {
      changeWebTitle: '个人中心'
    })
    // 没有地区筛选
    this.callNativeMethod('onShowLocationInfo', { location: '' })
    // 不显示分享按钮
    this.callNativeMethod('onShowShareButton', {
      isShow: false
    })
  },
  methods: {
    // 注销操作
    // loginOut() {
    //   this.removeStorage('bigCarMallUserInfo')
    //   this.$router.replace('/')
    // },
    // 我买的车
    toMyBuy() {
      this.$router.push({
        path: '/dacheshi/mine/mycar',
        query: { id: this.userInfo.uid }
      })
    },
    // 我参加的活动
    toMyActive() {
      this.$router.push({
        path: '/dacheshi/mine/myactive',
        query: { id: this.userInfo.uid }
      })
    },
    // 显示用户协议
    showServiceView() {
      this.showService = true
    },
    // 关闭用户协议
    closeService() {
      this.showService = false
    },
    // 意见反馈
    toSuggest() {
      this.$router.push('/dacheshi/mine/suggest')
    },
    // 返回首页
    toHome() {
      this.$router.replace('/dacheshi')
    },
    // 合作热线
    telUs() {
      window.location.href = `tel://${4006136188}`
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
  .mine{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content{
    flex: 1;
  }
  .userInfo{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 20px 16px 20px 20px;
    background: #fff;
  }
  .userInfo img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    vertical-align: middle;
    object-fit: cover;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,0.10);
  }
  .user-content{
    flex: 1;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .user-name{
    font-size: 18px;
    color: #333;
    line-height: 26px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .level{
    margin-top: 4px;
    font-size: 14px;
    color: #A1A9B2;
    line-height: 20px;
  }
  .calory{
    margin-top: 6px;
    font-size: 14px;
    color: #A1A9B2;
    line-height: 24px;
  }
  .login-out{
    font-size: 14px;
    color: #508DFD;
    line-height: 26px;
  }
  .mine-content{
    margin-top: 8px;
    background: #fff;
  }
  .mine-item{
    padding-left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 44px;
  }
  .mine-item .icon{
    position: relative;
    font-family: 'carMall';
    color: #5C6066;
    width: 28px;
    height: 16px;
    font-size: 16px;
    line-height: 16px;
  }
  .mine-item .icon:before{
    position: absolute;
    top: 0;
    left: 4px;
  }
  .mine-item .icon.icon-car:before{
    content: "\e70a";
  }
  .mine-item .icon.icon-active:before{
    left: 5px;
    content: "\e70b";
  }
  .mine-item .icon.icon-suggest:before{
    content: "\e709";
  }
  .mine-item .icon.icon-service:before{
    left: 5px;
    content: "\e70c";
  }
  .icon-home:before{
    content: "\e713";
  }
  .mine-item .item-title{
    margin-left: 10px;
    flex: 1;
    font-size: 16px;
    color: #333;
  }
  .mine-footer{
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .concat{
    font-size: 12px;
    color: #A1A9B2;
    line-height: 24px;
  }
  .concat span{
    font-size: 16px;
    color: #508DFD;
    line-height: 24px;
  }
  .truck-home{
    margin-top: 4px;
    font-size: 12px;
    color: #A1A9B2;
    line-height: 18px;
  }
</style>
