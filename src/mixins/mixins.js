import axios from 'axios'
import qs from 'qs'

export default {
  methods: {
    // 判断是什么端
    getType() {
      if (/MicroMessenger/i.test(navigator.userAgent)) {
        return 'weixin'
      } else if (/360che/i.test(navigator.userAgent)) {
        return 'app'
      } else {
        return 'm'
      }
    },
    sendData2Native(data, callback) {               //和app通信
        window.WebViewJavascriptBridge.send(data, callback)
    },
    callNativeMethod(method, param, callback) {        //和app通信
        window.WebViewJavascriptBridge.callHandler(method, param,callback)
    },
    // 监听app回调
    connectWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
      } else {
        document.addEventListener(
          'WebViewJavascriptBridgeReady',
          function() {
            callback(WebViewJavascriptBridge)
          },false)
      }
    },
    ajaxUrl() {
      // return '/xj'
      return 'https://dealer-api.360che.com'
    },
    ajax(url, success, error) {
      axios({
        method: 'get',
        url: `${this.ajaxUrl()}/bigchemall/${url}`
      })
        .then(success)
        .catch(error)
    },
    getData(url, success, error) {
      axios({
        method: 'get',
        url: `${url}`
      })
        .then(success)
        .catch(error)
    },
    // 获取用户信息
    getUserInfo(url, success, error) {
      axios({
        methods: 'get',
        url: `${url}`,
        // 请求带上cookie
        withCredentials: true
      })
        .then(success)
        .catch(error)
    },
    postData(url, data, success, error) {
      axios({
        method: 'post',
        url: `${this.ajaxUrl()}${url}`,
        data: qs.stringify(data)
      })
        .then(success)
        .catch(error)
    },
    // wx隐藏菜单栏
    wxHideMenus() {
      let wx = window.wx
      wx.ready(() => {
        wx.hideAllNonBaseMenuItem()
      })
    },
    // 设置cookie
    setCookie(name, value, day) {
      var exp = new Date()
      exp.setTime(exp.getTime() + day * 12 * 60 * 60 * 1000)
      document.cookie =
        name + '=' + escape(value) + ';expires=' + exp.toGMTString()
    },
    // 获取Cookie
    getCookie(name) {
      let arr = []
      let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2])
      } else {
        return null
      }
    },
    // 删除cookie
    removeCookie(name) {
      document.cookie =
        name +
        '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;' +
        ';path=/;domain=.360che.com'
    },
    // 读取缓存
    getStorage(name) {
      let obj = localStorage.getItem(name)
      try {
        if (JSON.parse(obj)) {
          obj = JSON.parse(obj)
        }
      } catch (err) {}
      return obj
    },
    // 设置缓存
    setStorage(name, data) {
      let obj = data
      if (typeof data === 'object') {
        obj = JSON.stringify(data)
      }
      localStorage.setItem(name, obj)
    },
    // 删除缓存
    removeStorage(name) {
      localStorage.removeItem(name)
    }
    // 统计事件
    // sendAnalytics(c, a, l) {
    //   try {
    //     ga('send', 'event', c, a, l)
    //   } catch (e) {}
    // }
  }
}
