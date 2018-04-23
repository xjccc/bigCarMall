<template>
  <div class="location visible">
    <!-- 定位/常用 -->
    <span class="location-title" v-if="usedList.length">定位/常用</span>
    <div class="used-city" ref="used" v-if="usedList.length">
      <div class="used-location">
        <template v-for="item in usedList">
          <span class="used-item" :class="submit.citysn === item.citysn ? 'activeSelect' : ''" @click="chooseUsed(item)">{{item.cityName}}</span>
        </template>
      </div>
    </div>
    <div class="all" @click="chooseAll" :class="submit.provincesn === '' ? 'activeSelect' : ''" v-if="showAll">全国</div>
    <!-- 渲染省份信息 -->
    <div class="content" ref="content">
      <div v-for="item in list">
        <div class="first-name" :ref='`first_${item.letter}`'>
          {{item.letter}}
        </div>
        <div class="province-name" :class="i.provinceid === submit.provincesn ? 'activeSelect' : ''" v-for="i in item.list" @click="chooseProvince(i)">
          {{i.provincename}}
        </div>
      </div>
    </div>
    <!-- 渲染城市列表 -->
    <div class="city-list" :class="showCity ? 'visible' : ''">
      <div class="header">
        <div class="top-back" @click="cityPop">&#xe711;</div>
        <h1 class="top-title">{{cityData.provinceName}}</h1>
      </div>
      <div class="city-content">
        <div class="city-name" :class="item.cityid === submit.citysn ? 'activeSelect' : ''" v-for="item in cityList" @click="chooseCity(item)">
          {{item.cityname}}
        </div>
      </div>
    </div>
    <div class="slider">
      <div class="slider-item" v-for="(item, index) in navList" :data-index="index" @click.prevent.stop="chooseLetter(item)" @touchstart="touchStart(item)" @touchmove.prevent="touchMove" @touchend="touchEnd(item)">
        {{item}}
      </div>
    </div>
    <div class="tips" v-if="showTips">
      {{tip}}
    </div>
  </div>
