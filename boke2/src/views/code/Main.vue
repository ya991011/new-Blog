<template>
  <div class="container">
    <div class="main">
      <div class="main__left">
        <Section />
        <div class="pagination">
          <Pagination />
        </div>
      </div>
      <div class="main__right">
        <NewArticle />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination.vue";
import Section from "../../components/Section.vue";
import NewArticle from "../../components/NewArticle";
export default {
  components: {
    Section,
    Pagination,
    NewArticle,
  },
};
</script>

<style scoped lang="scss">
.container {
  .main {
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
    position: relative;
    .main__left {
      width: 750px;
      border-top: 5px solid red;
      padding: 20px 0;
      .pagination {
        margin: 20px 90px;
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
