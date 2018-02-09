<template>
  <div class="mask" @touchmove.prevent>
    <div class="dialog">
      <div class="dialog-content">
        {{info}}
      </div>
      <div class="dialog-footer" @click="close" v-if="type === 'know'">知道了</div>
      <div class="choose" v-else>
        <span @click="close">取消</span>
        <span class="true-choose" @click="confirm">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['info', 'type'],
  data: () => ({}),
  methods: {
    show() {
      this.$emit('showDialog')
    },
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>
<style scoped>
  .mask{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 8;
  }
  .dialog{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 80%;
    max-width: 600px;
    border-radius: 6px;
    text-align: center;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: #fff;
    z-index: 8;
  }
  .dialog-content{
    padding: 40px 32px;
    min-height: 80px;
    font-size: 30px;
    line-height: 1.3;
    color: #353535;
    word-wrap: break-word;
    word-break: break-all;
  }
  .dialog-footer{
    border-top: 2px solid #EDEDED;
    font-size: 36px;
    line-height: 96px;
    text-align: center;
    color: #0BB20C;
  }
  .choose{
    display: flex;
    flex-direction: row;
    border-top: 2px solid #EDEDED;
    font-size: 36px;
    line-height: 96px;
  }
  .choose span{
    flex:1;
  }
  .true-choose{
    color: #0BB20C;
    border-left: 2px solid #EDEDED;
  }
</style>
