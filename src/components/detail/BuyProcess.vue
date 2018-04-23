<template>
  <div class="buy-process">
    <div class="title">购车流程</div>
    <div class="content">
      <template v-for="item in buyData">
        <div class="item">
          <figure :class="`figure_${item.id}`">
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
    padding: 12px 0 16px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    background: #fff;
  }
  .title{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #5C6066;
    line-height: 30px;
  }
  .title:before{
    margin-right: 8px;
    content: "";
    width: 56px;
    height: 1px;
    background: #E5E5E5;
  }
  .title:after{
    margin-left: 8px;
    content: "";
    width: 56px;
    height: 1px;
    background: #E5E5E5;
  }
  .content{
    margin-top: 16px;
    display: flex;
    flex-direction: row;
  }
  .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  .item .figure_1{
    width: 50px;
    height: 32px;
  }
  .item .figure_2{
    width: 46px;
    height: 32px;
  }
  .item .figure_3{
    width: 47px;
    height: 32px;
  }
  .item .figure_4{
    width: 46px;
    height: 32px;
  }
  .item img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .item-name{
    margin-top: 12px;
    font-size: 12px;
    color: #17181A;
    line-height: 18px;
  }
  .item-num{
    font-size: 16px;
    font-weight: bold;
  }
  .item-detail{
    padding: 0 8px;
    margin-top: 4px;
    font-size: 12px;
    color: #A1A9B2;
    line-height: 16px;
  }
</style>
