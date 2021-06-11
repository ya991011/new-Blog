<template>
  <!-- 主页右侧最新文章 -->
  <div class="home__about__newArticle">
    <div>最新文章</div>
    <ul>
      <li v-for="(item, index) in newBlog" :key="index">
        {{ item.title | snippet }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NewArticle",
  props: ["newBlog"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.home__about__newArticle {
  margin-top: 50px;
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
