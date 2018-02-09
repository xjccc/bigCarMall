<template>
  <div class="news">
    <item-header :title="'促销新闻'" @more="getMoreSaleNews"></item-header>
    <div class="news-content">
      <template v-for="item in list">
        <item-sale :item="item"></item-sale>
      </template>
    </div>
  </div>
</template>
<script>
import ItemHeader from '@/components/ItemHeader'
import ItemSale from '@/components/Home/newSaleNews/ItemSale'

export default {
  props: ['list'],
  components: {
    ItemHeader,
    ItemSale
  },
  data: () => ({
    newsData: []
  }),
  methods: {
    getMoreSaleNews() {
      // 促销活动
      this.$router.push('/home/discountActive')
    }
  }
}
</script>
<style scoped>
  .news{
    background: #fff;
  }
  .news-content{
    padding-bottom: 12px;
  }
</style>
