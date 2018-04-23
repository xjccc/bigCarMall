<template>
  <div class="footer">
    <div class="footer-content">
      <template v-for="item in footList">
        <item-footer :item="item"></item-footer>
      </template>
    </div>
    <div class="footer-info">
      <div class="concat">
        合作热线：<span @click="telUs">400-613-6188</span> (9:00-18:00)
      </div>
      <div class="truck-home">
        卡车之家@{{new Date().getFullYear()}}http://m.360che.com
      </div>
    </div>
  </div>
</template>
<script>
import ItemFooter from '@/components/home/footer/ItemFooter'

export default {
  components: {
    ItemFooter
  },
  data: () => ({
    footList: [
      {
        id: 'car',
        img: 'https://s.kcimg.cn/bigCarMall/image/true-car.png',
        name: '真实车源'
      },
      {
        id: 'pay',
        img: 'https://s.kcimg.cn/bigCarMall/image/safe-pay.png',
        name: '支付无忧'
      },
      {
        id: 'shop',
        img: 'https://s.kcimg.cn/bigCarMall/image/true-shop.png',
        name: '认证商家'
      },
      {
        id: 'price',
        img: 'https://s.kcimg.cn/bigCarMall/image/true-price.png',
        name: '真实报价'
      }
    ]
  }),
  methods: {
    telUs() {
      window.location.href = `tel://${4006136188}`
    }
  }
}
</script>
<style scoped>
  .footer{
    margin-top: 8px;
    background: #fff;
  }
  .footer-content{
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #EDEDED;
  }
  .footer-info{
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .concat{
    font-size: 12px;
    color: #A1A9B2;
    line-height: 24px;
  }
  .concat span{
    font-size: 16px;
    color: #508DFD;
    line-height: 24px;
  }
  .truck-home{
    margin-top: 4px;
    font-size: 12px;
    color: #A1A9B2;
    line-height: 18px;
  }
</style>
