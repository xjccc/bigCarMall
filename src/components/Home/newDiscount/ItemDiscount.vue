<template>
  <div class="item-discount" @click="jumpToDetail(item.ProductId)">
    <figure>
      <img :src="item.MainImg" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
    </figure>
    <div class="descripe">
      <span class="detail">{{item.Title}}</span>
      <div class="price"><span>支付<em>{{item.Margin}}</em>元抵扣<em>{{item.CouponDeductible}}</em>元</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['item'],
  data: () => ({}),
  methods: {
    jumpToDetail(id) {
      this.$router.push({ path: `/home/active/detail/${id}` })
    }
  }
}
</script>
<style scoped>
  .item-discount{
    display: flex;
    flex-direction: row;
    padding: 32px;
    border-bottom: 2px solid #ededed;
  }
  .item-discount figure{
    width: 224px;
    height: 150px;
  }
  .item-discount figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .descripe{
    flex: 1;
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .detail{
    font-size: 32px;
    color: #17181A;
    line-height: 48px;
    text-overflow:ellipsis;
    word-break: break-all;
    overflow:hidden;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .price{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 14px;
    line-height: 40px;
  }
  .price span{
    font-size: 24px;
    color: #FF6600;
  }
  .price em{
    margin: 0 8px;
    font-size: 28px;
    line-height: 40px;
    font-weight: bold;
  }
</style>
