<template>
  <div>
    <Header />
    <div class="detail">
      <div class="detail__left">
        <div class="detail__left__title">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>最新文章</el-breadcrumb-item>
            <el-breadcrumb-item>文章详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="detail__left__content">
          <div class="detail__title">{{blogDetail.title}}</div>
          <div class="detail-time">
            <span class="detail__avatar">
            <el-avatar :src="blogDetail.user.picture" size="small"></el-avatar></span>
            <span class="detail__author">{{blogDetail.user.nickname}}</span>
          <span class="detail__createdAt">{{blogDetail.createdAt}}</span>
          <span class="detail__tag"><el-tag size="small">{{blogDetail.region}}</el-tag></span>
          </div>
          <div class="detail__content" v-html="blogDetail.content"></div>
        </div>
        <div class="detail__left__comment">jhsdfjk</div>
      </div>
      <div class="detail__right">
        <NewArticle />
      </div>
      <UPTop />
    </div>
    <Emojis />
  </div>
</template>

<script>
import Emojis from '../../components/Emojis.vue';
import Header from "../../components/Header.vue";
import NewArticle from "../../components/NewArticle.vue";
import UPTop from "../../components/UPTop.vue";
import { getBlogDetail } from '../../utils/http'
export default {
  components: { Header, NewArticle, UPTop, Emojis },
  data(){
    return{
      blogDetail:{}
    }
  },
  created(){
    this.getArticleDetail()

  },
  methods:{
    async getArticleDetail(){
      const id = {id:this.$route.params.id}
      const result = await getBlogDetail(id)
      this.blogDetail = result.data.data
      console.log(this.blogDetail)
    }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  width: 1800px;
  min-height: 1000px;
  margin: 20px auto;
  position: relative;
  &__left {
    width: 1100px;
    &__title {
      border-bottom: 3px solid red;
      padding: 15px 10px;
    }
    &__content {
      font-size: 20px;
      background: #fff;
      padding: 30px;
      .detail__title{
        font-size: 25px;
        font-weight: bold;
      }
      .detail-time{
        font-size: 16px;
        line-height: 100px;
        .detail__author{
          margin: 0 20px;
        }
        .detail__tag{
          margin-left: 20px;
        }
      }
    }
  }
  &__right {
    position: absolute;
    right: 250px;
    top: 20px;
  }
}
</style>
