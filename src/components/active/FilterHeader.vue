<template>
  <div class="select-car">
    <div class="filters new" @click="show">
      <span>{{showTitle}}</span>
      <div class="hidden" :class="showSelect ? 'hidden-visible' : ''">
        <div class="new-item" @click.stop="selectType('1')">最新发布</div>
        <div class="new-item" @click.stop="selectType('2')">优惠最多</div>
        <div class="new-item" @click.stop="selectType('3')">即将结束</div>
      </div>
    </div>
    <div class="filters" @click="showBrand">
      <span>{{brandName ? brandName : '品牌'}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'brandName'],
  computed: {
    showTitle() {
      if (this.title === '2') {
        return '优惠最多'
      } else if (this.title === '3') {
        return '即将结束'
      }
      return '最新发布'
    }
  },
  data: () => ({
    showSelect: false
  }),
  methods: {
    show() {
      this.showSelect = !this.showSelect
    },
    showBrand() {
      this.$emit('showBrand')
    },
    selectType(type) {
      this.showSelect = false
      this.$emit('selectType', type)
    }
  }
}
</script>
<style scoped>
  .select-car{
    display: flex;
    flex-direction: row;
    height: 44px;
    background: #fff;
    box-shadow: 0 -1px 0 0 #F5F5F5;
  }
  .select-car .filters{
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 12px;
  }
  .select-car .new{
    position: relative;
  }
  .hidden{
    display: none;
    position: absolute;
    top: 46px;
    left: 0;
    right: 0;
    padding: 6px 12px;
    background: #fff;
    border-top: 1px solid #EDEDED;
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
  }
  .hidden-visible{
    display: block;
    opacity: 1;
    animation: showNews 0.3s;
    z-index: 1;
  }
  @keyframes showNews {
    0% {opacity: 0}
    100% {opacity: 1}
  }
  @keyframes closeNews {
    0% {opacity: 1}
    100% {opacity: 0}
  }
  .hidden .new-item{
    text-align: center;
    padding: 6px 0;
    font-size: 15px;
    line-height: 18px;
  }
  .select-car .filters:after{
    content: "";
    position: absolute;
    top: 12px;
    right: 0;
    width: 1px;
    height: 20px;
    background: #EDEDED;
  }
  .select-car .filters:last-child:after{
    width: 0;
  }
  .select-car .filters span{
    position: relative;
    display: flex;
    flex: 1;
    font-size: 14px;
    color: #5C6066;
    line-height: 20px;
  }
  .select-car .filters span:after{
    font-family: 'carMall';
    content: "\e718";
    position: absolute;
    top: 0;
    right: 0;
    font-size: 12px;
    color: #CFD3D8;
    transform: scale(.5);
  }
</style>
