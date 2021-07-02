<template>
  <div class="detail-home">
    <Header />
    <div class="detail1">
      <Content @event="getBlog_id($event)" />
      <Comment :comment="comment" :blog_id="blog_id" />
      <div class="detail__right">
        <NewArticleDetail />
      </div>
      <UPTop />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import NewArticleDetail from "./NewArticleDetail.vue";
import UPTop from "../../components/UPTop.vue";
import Comment from "./Comment.vue";
import Content from "./Content.vue";
// import { getCommList } from '../../utils/http'
export default {
  components: { Header, NewArticleDetail, UPTop, Content, Comment, Footer },
  data() {
    return {
      comment: {},
      blog_id: "",
    };
  },
  created() {},
  methods: {
    getBlog_id(data) {
      this.blog_id = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-home {
  position: relative;
  min-height: 2000px;
  .detail1 {
    min-height: 2100px;
    width: 1800px;
    margin: 0 auto;
    position: relative;
    .detail__right {
      position: absolute;
      right: 250px;
      top: 20px;
    }
  }
}
</style>
