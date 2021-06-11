<template>
  <div class="home">
    <div class="home__container">
      <div class="home__title">
        <div class="home__title__left">
          <div class="el__carousel">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in homeImage" :key="item.id">
                <img :src="item.url" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="home__title__right">
          <div class="title__me">
            <div class="title__me__top">关于博主</div>
            <div class="title__me__bottom">敢死队风格</div>
          </div>
        </div>
      </div>
      <div class="home__article">
        <div class="home__article__pilot">最新文章</div>
        <Section :BlogList="BlogList" />
        <div class="pagination">
          <Pagination @event="blogList($event)" />
        </div>
      </div>
      <div class="home__about">
        <div class="home__about__title">
          <div class="title__attention">关注我</div>
          <div class="title__contact">
            <div class="title__contact__information">
              <img src="../../../public/1.jpg" class="contact__img" />
              <p>新浪微博</p>
            </div>
            <div class="title__contact__information">
              <img src="../../../public/4.jpg" class="contact__img" />
              <p>腾讯微信</p>
            </div>
          </div>
        </div>
        <NewArticle :newBlog="newBlog" />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination.vue";
import Section from "../../components/Section";
import NewArticle from "../../components/NewArticle";
import { getBlogList } from "../../utils/http";
export default {
  components: {
    Section,
    Pagination,
    NewArticle,
  },
  data() {
    return {
      homeImage: [
        { id: 1, url: require("../../../public/1.jpg") },
        { id: 2, url: require("../../../public/2.jpg") },
        { id: 3, url: require("../../../public/3.jpg") },
        { id: 4, url: require("../../../public/4.jpg") },
      ],
      BlogList: [],
      newBlog: {},
    };
  },
  created() {
    this.getBlog();
  },
  methods: {
    async getBlog() {
      let page = {
        page: 1,
      };
      const result = await getBlogList(page);
      console.log(result);
      this.BlogList = result.data.data.blogList;
      console.log(this.BlogList);
      this.newBlog = this.BlogList.slice(0, 6);
    },
    blogList(data) {
      this.BlogList = data;
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  width: 1200px;
  margin: 20px auto;
  .pagination {
    margin-left: 45%;
    margin-top: 20px;
  }
  &__article {
    width: 750px;
  }
  &__article__pilot {
    width: 750px;
    margin: 5px 0;
    border-bottom: 5px solid red;
    padding: 10px 0;
  }
  &__container {
    position: relative;
  }
  &__about {
    position: absolute;
    top: 0;
    right: 0;
    width: 350px;
    height: 500px;
    padding: 20px 20px;
    &__title {
      .title__attention {
        height: 30px;
        border-bottom: 1px solid #ccc;
      }
      .title__contact {
        height: 100px;
        cursor: pointer;
        &__information {
          float: left;
          margin-top: 25px;
          margin-right: 30px;
          .contact__img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
          }
        }
      }
    }
  }
  &__title {
    width: 750px;
    overflow: hidden;
    &__left {
      width: 450px;
      float: left;
    }
    &__right {
      float: left;
    }
  }
  &__title__right {
    .title__me__top {
      width: 280px;
      height: 140px;
      border: 1px dashed red;
      margin-bottom: 20px;
      background: blanchedalmond;
    }
    .title__me__bottom {
      width: 280px;
      height: 140px;
      background: cadetblue;
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
