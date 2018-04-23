<template>
  <div class="toast" v-show="isShow">
    <div class="loading-icon" v-show="type === 'loading'">
      <img src="https://s.kcimg.cn/bigCarMall/image/loading.gif">
    </div>
    <i class="icon icon-success" v-show="type === 'success'"></i>
    <i class="icon icon-error" v-show="type === 'error'"></i>
    <p class="text-content">{{text}}</p>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      default: false
    },
    text: {
      default: '加载中..'
    },
    time: {
      default: 1500
    },
    type: {
      default: 'loading'
    }
  },
  data: () => ({})
}
</script>
<style scoped>
.toast {
    position: fixed;
    z-index: 20;
    padding: 10px;
    width: 100px;
    min-height: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(17, 17, 17, 0.7);
    text-align: center;
    border-radius: 5px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.icon{
  margin-top: 15px;
  font-family: 'carMall';
  color: #fff;
  font-size: 30px;
}
.loading-icon{
  margin-top: 15px;
  width: 30px;
  height: 30px;
  background: transparent;
}
.loading-icon img{
  width: 30px;
  height: 30px;
  vertical-align: middle;
  object-fit: cover;
}
.icon-success:before {
  content: "\e707";
}
.icon-error:before{
  content: "\e6d1";
}
.text-content {
    margin: 0 0 15px;
}
</style>
