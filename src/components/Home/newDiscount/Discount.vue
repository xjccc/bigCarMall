<template>
  <div class="discount">
    <item-header :title="'最新优惠'" @more="getMoreDiscount"></item-header>
    <div class="discount-content">
      <template v-for="item in data">
        <item-discount :item="item"></item-discount>
      </template>
    </div>
  </div>
</template>
<script>
import ItemHeader from '@/components/ItemHeader'
import ItemDiscount from '@/components/home/newDiscount/ItemDiscount'

export default {
  props: ['data'],
  components: {
    ItemHeader,
    ItemDiscount
  },
  data: () => ({}),
  methods: {
    getMoreDiscount() {
      this.$router.push('/dacheshi/active')
    }
  }
}
</script>
<style scoped>
  .discount{
    background: #fff;
  }
  .discount-content .item-discount:first-child{
    padding: 10px 16px 16px;
  }
  .discount-content .item-discount:last-child{
    border-bottom: 0;
  }
</style>
