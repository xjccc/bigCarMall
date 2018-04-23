<template>
  <div class="buyer">
    <div class="title">购车人信息</div>
    <div class="content">
      <div class="item">
        <span>填写姓名</span>
        <span>{{info.user_name}}</span>
      </div>
      <div class="item">
        <span>电话号码</span>
        <span>{{info.user_tel}}</span>
      </div>
      <div class="item-text" v-if="info.user_remark">
        <span>备注信息</span>
        <span>{{info.user_remark}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['info'],
  data: () => ({})
}
</script>
<style scoped>
  .buyer{
    padding: 0 16px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    background: #fff;
  }
  .content{
    padding: 8px 0;
    display: flex;
    flex-direction: column;
  }
  .title{
    font-weight: bold;
    height: 39px;
    line-height: 39px;
    border-bottom: 1px solid #EDEDED;
  }
  .item{
    height: 30px;
    line-height: 30px;
    display: flex;
    flex-direction: row;
  }
  .item-text{
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 30px;
    flex-wrap: wrap;
  }
  .item span:first-child{
    font-size: 14px;
    color: #5C6066;
  }
  .item-text span:first-child{
    font-size: 14px;
    line-height: 14px;
    color: #5C6066;
  }
  .item span:last-child{
    margin-left: 8px;
    font-size: 14px;
    color: #17181A;
  }
  .item-text span:last-child{
    flex: 1;
    margin-left: 8px;
    font-size: 14px;
    line-height: 16px;
    color: #17181A;
  }
</style>
