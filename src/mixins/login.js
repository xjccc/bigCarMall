import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
axios.defaults.withCredentials = true

export default {
  uid: '0',
  checkplatform() {
    var UA = navigator.userAgent
    var uaCase = navigator.userAgent.toLowerCase()
    if (uaCase.indexOf('micromessenger') >= 0) {
      return 'weixin'
    } else if (uaCase.indexOf('360che') >= 0) {
      return 'app'
    } else {
      return 'm'
    }
  },
  ToLogin() {
    var platform = this.checkplatform()
    switch (platform) {
      case 'weixin':
        truckhomeAccountBinding.show()
        break
      case 'app':
        setTimeout(function() {
          window.WebViewJavascriptBridge.callHandler('onLogin', {})
        }, 200)
        break
      case 'm':
        location.href = 'https://sso.360che.com/?c=login'
        break
    }
  },
  init() {
    let platform = this.checkplatform()
    switch (platform) {
      case 'weixin':
        if (!window.define) {
          var tjs = document.createElement('script')
          tjs.src = 'https://s.kcimg.cn/public/m/js/t.min.js'
          document.body.appendChild(tjs)
        }
        if (!window.truckhomeAccountBinding) {
          var binding = document.createElement('script')
          binding.src =
            'https://s.kcimg.cn/public/wechat/wechat.accout.binding.2.0.3.min.js'
          binding.charset = 'utf-8'
          document.body.appendChild(binding)
        }
        this.checkLogin()
        break
      case 'm':
        this.checkLogin()
        break
      case 'app':
        this.appReload() // app登陆以后刷新
        this.appGetUid()
        break
    }
  },
  appReload() {
    function connectWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
      } else {
        document.addEventListener(
          'WebViewJavascriptBridgeReady',
          function() {
            callback(WebViewJavascriptBridge)
          },
          false
        )
      }
    }
    connectWebViewJavascriptBridge(function(bridge) {
      bridge.init(function(message, responseCallback) {})
      bridge.registerHandler('onLoginCallback', function(
        data,
        responseCallback
      ) {
        window.location.reload()
      })
    })
  },
  checkLogin() {
    // 微信和m获取uid
    var userid = document.cookie.match(/AbcfN_ajaxuid=([^;$]+)/)
    if (userid && userid[1]) {
      this.uid = userid[1]
    } else {
      this.uid = 0
    }
  },
  appGetUid() {
    // app获取uid
    var UA = navigator.userAgent
    var userid = UA.match(/USERID[^\s]+/)[0].substr(7)
    if (userid != '0') {
      this.uid = userid
    } else {
      this.getUid()
    }
  },
  getUid() {
    axios({
      url: `https://bbs-api.360che.com/interface/app/index.php?action=LoginCheck&type=user`,
      adapter: jsonpAdapter
    }).then(res => {
      if (!res.data.status) {
        this.uid = res.data.data
      }
    })
  }
}
