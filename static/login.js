Object.defineProperty(exports, '__esModule', {
  value: true
})
var Trucklogin = {
  checkplatform: function checkplatform() {
    var UA = navigator.userAgent
    var uaCase = navigator.userAgent.toLowerCase()
    if (uaCase.match(/MicroMessenger/i) == 'micromessenger') {
      if (!window.define) {
        var tjs = document.createElement('script')
        tjs.src = 'https://s.kcimg.cn/public/m/js/t.min.js'
        document.body.appendChild(tjs)
      }
      if (!window.truckhomeAccountBinding) {
        var tjs = document.createElement('script')
        tjs.src =
          'https://s.kcimg.cn/public/wechat/wechat.accout.binding.2.0.3.min.js'
        document.body.appendChild(tjs)
      }
      return 'weixin'
    }
    if (UA.match(/360che/gi)) {
      return 'app'
    }
    return 'm'
  },
  ToLogin: function ToLogin() {
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
  init: function init() {
    this.checkplatform()

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
        location.href = location.href
      })
    })
  }
}
Trucklogin.init()
exports.default = Trucklogin
