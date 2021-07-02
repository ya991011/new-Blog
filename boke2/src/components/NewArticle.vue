<template>
  <!-- 主页右侧最新文章 -->
  <div>
    <template v-if="newBlog">
      <div class="home__about__newArticle">
        <div>最新文章</div>
        <ul>
          <li
            v-for="(item, index) in newBlog"
            :key="index"
            @click="toDetail(item.id)"
          >
            {{ item.title | snippet }}
          </li>
        </ul>
      </div>
    </template>
    <template v-if="newCodeBlog">
      <div class="home__about__newArticle">
        <div>最新文章</div>
        <ul>
          <li
            v-for="(item, index) in newCodeBlog"
            :key="index"
            @click="toDetail(item.id)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "NewArticle",
  props: ["newBlog", "newCodeBlog", "newHomeBlog"],
  data() {
    return {};
  },
  methods: {
    toDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.home__about__newArticle {
  margin-top: 50px;
  float: right;
  div {
    height: 30px;
    width: 350px;
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
