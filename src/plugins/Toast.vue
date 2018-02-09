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
    padding: 20px;
    width: 200px;
    min-height: 200px;
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
  margin-top: 30px;
  font-family: 'carMall';
  color: #fff;
  font-size: 60px;
}
.loading-icon{
  margin-top: 30px;
  width: 60px;
  height: 60px;
  background: transparent;
}
.loading-icon img{
  width: 60px;
  height: 60px;
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
