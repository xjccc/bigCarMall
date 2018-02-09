<template>
  <div class="why-choose">
    <div class="title">为什么选择卡车之家大车市</div>
    <div class="why-content">
      <template v-for="item in whyData">
        <div class="item">
          <figure>
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
        title: '随时退定金',
        detail: '不买车随时退订金，无须担心资金风险。'
      }
    ]
  })
}
</script>
<style scoped>
  .why-choose{
    padding: 24px 32px 32px;
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
  .why-content{
    margin-top: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .item{
    margin-top: 18px;
    padding: 24px;
    width: 334px;
    height: 260px;
    border: 2px solid #EDEDED;
    border-radius: 8px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .item figure{
    position: absolute;
    right: 24px;
    bottom: 24px;
    z-index: 0;
  }
  .item figure img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
    object-fit: cover;
  }
  .item-title{
    margin-top: 8px;
    font-size: 36px;
    font-weight: bold;
    color: #17181A;
    line-height: 52px;
  }
  .item-detail{
    margin-top: 8px;
    font-size: 24px;
    color: #5C6066;
    line-height: 36px;
    z-index: 1;
  }
</style>
