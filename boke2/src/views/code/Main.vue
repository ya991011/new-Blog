<template>
  <div class="container">
    <div class="main">
      <div class="main__left">
        <Section :codeBlog="codeBlog" />
        <div class="pagination">
          <Pagination @event="codeBlog2($event)" />
        </div>
      </div>
      <div class="main__right">
        <NewArticle :newCodeBlog="newCodeBlog" />
      </div>
    </div>
  </div>
</template>

<script>
import { getCodeBlog } from "../../utils/http";
import Pagination from "./Pagination.vue";
import Section from "../../components/Section.vue";
import NewArticle from "../../components/NewArticle";
export default {
  // props: ["codeBlog", "newCodeBlog"],
  components: {
    Section,
    Pagination,
    NewArticle,
  },
  data() {
    return {
      codeBlog: [],
      newCodeBlog: {},
    };
  },
  created() {
    this.getCodeBlogList();
  },
  methods: {
    codeBlog2(data) {
      this.codeBlog = data;
    },
    async getCodeBlogList() {
      const page = {
        page: 1,
      };
      const result = await getCodeBlog(page);
      this.codeBlog = result.data.data.codeBlog;
      console.log(this.codeBlog);
      this.newCodeBlog = result.data.data.codeBlog.slice(0, 5);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  .main {
    width: 1400px;
    margin: 0 auto;
    padding-top: 20px;
    position: relative;
    .main__left {
      width: 750px;
      border-top: 5px solid red;
      padding: 20px 0;
      .pagination {
        margin: 20px 300px;
      }
    }
    .main__right {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
