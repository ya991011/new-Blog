<template>
  <div>
    <el-card class="home__about__newArticle">
      <div>最新文章</div>
      <ul>
        <li
          v-for="(item, index) in DetailBlog"
          :key="index"
          @click="toDetail(item.id)"
        >
          {{ item.title }}
        </li>
      </ul>
    </el-card>
    <el-card class="newArticle">
      <div>站点推荐</div>
      <ul>
        <li
          v-for="(item, index) in newList"
          :key="index"
          @click="toDetail(item.id)"
        >
          >
          {{ item.title }}
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { getBlogList, getCodeBlog, getBlogDetail } from "../../utils/http";
export default {
  data() {
    return {
      DetailBlog: {},
      newList: {},
    };
  },
  created() {
    this.getBlog();
  },
  methods: {
    toDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
    async getBlog() {
      let page = {
        page: 1,
      };
      const result = await getBlogList(page);
      this.DetailBlog = result.data.data.blogList.slice(0, 6);
      const result2 = await getCodeBlog(page);
      this.newList = result2.data.data.codeBlog.reverse().slice(0, 6);
    },
    async getArticleDetail() {
      const id = { id: this.$route.params.id };
      const result = await getBlogDetail(id);
      this.blogDetail = result.data.data;
      this.picture = result.data.data.user.picture;
      console.log(this.blogDetail);
      this.$emit("event", this.blogDetail.id);
    },
  },
  watch: {
    $route() {
      this.getArticleDetail();
    },
  },
};
</script>

<style lang="scss" scoped>
.home__about__newArticle {
  width: 300px;
  padding: 10px 30px;
  margin-top: 50px;
  float: right;
  div {
    height: 30px;
    border-bottom: 1px solid #ccc;
  }
  ul {
    margin-top: 20px;
    font-size: 19px;
    cursor: pointer;
    li {
      padding: 10px 0;
    }
    li:hover {
      color: #3a8ee6;
    }
  }
}
.newArticle {
  width: 300px;
  padding: 10px 30px;
  margin-top: 50px;
  position: relative;
  left: 360px;
  top: 450px;
  div {
    height: 30px;
    border-bottom: 1px solid #ccc;
  }
  ul {
    margin-top: 20px;
    font-size: 19px;
    cursor: pointer;
    li {
      padding: 10px 0;
    }
    li:hover {
      color: #3a8ee6;
    }
  }
}
</style>
