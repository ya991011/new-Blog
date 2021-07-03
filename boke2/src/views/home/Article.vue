<template>
  <div class="home">
    <div class="home__container">
      <div class="home__title">
        <div class="home__title__left">
          <div class="el__carousel">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in homeImage" :key="item.id">
                <img
                  :src="item.imageUrl"
                  style="width: 100%; height: 100%"
                  @click="toDetail(item.id)"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="home__title__right">
          <div class="title__me">
            <div class="title__me__top">
              关于博主
              <p v-if="user" class="me">
                博主{{ user.username }} 毕业于{{ user.school }}
              </p>
              <p v-else class="login">请先登录！</p>
            </div>
            <div class="title__me__bottom">
              <div
                class="img"
                @mouseover="handleover()"
                @mouseleave="handleout()"
              >
                <img :src="titleBlog.imageUrl" />
                <div class="back" ref="back">{{ titleBlog.title }}</div>
              </div>
            </div>
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
          <div class="title__attention">我的关注({{ attentionNumber }})</div>
          <div class="title__contact">
            <div
              class="title__contact__information"
              v-for="(item, index) in attentionList"
              :key="index"
            >
              <img
                :src="item.user.picture"
                class="contact__img"
                @click="toPerson(item.user.id)"
              />
              <p>{{ item.user.username }}</p>
            </div>
          </div>
        </div>
        <NewArticle :newBlog="newBlog" />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import Section from "../../components/Section";
import NewArticle from "../../components/NewArticle";
import { getBlogList, getUserInfo, getAttentionList } from "../../utils/http";
export default {
  components: {
    Section,
    Pagination,
    NewArticle,
  },
  data() {
    return {
      homeImage: [],
      BlogList: [],
      newBlog: {},
      user: [],
      titleBlog: {},
      attentionList: [],
      attentionNumber: "",
    };
  },
  created() {
    this.getBlog();
    this.getUser(), this.getAttention();
  },
  computed: {},
  methods: {
    //获取关注人列表
    async getAttention() {
      const  user  = JSON.parse(sessionStorage.getItem("userInfo"));
      if(user){
        const data = {
        userId: user.id,
      };
      const result = await getAttentionList(data);
      this.attentionList = result.data.data.AttentionList;
      this.attentionNumber = result.data.data.count;
      }else{
        this.$message({
          type:"primary",
          message:"请先登录！"
        })
      }
    },
    toPerson(user_id) {
      this.$router.push({ path: "/personal_center", query: { id: user_id } });
    },
    handleover() {
      this.$refs.back.style.display = "block";
    },
    handleout() {
      this.$refs.back.style.display = "none";
    },
    async getBlog() {
      let page = {
        page: 1,
      };
      const result = await getBlogList(page);
      this.BlogList = result.data.data.blogList;
      this.titleBlog = result.data.data.blogList[0];
      this.newBlog = this.BlogList.slice(0, 6);
      this.homeImage = this.BlogList.slice(0, 4);
    },
    blogList(data) {
      this.BlogList = data;
    },
    toDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
    //获取个人信息
    async getUser() {
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (userInfo) {
        const data = {
          id: userInfo.id,
        };
        const result = await getUserInfo(data);
        if (result.data.errno == 0) {
          this.user = result.data.data;
        }
      } else {
        return;
      }
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
      background: blanchedalmond;
      font-size: 22px;
      text-align: center;
      line-height: 60px;
      .login {
        font-size: 18px;
        cursor: pointer;
      }
      .me {
        font-size: 14px;
      }
    }
    .title__me__bottom {
      width: 280px;
      height: 140px;
      background: cadetblue;
      .img {
        width: 280px;
        height: 158px;
        position: relative;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
        .back {
          display: none;
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          bottom: 0;
          color: #fff;
          font-size: 16px;
          text-align: center;
          line-height: 158px;
          background: rgba(54, 52, 52, 0.5);
        }
      }
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
