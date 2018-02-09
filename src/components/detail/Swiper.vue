<template>
  <div class="swipers" v-if="data">
    <swiper :options="swiperOptions" ref="swiper">
      <swiper-slide v-for="(item, index) in data" :key="index">
        <figure>
          <img :src="item.ImgUrl" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
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
  components: {
    swiper,
    swiperSlide
  },
  props: ['data'],
  data: () => ({
    swiperOptions: {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
      }
    }
  })
}
</script>
<style scoped>
  .swipers{
    width: 750px;
    height: 500px;
    overflow: hidden;
    background: #fff;
  }
  .swipers .swiper-slide figure{
    width: 100%;
    height: 500px;
  }
  .swipers .swiper-slide figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
</style>
