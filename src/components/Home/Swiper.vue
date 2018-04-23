<template>
  <div class="swipers">
    <swiper :options="swiperOptions" ref="swiper">
      <swiper-slide v-for="(item, index) in data" :key="index" @click.native="openUrl(item.url)">
        <figure>
          <img :src="item.imgurl" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
        </figure>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: ['data'],
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.swiper.swiper
    }
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 'auto',
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        bulletClass: 'home-bullet',
        bulletActiveClass: 'home-bullet-active'
      },
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false
      }
    }
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
    width: 100%;
    height: 174px;
    overflow: hidden;
    background: #fff;
  }
  .swiper-container{
    width: 100%;
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
</style>
