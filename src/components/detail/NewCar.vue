<template>
  <div class="new-car">
    <item-header :title="'店内新车'" @more="moreCar"></item-header>
    <div class="item-content">
      <template v-for="item in newCarData">
        <div class="item" @click="toDetail(item.ProductId)">
          <figure>
            <img :src="item.ImgUrl" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
          </figure>
          <div class="descripe">
            <span class="detail">{{item.TitleStr}}</span>
            <span class="price">{{item.VehiclePrice}}万元</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import ItemHeader from '@/components/ItemHeader'

export default {
  props: ['newCarData'],
  components: {
    ItemHeader
  },
  data: () => ({}),
  methods: {
    toDetail(id) {
      this.$emit('toDetail', id)
    },
    moreCar() {
      this.$emit('more')
    }
  }
}
</script>
<style scoped>
  .new-car{
    background: #fff;
  }
  .item-content{
    margin-top: 10px;
    padding: 0 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .item{
    width: calc( 50vw - 20px);
    margin-bottom: 16px;
    height: 180px;
    display: flex;
    flex-direction: column;
  }
  .item:first-child{
    margin-right: 4px;
  }
  .item:last-child{
    margin-left: 4px;
  }
  .item figure{
    height: 110px;
  }
  .item figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .descripe{
    flex: 1;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .detail{
    font-size: 14px;
    color: #17181A;
    line-height: 20px;
    text-overflow:ellipsis;
    word-break: break-all;
    overflow:hidden;
    display:-webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp:2;
  }
  .price{
    font-weight: bold;
    margin-top: 2px;
    font-size: 14px;
    color: #FF6600;
    line-height: 20px;
  }
</style>
