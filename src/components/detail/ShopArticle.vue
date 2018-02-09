<template>
  <div class="article">
    <div class="header">
      <span class="header-title">车型评测</span>
    </div>
    <template v-for="item in articleData">
      <div class="item" @click="toUrl(item.Url)">
        <figure>
          <img :src="item.Image" onerror="this.onerror=null;this.src='https://s.kcimg.cn/gonggao/default90.jpg';">
        </figure>
        <div class="content">
          <span class="title">{{item.Title}}</span>
          <div class="content-footer">
            <span>{{item.CategoryName}}</span>
            <span class="comment-num">{{item.CommentNum}}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
// import ItemHeader from '@/components/ItemHeader'

export default {
  props: ['articleData'],
  data: () => ({}),
  methods: {
    toUrl(url) {
      window.location.href = url
    }
  }
}
</script>
<style scoped>
  .article{
    background: #fff;
  }
  .header{
    padding: 0 32px;
    margin-top: 16px;
    height: 96px;
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .header-title{
    font-size: 40px;
    color: #17181A;
    line-height: 60px;
  }
  .item{
    padding: 32px 32px 30px;
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid #EDEDED;
  }
  .item:last-child{
    padding: 32px;
    border-bottom: 0;
  }
  .item figure{
    width: 220px;
    height: 150px;
  }
  .item figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .content{
    margin-left: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .title{
    font-size: 28px;
    color: #17181A;
    line-height: 40px;
    word-break: break-all;
    text-overflow:ellipsis;
    overflow:hidden;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .content-footer{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .content-footer span{
    font-size: 24px;
    color: #A1A9B2;
    line-height: 36px;
  }
  .comment-num:before{
    margin-right: 4px;
    font-family: 'carMall';
    content: "\e712";
  }
</style>
