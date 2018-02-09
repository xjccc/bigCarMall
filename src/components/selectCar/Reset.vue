<template>
  <div class="reset">
    <div class="item-content">
      <template v-for="(item,index) in data">
        <div class="item" @click="deleteItem(index)" v-if="item">
          <span class="item-name">{{item}}</span>
          <span class="close">&#xe704;</span>
        </div>
      </template>
    </div>
    <span class="reset-name" @click="resets">重置</span>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data: () => ({}),
  methods: {
    // 删除当前元素
    deleteItem(index) {
      this.$emit('delete-item', index)
    },
    // 重置清空
    resets() {
      this.$emit('reset')
    }
  }
}
</script>
<style scoped>
  .reset{
    padding: 0 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 96px;
  }
  .item-content{
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .item{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 16px;
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 12px 16px;
    background: #fff;
  }
  .item-name{
    font-size: 24px;
    color: #17181A;
    line-height: 40px;
  }
  .close{
    font-family: 'carMall';
    font-size: 24px;
    color: #FF6600;
    margin-left: 24px;
  }
  .reset-name{
    width: 80px;
    font-size: 24px;
    color: #508DFD;
    height: 80px;
    line-height: 80px;
    text-align: right;
  }
  .reset-name:before{
    font-family: 'carMall';
    content: "\e717";
    margin-right: 4px;
    font-size: 24px;
    color: #508DFD;
  }
</style>
