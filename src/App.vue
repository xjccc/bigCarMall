<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    let wx = window.wx
    this.getData(
      `https://saasm.360che.com.cn/newsaasapi/WeiXin/WXJSsignature.aspx?${+new Date()}`,
      res => {
        try {
          if (res.data.status === 1) {
            let data = res.data
            // 注册微信信息
            wx.config({
              debug: false,
              appId: data.data.appId,
              timestamp: data.data.timestamp,
              nonceStr: data.data.noncestr,
              signature: data.data.signature,
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'hideMenuItems',
                'showMenuItems',
                'showAllNonBaseMenuItem',
                'hideAllNonBaseMenuItem'
              ]
            })
          }
        } catch (e) {}
      }
    )
  }
}
</script>

<style>
@import './mixins/reset.css';
[v-cloak] {
  display: none
}
/* 微信样式 */
.truckhome-account-binding .weui_cells_title{
  font-size: 24px;
}
.truckhome-account-binding .weui_label{
  width: 100px !important;
  font-size: 30px;
  padding: 10px 0;
}
.truckhome-account-binding .weui_input {
  font-size: 30px;
}
.truckhome-account-binding .weui_vcode .weui_cell_ft .vcode {
  font-size: 30px !important;
  width: 200px !important;
  height: 88px !important;
  line-height: 88px !important;
}
.truckhome-account-binding .weui_btn_area > * {
  font-size: 30px;
}
.truckhome-account-binding .weui_msg .weui_extra_area a {
  font-size: 30px;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/* 首页设置 */
.swipers .swiper-container-horizontal > .swiper-pagination-bullets{
  bottom: 0;
}
.home-bullet{
  display: inline-block;
  margin: 0 8px;
  width: 24px;
  height: 4px;
  background: #D8D8D8;
}
.home-bullet-active{
  opacity: 1;
  background: #FF6600;
}
/* 详情页设置 */
.swipers .swiper-container-horizontal > .swiper-pagination-fraction{
  bottom: 24px;
  width: auto;
  height: 40px;
  line-height: 40px;
  border-radius: 40px;
  padding: 0 32px;
  background: rgba(0, 0, 0, 0.6);
  font-size: 24px;
  color: #fff;
  left: 50%;
  transform: translateX(-50%);
}
/* 全局加载 */
.loading{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: #f5f5f5;
}
/* 加载更多数据 */
.loading-more{
  position: relative;
  min-height: 200px;
  overflow: hidden;
}
.no-loading-more{
  min-height: 80px;
  line-height: 80px;
  text-align: center;
  color: #999;
  font-size: 28px;
}
/* 空样式 */
.empty {
  font-size: 28px;
  color: #A1A9B3;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty>img {
  width: 400px;
  height: 300px;
  margin-bottom: 8px;
}
/* 服务协议title */
.service-title{
  font-size: 32px;
  color: #17181A;
  font-weight: bold;
}
</style>
