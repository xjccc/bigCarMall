<template>
  <div class="quoted">
    <item-header :title="'最新报价'" @more="getMoreQuoted"></item-header>
    <div class="quoted-content">
      <template v-for="item in listData">
        <item-quoted :item="item"></item-quoted>
      </template>
    </div>
  </div>
</template>
<script>
import ItemHeader from '@/components/ItemHeader'
import ItemQuoted from '@/components/Home/newQuoted/ItemQuoted'

export default {
  props: ['listData'],
  components: {
    ItemHeader,
    ItemQuoted
  },
  data: () => ({}),
  methods: {
    getMoreQuoted() {
      this.$router.push('/home/car')
    }
  }
}
</script>
<style scoped>
  .quoted{
    background: #fff;
  }
  .quoted-content{
    padding: 20px 32px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
