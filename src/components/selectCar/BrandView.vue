<template>
  <div :class="['brand', showBrand ? 'visible' : '']">
    <div class="header">
      <span class="back" @click="pop">&#xe711;</span> 选择品牌
    </div>
    <div class="all" @click="chooseAll" :class="id === '' ? 'activeSelect' : ''" v-if="showAll">不限品牌</div>
    <div class="content" ref="content">
      <div v-for="item in data">
        <div class="first-name" :ref='`first_${item.letter}`'>
          {{item.letter}}
        </div>
        <div class="brand-name" :class="i.brandid === id ? 'activeSelect' : ''" v-for="i in item.list" @click="chooseBrand(i)">
          {{i.brandname}}
        </div>
      </div>
    </div>
    <div class="slider">
      <div class="slider-item" v-for="(item, index) in letter" :data-index="index" @click.prevent.stop="chooseLetter(item)" @touchstart="touchStart(item)" @touchmove.prevent="touchMove" @touchend="touchEnd(item)">
        {{item}}
      </div>
    </div>
    <div class="tips" v-if="showTips">
      {{tip}}
    </div>
  </div>
</template>
<script>
export default {
  props: ['showBrand', 'data', 'letter', 'id'],
  computed: {
    showAll() {
      if (this.$route.path === '/dacheshi/car/price') {
        return false
      }
      return true
    }
  },
  data: () => ({
    tip: '',
    showTips: false
  }),
  methods: {
    // 关闭弹层
    pop() {
      this.$emit('pop')
    },
    //  选择不限品牌
    chooseAll() {
      if (!this.showAll) return
      this.$emit('chooseAll')
      this.$emit('pop')
    },
    // 选择品牌
    chooseBrand(item) {
      this.$emit('choose-brand', item)
    },
    // 点击右边栏跳转
    chooseLetter(item) {
      this.tip = item
      this.showTips = true
      setTimeout(() => {
        this.showTips = false
      }, 500)
      if (this.showAll) {
        this.$refs.content.scrollTop =
          this.$refs[`first_${item}`][0].offsetTop - 88 - 3
      } else {
        this.$refs.content.scrollTop =
          this.$refs[`first_${item}`][0].offsetTop - 44 - 3
      }
    },
    // 滑动跳转
    touchStart(item) {
      this.activeIndex = item
      let time = setTimeout(() => {
        this.tip = item
        this.showTips = true
        clearTimeout(time)
      }, 300)
    },
    touchMove(e) {
      let num = e.target.dataset.index
      let top = e.target.offsetTop
      let a = Math.floor(
        (e.changedTouches[0].pageY - e.currentTarget.offsetTop) / (top / num)
      )
      if (!isNaN(a) && a < this.letter.length && a >= 0) {
        let index = this.data[a].letter
        if (index === this.activeIndex) {
          return
        }
        if (index) {
          this.tip = index
          this.showTips = true
          if (this.showAll) {
            this.$refs.content.scrollTop =
              this.$refs[`first_${index}`][0].offsetTop - 88 - 3
          } else {
            this.$refs.content.scrollTop =
              this.$refs[`first_${index}`][0].offsetTop - 44 - 3
          }
        }
      }
    },
    touchEnd(item) {
      let time = setTimeout(() => {
        this.showTips = false
        clearTimeout(time)
      }, 500)
    }
  }
}
</script>
<style scoped>
  .brand{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    transform: translate3d(100%, 0, 0);
    transition: all .3s ease;
    z-index: 10;
  }
  .visible {
    transform: translate3d(0, 0, 0);
  }
  .header {
    margin-bottom: 3px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,0.06), 0 -1px 0 0 #F5F5F5;
  }
  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 44px;
    color: #17181A;
    line-height: 44px;
    font-family: 'carMall'
  }
  .all{
    height: 44px;
    line-height: 44px;
    background: #fff;
    padding-left: 16px;
    font-size: 14px;
    color: #17181A;
  }
  .content{
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .first-name{
    padding-left: 16px;
    height: 36px;
    line-height: 36px;
    background: #F5F5F5;
    font-size: 14px;
    color: #A1A9B2;
  }
  .brand-name{
    margin-left: 16px;
    height: 43px;
    line-height: 43px;
    border-bottom: 1px solid #EDEDED;
    font-size: 14px;
    color: #17181A;
  }
  .brand-name:last-child{
    height: 44px;
    line-height: 44px;
    border-bottom: none;
  }
  .activeSelect{
    color: #09BB07;
  }
  .slider{
    position: fixed;
    right: 4px;
    top: 100px;
    width: 18px;
    text-align: center;
  }
  .slider-item{
    font-size: 12px;
    color: #A1A9B2;
    line-height: 20px;
  }
  .slider-visible{
    color: #0B0C00;
  }
  .tips{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -40px;
    margin-top: -40px;
    width: 80px;
    height: 80px;
    background: rgba(0,0,0,.6);
    border-radius: 4px;
    font-size: 48px;
    color: #fff;
    line-height: 80px;
    text-align: center;
  }
</style>
