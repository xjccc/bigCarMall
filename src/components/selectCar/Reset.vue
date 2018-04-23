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
    padding: 0 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 48px;
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
    margin-right: 8px;
    margin-top: 4px;
    margin-bottom: 4px;
    padding: 6px 8px;
    background: #fff;
  }
  .item-name{
    width: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    color: #17181A;
    line-height: 20px;
  }
  .close{
    font-family: 'carMall';
    font-size: 12px;
    color: #FF6600;
    margin-left: 5px;
  }
  .reset-name{
    width: 40px;
    font-size: 12px;
    color: #508DFD;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .reset-name:before{
    font-family: 'carMall';
    content: "\e717";
    margin-right: 2px;
    font-size: 12px;
    color: #508DFD;
  }
</style>
