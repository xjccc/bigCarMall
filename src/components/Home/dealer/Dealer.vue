<template>
  <div class="dealer">
    <item-header :title="'经销商'" @more="getMoreDiscount"></item-header>
    <div class="dealer-content">
      <template v-for="item in dealer">
        <item-dealer :item="item" @toDetail="toDetail"></item-dealer>
      </template>
    </div>
  </div>
</template>
<script>
import ItemHeader from '@/components/ItemHeader'
import ItemDealer from '@/components/home/dealer/ItemDealer'

export default {
  props: ['dealer'],
  components: {
    ItemHeader,
    ItemDealer
  },
  data: () => ({}),
  methods: {
    getMoreDiscount() {
      this.$router.push('/dacheshi/dealer')
    },
    toDetail(url) {
      window.location.href = url
    }
  }
}
</script>
<style scoped>
  .dealer{
    background: #fff;
  }
  .dealer .item-dealer:first-child{
    margin-top: 5px;
    padding:  0 16px 16px;
  }
  .dealer .item-dealer:last-child{
    height: 92px;
    border: 0;
  }
</style>
