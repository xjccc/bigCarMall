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
      this.$router.push({ path: `/dacheshi/active/detail/${id}` })
    }
  }
}
</script>
<style scoped>
  .item-discount{
    display: flex;
    flex-direction: row;
    padding: 16px;
    border-bottom: 1px solid #ededed;
  }
  .item-discount figure{
    width: 112px;
    height: 75px;
  }
  .item-discount figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .descripe{
    flex: 1;
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .detail{
    font-size: 16px;
    color: #17181A;
    line-height: 24px;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 7px;
    line-height: 20px;
  }
  .price span{
    font-size: 12px;
    color: #FF6600;
  }
  .price em{
    margin: 0 4px;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
  }
</style>