</template>
<script>
let flag = true
let app = false
export default {
  computed: {
    showAll() {
      if (this.$route.path === '/dacheshi/car/price') {
        return false
      }
      return true
    }
  },
  data: () => ({
    usedList: [],
    cityTitle: '',
    cityList: [],
    // 省份列表
    list: [],
    // 省份nav
    navList: [],
    // 选择地区 省份id
    submit: {
      // 省份
      provincesn: '',
      // 城市
      citysn: ''
    },
    showCity: false,
    tip: '',
    showTips: false,
    cityData: {
      provinceName: '',
      cityName: '',
      provincesn: '',
      citysn: ''
    }
  }),
  created() {
    // 获取常用地区
    let list = this.getStorage('cityUsedList')
    if (list) {
      this.usedList = list
    }
    // 获取省份信息
    let provincecitylist = this.getStorage('provincecitylist')
    let provincecityletters = this.getStorage('provincecityletters')
    this.list = provincecitylist
    this.navList = provincecityletters
    let city = this.getStorage('bigmallChooseCity')
    if (city) {
      this.submit.provincesn = city.provincesn
      this.submit.citysn = city.citysn
    }
    this.setTitle()
  },
  methods: {
    setTitle() {
      // app传title
      this.callNativeMethod('onChangeWebTitle', {
        changeWebTitle: '选择地区'
      })
      // 不显示分享按钮
      this.callNativeMethod('onShowShareButton', {
        isShow: false
      })
      let timer = setTimeout(() => {
        if (!app) {
          this.setTitle()
        }
        if (window.WebViewJavascriptBridge) {
          app = true
          timer && clearTimeout(timer)
        }
      }, 400)
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
          this.$refs[`first_${item}`][0].offsetTop -
          43 -
          (this.usedList.length ? this.$refs['used'].offsetHeight + 36 : 0)
      } else {
        this.$refs.content.scrollTop =
          this.$refs[`first_${item}`][0].offsetTop -
          (this.usedList.length ? this.$refs['used'].offsetHeight + 36 : 0)
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
      if (!isNaN(a) && a < this.list.length && a >= 0) {
        let index = this.list[a].letter
        if (index === this.activeIndex) {
          return
        }
        if (index) {
          this.tip = index
          this.showTips = true
          if (this.showAll) {
            this.$refs.content.scrollTop =
              this.$refs[`first_${index}`][0].offsetTop -
              45 -
              (this.usedList.length ? this.$refs['used'].offsetHeight + 36 : 0)
          } else {
            this.$refs.content.scrollTop =
              this.$refs[`first_${index}`][0].offsetTop -
              44 -
              (this.usedList.length ? this.$refs['used'].offsetHeight + 36 : 0)
          }
        }
      }
    },
    touchEnd(item) {
      let time = setTimeout(() => {
        this.showTips = false
        clearTimeout(time)
      }, 500)
    },
    // 选择常用地区
    chooseUsed(item) {
      this.callNativeMethod('onLocationResult', {
        location: item.cityName
      })
      // 设置选择地区缓存
      this.setStorage('bigmallChooseCity', item)
    },
    // 选择全国
    chooseAll() {
      this.callNativeMethod('onLocationResult', {
        location: '全国'
      })
      this.showCity = false
      // 清除地区缓存
      this.removeStorage('bigmallChooseCity')
    },
    // 选择省份
    chooseProvince(i) {
      this.cityData.provinceName = i.provincename
      this.cityList = i.citylist
      this.cityData.provincesn = i.provinceid
      this.showCity = true
      // 点击省份的时候进行市添加
      flag = true
    },
    // 选择城市
    chooseCity(item) {
      this.callNativeMethod('onLocationResult', {
        location: item.cityname
      })
      // 获取常用地区
      let list = this.getStorage('cityUsedList')
      if (list) {
        this.usedList = list
      }
      // 如果常用列表中有这个市，则不添加
      for (var i = 0; i < this.usedList.length; i++) {
        if (item.cityid === this.usedList[i].citysn) {
          flag = false
        }
      }
      // 如果没有这个市就进行添加
      if (flag) {
        if (this.usedList.length > 5) {
          this.usedList.shift()
          let obj = this.cityData
          this.usedList.push(obj)
        } else {
          let obj = this.cityData
          this.usedList.push(obj)
        }
      }
      this.cityData.citysn = item.cityid
      this.cityData.cityName = item.cityname
      this.setStorage('cityUsedList', this.usedList)

      this.showCity = false
      // 设置选择地区缓存
      this.setStorage('bigmallChooseCity', this.cityData)
    },
    // 关闭城市弹层
    cityPop() {
      this.showCity = false
    }
  }
}
</script>
<style scoped>
  .location{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: #F5F5F5;
    transform: translate3d(100%, 0, 0);
    transition: all .3s ease;
    z-index: 8;
  }
  .city-list{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
    background-color: #F5F5F5;
    transform: translate3d(100%, 0, 0);
    transition: all .3s ease;
    z-index: 9;
  }
  .visible {
    transform: translate3d(0, 0, 0);
  }
  .header {
    position: relative;
    height: 44px;
    line-height: 44px;
    font-size: 18px;
    color: #333;
    background: #fff;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,0.06), 0 -1px 0 0 #F5F5F5;
  }
  .top-back{
    position: absolute;
    top: 0;
    left: 16px;
    width: 44px;
    height: 44px;
    line-height: 44px;
    font-family: 'carMall';
    font-size: 18px;
    color: #17181A;
  }
  .top-title{
    font-size: 18px;
    color: #333;
    text-align: center;
  }
  .location-title{
    padding-left: 16px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #A1A9B2;
  }
  .used-city{
    padding: 0 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 48px;
    background: #fff;
  }
  .used-location{
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .used-item{
    margin-left: 8px;
    margin-top: 4px;
    margin-bottom: 4px;
    font-size: 14px;
    line-height: 14px;
    color: #333;
    width: calc(30vw - 30px);
    padding: 9px 10px;
    border: 1px solid #E9E9E9;
    border-radius: 20px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .used-item:nth-of-type(3n-2){
    margin-left: 0;
  }
  .all{
    border-top: 1px solid #EDEDED;
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
    font-size: 14px;
    color: #A1A9B2;
  }
  .province-name{
    padding-left: 16px;
    height: 43px;
    line-height: 43px;
    border-bottom: 1px solid #EDEDED;
    background: #fff;
    font-size: 14px;
    color: #17181A;
  }
  .province-name:last-child{
    height: 44px;
    line-height: 44px;
    border-bottom: none;
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
  .city-content{
    margin-top: 2px;
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .city-name{
    padding-left: 16px;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    color: #17181A;
    border-bottom: 1px solid #EDEDED;
    background: #fff;
  }
  .activeSelect{
    color: #09BB07;
  }
</style>
