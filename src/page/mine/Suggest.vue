<template>
  <div class="suggest">
    <top-header :title="'意见反馈'"></top-header>
    <div class="content">
      <div class="text-area">
        <div class="text-title">
          <span class="title">意见描述</span>
          <span class="num">{{num}}/300</span>
        </div>
        <textarea @input="inputTextArea" rows="8" v-model="textInput" placeholder="留下您宝贵的意见吧" maxlength="300"></textarea>
      </div>
      <div class="item">
        <span>姓名</span>
        <input type="text" maxlength="11" v-model="name" placeholder="请填写您的姓名" />
      </div>
      <div class="item">
        <span>电话号码</span>
        <input type="tel" maxlength="11" v-model="telphone" placeholder="请填写您的电话号码" />
      </div>
    </div>
    <div class="confirm" @click="confirm">确认提交</div>
    <!-- 错误提示 -->
    <dialog-content v-if="dialogShowToast" :info="dialogInfo" @close="closeDialog" :type="'know'"></dialog-content>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader'
import DialogContent from '@/components/Dialog'

export default {
  components: {
    TopHeader,
    DialogContent
  },
  data: () => ({
    // 输入字数
    num: 0,
    // 反馈内容
    textInput: '',
    // 姓名
    name: '',
    // 电话
    telphone: '',
    // 错误提示
    dialogInfo: '',
    // 显示错误提示
    dialogShowToast: false
  }),
  created() {
    // app传title
    this.callNativeMethod('onChangeWebTitle', {
      changeWebTitle: '意见反馈'
    })
    // 没有地区筛选
    this.callNativeMethod('onShowLocationInfo', { location: '' })
    // 不显示分享按钮
    this.callNativeMethod('onShowShareButton', {
      isShow: false
    })
  },
  methods: {
    inputTextArea() {
      this.num = this.textInput.length
    },
    // 关闭提示
    closeDialog() {
      this.dialogShowToast = false
    },
    confirm() {
      // 建议不能为空
      if (!this.textInput.length) {
        this.dialogInfo = '请留下您的建议~'
        this.dialogShowToast = true
        return
      }
      // 名字不能为空
      if (!this.name) {
        this.dialogInfo = '名字不能为空~'
        this.dialogShowToast = true
        return
      }
      let phone = this.telphone
      // 电话不能为空
      if (!phone) {
        this.dialogInfo = '电话不能为空~'
        this.dialogShowToast = true
        return
      }
      if (
        phone.length !== 11 ||
        !phone.match(
          /1(([38]\d)|(4[57])|(5[012356789])|(7[0135678])|(9[9]))\d{8}/
        )
      ) {
        this.dialogInfo = '请填写正确的手机号码'
        this.dialogShowToast = true
        return
      }
      this.ajax(
        `User/AddFeedback.aspx?content=${this.textInput}&name=${
          this.name
        }&tel=${this.telphone}`,
        res => {
          if (res.data.msg === '提交成功') {
            this.$showToast.show({
              type: 'success',
              text: '提交成功'
            })
            this.$router.go(-1)
          }
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
  .suggest{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content{
    flex: 1;
  }
  .text-area{
    padding: 0 16px;
    background: #fff;
  }
  .text-title{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 44px;
  }
  .text-title .title{
    font-size: 16px;
    color: #5C6066;
  }
  .text-title .num{
    font-size: 12px;
    color: #5B6067;
  }
  .text-area textarea{
    width: 100%;
    padding: 8px;
    background: #F3F4F5;
    border: 1px solid #EDEDED;
    border-radius: 2px;
    font-size: 14px;
    line-height: 16px;
    resize: none;
  }
  .text-area textarea::-webkit-input-placeholder{
    font-size: 14px;
    line-height: 16px;
    color: #A1A9B2;
  }
  .item{
    padding-left: 16px;
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 43px;
    line-height: 43px;
    border-bottom: 1px solid #EDEDED;
  }
  .item:last-child{
    height: 44px;
    line-height: 44px;
    border-bottom: 0;
  }
  .item span{
    width: 65px;
    font-size: 16px;
    line-height: 16px;
    color: #5C6066;
  }
  .item input{
    margin-left: 12px;
    font-size: 16px;
    line-height: 16px;
    flex: 1;
    color: #17181A;
  }
  .item input::-webkit-input-placeholder{
    line-height: 16px;
    color: #D1D1D1;
  }
  .confirm{
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: #508DFD;
    font-size: 18px;
    color: #fff;
  }
</style>
