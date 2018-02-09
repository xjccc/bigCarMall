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
    padding: 0 32px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    background: #fff;
  }
  .content{
    padding: 16px 0;
    display: flex;
    flex-direction: column;
  }
  .title{
    font-weight: bold;
    height: 78px;
    line-height: 78px;
    border-bottom: 2px solid #EDEDED;
  }
  .item{
    height: 60px;
    line-height: 60px;
    display: flex;
    flex-direction: row;
  }
  .item-text{
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 60px;
    flex-wrap: wrap;
  }
  .item span:first-child{
    font-size: 28px;
    color: #5C6066;
  }
  .item-text span:first-child{
    font-size: 28px;
    line-height: 28px;
    color: #5C6066;
  }
  .item span:last-child{
    margin-left: 16px;
    font-size: 28px;
    color: #17181A;
  }
  .item-text span:last-child{
    flex: 1;
    margin-left: 16px;
    font-size: 28px;
    line-height: 32px;
    color: #17181A;
  }
</style>
