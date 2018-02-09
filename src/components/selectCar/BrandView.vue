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
      if (this.$route.path === '/home/car/price') {
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
          this.$refs[`first_${item}`][0].offsetTop - 176 - 6
      } else {
        this.$refs.content.scrollTop =
          this.$refs[`first_${item}`][0].offsetTop - 88 - 6
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
              this.$refs[`first_${index}`][0].offsetTop - 176 - 6
          } else {
            this.$refs.content.scrollTop =
              this.$refs[`first_${index}`][0].offsetTop - 88 - 6
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
    margin-bottom: 6px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 36px;
    box-shadow: 0 6px 8px 0 rgba(0,0,0,0.06), 0 -2px 0 0 #F5F5F5;
  }
  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 120px;
    height: 88px;
    color: #17181A;
    line-height: 88px;
    font-family: 'carMall'
  }
  .all{
    height: 88px;
    line-height: 88px;
    background: #fff;
    padding-left: 32px;
    font-size: 28px;
    color: #17181A;
  }
  .content{
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .first-name{
    padding-left: 32px;
    height: 72px;
    line-height: 72px;
    background: #F5F5F5;
    font-size: 28px;
    color: #A1A9B2;
  }
  .brand-name{
    margin-left: 32px;
    height: 86px;
    line-height: 86px;
    border-bottom: 2px solid #EDEDED;
    font-size: 28px;
    color: #17181A;
  }
  .brand-name:last-child{
    height: 88px;
    line-height: 88px;
    border-bottom: none;
  }
  .activeSelect{
    color: #09BB07;
  }
  .slider{
    position: fixed;
    right: 8px;
    top: 200px;
    width: 36px;
    text-align: center;
  }
  .slider-item{
    font-size: 24px;
    color: #A1A9B2;
    line-height: 40px;
  }
  .slider-visible{
    color: #0B0C00;
  }
  .tips{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -80px;
    margin-top: -80px;
    width: 160px;
    height: 160px;
    background: rgba(0,0,0,.6);
    border-radius: 8px;
    font-size: 96px;
    color: #fff;
    line-height: 160px;
    text-align: center;
  }
</style>
