<template>
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
        <div class="detail__title">{{ blogDetail.title }}</div>
        <div class="detail-time">
          <span
            class="detail__avatar"
            @click="
              getPersonCenter(blogDetail.user.id, blogDetail.user.username)
            "
          >
            <el-avatar
              v-if="blogDetail.user.picture"
              :src="blogDetail.user.picture"
              size="small"
            ></el-avatar
          ></span>
          <span class="detail__author">{{ blogDetail.user.username }}</span>
          <span class="detail__createdAt">{{ blogDetail.createdAt }}</span>
          <span class="detail__tag"
            ><el-tag size="small">{{ blogDetail.region }}</el-tag></span
          >
        </div>
        <div class="detail__content" v-html="blogDetail.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBlogDetail } from "../../utils/http";
export default {
  data() {
    return {
      blogDetail: {
        picture: "",
        nickname: "",
      },
      text: "",
    };
  },
  created() {
    this.getArticleDetail();
  },
  methods: {
    async getArticleDetail() {
      const id = { id: this.$route.params.id };
      const result = await getBlogDetail(id);
      this.blogDetail = result.data.data;
      this.$emit("event", this.blogDetail.id);
    },
    async getPersonCenter(user_id, username) {
      const userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      if (userInfo) {
        if (userInfo.username == username) {
          this.$router.push("/personal");
        } else {
          this.$router.push({
            path: "/personal_center",
            query: { id: user_id },
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "请先登录！",
        });
      }
    },
  },
  watch: {
    $route() {
      this.getArticleDetail();
    },
  },
};
</script>

<style lang="scss">
.detail {
  &__left {
    width: 1100px;
    &__title {
      border-bottom: 3px solid red;
      padding: 15px 10px;
    }
    &__content {
      padding: 0 20px;
      overflow: hidden;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      word-break: break-all;
      word-wrap: break-word;
      font-size: 18px;
      background: #fff;
      padding: 30px;
      .detail__title {
        font-size: 25px;
        font-weight: bold;
      }
      .detail-time {
        font-size: 16px;
        line-height: 100px;
        .detail__author {
          margin: 0 20px;
        }
        .detail__tag {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
