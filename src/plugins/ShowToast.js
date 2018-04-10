import Toast from './Toast'
let Tst = {}
Tst.install = function(Vue, options) {
  if (document.getElementsByClassName('toast').length) {
    return
  }
  const VueToast = Vue.extend(Toast)
  let $vm = new VueToast({
    el: document.createElement('div')
  })

  let tst = $vm.$mount().$el
  document.body.appendChild(tst)

  Vue.prototype.$showToast = {
    show(options) {
      if (typeof options === 'string') {
        $vm.text = options
      } else if (typeof options === 'object') {
        Object.assign($vm, options)
      }
      $vm.isShow = true
      if ($vm.type === 'loading') {
        setTimeout(() => {
          $vm.isShow = false
        }, 10000)
      } else {
        setTimeout(() => {
          $vm.isShow = false
        }, $vm.time)
      }
    },
    hide() {
      $vm.isShow = false
    }
  }
}
export default Tst
