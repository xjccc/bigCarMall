<template>
  <div class="buy-process">
    <div class="title">购车流程</div>
    <div class="content">
      <template v-for="item in buyData">
        <div class="item">
          <figure>
            <img :src="item.img">
          </figure>
          <div class="item-name">
            <span class="item-num">{{item.id}}</span>/{{item.title}}
          </div>
          <div class="item-detail">
            {{item.detail}}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    buyData: [
      {
        id: 1,
        img: 'https://s.kcimg.cn/bigCarMall/image/detail-buy-car.png',
        title: '选车',
        detail: '线上选车与商家沟通咨询'
      },
      {
        id: 2,
        img: 'https://s.kcimg.cn/bigCarMall/image/detail-line-order.png',
        title: '线上下单',
        detail: '支付意向金后，经销商主动联系'
      },
      {
        id: 3,
        img: 'https://s.kcimg.cn/bigCarMall/image/detail-pay.png',
        title: '支付尾款',
        detail: '到店看车、验券，支付尾款'
      },
      {
        id: 4,
        img: 'https://s.kcimg.cn/bigCarMall/image/detail-get-car.png',
        title: '提车',
        detail: '完成上牌等必需项后提车'
      }
    ]
  })
}
</script>
<style scoped>
  .buy-process{
    padding: 24px 0 32px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    background: #fff;
  }
  .title{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: #5C6066;
    line-height: 60px;
  }
  .title:before{
    margin-right: 16px;
    content: "";
    width: 112px;
    height: 2px;
    background: #E5E5E5;
  }
  .title:after{
    margin-left: 16px;
    content: "";
    width: 112px;
    height: 2px;
    background: #E5E5E5;
  }
  .content{
    margin-top: 32px;
    display: flex;
    flex-direction: row;
  }
  .item{
    flex: 1;
    text-align: center;
  }
  .item-name{
    margin-top: 24px;
    font-size: 24px;
    color: #17181A;
    line-height: 36px;
  }
  .item-num{
    font-size: 32px;
    font-weight: bold;
  }
  .item-detail{
    padding: 0 16px;
    margin-top: 8px;
    font-size: 24px;
    color: #A1A9B2;
    line-height: 32px;
  }
</style>
