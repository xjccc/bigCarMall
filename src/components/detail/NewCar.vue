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
    margin-top: 20px;
    padding: 0 32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .item{
    margin-bottom: 32px;
    width: 330px;
    height: 360px;
    display: flex;
    flex-direction: column;
  }
  .item figure{
    width: 330px;
    height: 220px;
  }
  .item figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .descripe{
    flex: 1;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .detail{
    font-size: 28px;
    color: #17181A;
    line-height: 40px;
    text-overflow:ellipsis;
    word-break: break-all;
    overflow:hidden;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .price{
    font-weight: bold;
    margin-top: 4px;
    font-size: 28px;
    color: #FF6600;
    line-height: 40px;
  }
</style>
