<template>
  <div class="why-choose">
    <div class="title">为什么选择卡车之家大车市</div>
    <div class="why-content">
      <template v-for="item in whyData">
        <div class="item">
          <figure :class="`figure_${item.id}`">
            <img :src="item.img">
          </figure>
          <span class="item-title">{{item.title}}</span>
          <span class="item-detail">{{item.detail}}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    whyData: [
      {
        id: 1,
        img: 'https://s.kcimg.cn/bigCarMall/image/choose-true-car.png',
        title: '真实车源',
        detail:
          '全国优质合作经销商为您提供可靠的车源信息，以及专业的服务，车源真实看得见。'
      },
      {
        id: 2,
        img: 'https://s.kcimg.cn/bigCarMall/image/choose-true-shop.png',
        title: '认证商家',
        detail: '卡车之家长期合作商家、厂家授权，为您的交易保驾护航。'
      },
      {
        id: 3,
        img: 'https://s.kcimg.cn/bigCarMall/image/choose-safe-pay.png',
        title: '安全支付',
        detail: '接入第三方支付平台支付宝、微信提供支付保障。'
      },
      {
        id: 4,
        img: 'https://s.kcimg.cn/bigCarMall/image/choose-back-money.png',
        title: '随时退订金',
        detail: '不买车随时退订金，无须担心资金风险。'
      }
    ]
  })
}
</script>
<style scoped>
  .why-choose{
    padding: 12px 16px 16px;
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
  .why-content{
    margin-top: 7px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .item{
    margin-top: 9px;
    padding: 12px;
    width: calc(50vw - 20px);
    height: 130px;
    border: 1px solid #EDEDED;
    border-radius: 4px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .item:nth-child(2n-1){
    margin-right: 4px;
  }
  .item:nth-child(2n){
    margin-left: 4px;
  }
  .item figure{
    position: absolute;
    right: 12px;
    bottom: 12px;
    z-index: 0;
  }
  .item figure img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
    object-fit: cover;
  }
  .item .figure_1{
    width: 70px;
    height: 46px;
  }
  .item .figure_2{
    width: 60px;
    height: 60px;
  }
  .item .figure_3{
    width: 56px;
    height: 63px;
  }
  .item .figure_4{
    width: 52px;
    height: 60px;
  }
  .item-title{
    margin-top: 4px;
    font-size: 18px;
    font-weight: bold;
    color: #17181A;
    line-height: 26px;
  }
  .item-detail{
    margin-top: 4px;
    font-size: 12px;
    color: #5C6066;
    line-height: 18px;
    z-index: 1;
  }
</style>
