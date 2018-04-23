<template>
  <div class="swipers">
    <ul @touchmove.stop :style="`width:${750*data.length}px;transform: translate3d(${tx}px,${ty}px,${tz}px);transition-duration:${td}ms;transition-delay:${td}ms`">
      <li v-for="(item, index) in data" :key="index" @click="openUrl(item.url)">
        <figure>
          <img :src="item.imgurl" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
        </figure>
      </li>
    </ul>
    <div class="swiper-pagination">
      <span class="home-bullet" v-for="num in data.length"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array
    },
    type: {
      type: String,
      default: 'horizontal'
    }
  },
  computed: {
    tx() {
      return this.type === 'horizontal' ? -750 : 0
    },
    ty() {
      return this.type === 'vertical' ? 750 : 0
    }
  },
  data: () => ({
    tz: 0,
    td: 300
  }),
  methods: {
    openUrl(url) {
      window.location.href = url
    }
  }
}
</script>
<style scoped>
  .swipers{
    display: flex;
    flex-direction: column;
    height: 174px;
    overflow: hidden;
    background: #fff;
  }
  .swipers ul{
    display: flex;
    flex-direction: row;
    overflow-x: auto;
  }
  .swipers li {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .swiper-container{
    width: 375px;
    height: 174px;
  }
  .swiper-wrapper, .swiper-slide {
    height: 150px;
  }
  .swipers figure{
    width: 100%;
    height: 150px;
  }
  .swipers figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .swiper-pagination{
    position: relative;
  }
  .home-bullet{
    display: inline-block;
    margin: 0 4px;
    width: 12px;
    height: 2px;
    background: #D8D8D8;
  }
  .home-bullet-active{
    opacity: 1;
    background: #FF6600;
  }
</style>
