<template>
   <!-- v-if="getType() !== 'app'" -->
  <div class="top" v-if="getType() !== 'app'">
    <div class="top-back" @click="back">&#xe711;</div>
    <h1 class="top-title">{{title}}</h1>
    <div class="select-city" v-if="type === 'location'" @click="selectLocation">
      <span class="city" v-if="data.city">{{data.city}}</span>
      <span class="city" v-else>全国</span>
    </div>
    <div :class="['icon', select]" v-else @click="operation" id="share_btn"></div>
  </div>
</template>
<script>
export default {
  props: ['type', 'title', 'data'],
  computed: {
    select() {
      switch (this.type) {
        case 'location':
          return 'select-city'
        case 'home':
          return 'to-home'
        case 'share':
          return 'to-share'
        default:
          return ''
      }
    }
  },
  data: () => ({}),
  methods: {
    // 返回键
    back() {
      if (window.history.length <= 1) {
        this.$router.replace('/dacheshi')
      } else {
        this.$router.go(-1)
      }
    },
    selectLocation() {
      this.$emit('location')
    },
    operation() {
      // 点击分享
      if (this.type === 'share') {
        this.$emit('share')
      } else if (this.type === 'home') {
        // 返回首页
        this.$router.replace('/dacheshi')
      }
    }
  }
}
</script>
<style scoped>
  .top{
    position: relative;
    padding: 0 16px;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,0.06), 0 -1px 0 0 #F5F5F5;
    z-index: 5;
  }
  .top-back{
    position: absolute;
    top: 0;
    left: 16px;
    width: 44px;
    height: 44px;
    line-height: 44px;
    font-family: 'carMall';
    font-size: 18px;
    color: #17181A;
  }
  .top-title{
    font-size: 18px;
    color: #333;
    font-weight: bold;
    text-align: center;
  }
  .select-city{
    position: absolute;
    top: 0;
    right: 16px;
    display: flex;
    flex-direction: row;
    line-height: 44px;
  }
  .city{
    max-width: 100px;
    height: 44px;
    font-size: 14px;
    color: #17181A;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .select-city:before{
    position: absolute;
    top: 16px;
    left: -18px;
    font-family: 'carMall';
    font-size: 14px;
    line-height: 14px;
    content: "\e71a";
    color: #FF6600;
  }
  .icon{
    position: absolute;
    right: 4px;
    top: 0;
    font-family: 'carMall';
    text-align: center;
    font-size: 18px;
    width: 44px;
    height: 44px;
    line-height: 44px;
  }
  .to-home:after{
    content: "\e713";
  }
  .to-share:after{
    content:"\e708";
  }
</style>
