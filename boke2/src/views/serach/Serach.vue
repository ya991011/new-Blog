<template>
  <div class="serach">
    <Header />
    <div class="serach__data">
      <div class="result">搜索结果:</div>
      <template v-if="serachList">
        <article
          v-for="(item, index) in serachList"
          :key="index"
          class="article"
        >
          <div class="img">
            <img :src="item.imageUrl" />
          </div>
          <div class="article__right">
            <div class="article__title" @click="handledetails(item.id)">
              {{ item.title }}
            </div>
            <span class="article__avatar" @click="getPersonCenter(item.user_id)"
              ><el-avatar :src="item.user.picture" size="small"></el-avatar>
            </span>
            <span class="article__author">{{ item.user.username }}</span>
            <span class="article__date">{{ item.updatedAt }}</span>
            <div class="article__content">{{ item.content | snippet }}</div>
          </div>
          <div class="article__footer">
            <el-tag size="small">{{ item.region }}</el-tag>
            <i class="el-icon-s-comment"></i>
            <i @click="setlike(item.id)" class="el-icon-star-on" ref="like">{{
              item.like
            }}</i>
          </div>
        </article>
      </template>
      <p v-if="!serachList" class="noserach">未找到相关的内容！</p>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
export default {
  components: { Header },
  data() {
    return {
      title: this.$route.query.title,
      serachList: [],
    };
  },
  created() {
    this.serachList = this.$store.state.serachData;
  },
  mounted() {},
  computed: {
    serachData() {
      return this.$store.state.serachData;
    },
  },
  methods: {
    handledetails(id) {
      let newpage = this.$router.resolve({
        path: `/detail/${id}`,
      });
      window.open(newpage.href, "_blank");
    },
    async getPersonCenter(user_id, username) {
      const user = window.sessionStorage.getItem("user");
      if (user == username) {
        this.$router.push("/personal");
      } else {
        this.$router.push({ path: "/personal_center", query: { id: user_id } });
      }
    },
  },
  watch: {
    serachData(newValue) {
      this.serachList = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.serach__data {
  width: 1200px;
  margin: 0 auto;
  .result {
    line-height: 50px;
    margin-top: 20px;
  }
  .noserach {
    height: 100px;
  }
  .article {
    overflow: hidden;
    width: 750px;
    height: 300px;
    margin-top: 20px;
    font-size: 16px;
    border-bottom: 2px solid #fff;
    padding-bottom: 30px;
    position: relative;
    .img {
      float: left;
      width: 200px;
      height: 200px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.5s;
      }
      img:hover {
        transform: scale(1.1);
      }
    }
    .atricle__right {
      float: right;
    }
    .article__title {
      font-size: 20px;
      cursor: pointer;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .article__title:hover {
      color: #3a8ee6;
      text-decoration: underline;
    }
    .article__author {
      font-size: 12px;
      margin: 0 10px;
    }
    .article__avatar {
      cursor: pointer;
    }
    .article__date {
      font-size: 12px;
    }
    .article__content {
      overflow: hidden;
      margin-top: 20px;
    }
    &__footer {
      position: relative;
      width: 100%;
      overflow: hidden;
      margin-bottom: 0;
      position: absolute;
      bottom: 20px;
      .date {
        position: absolute;
        right: 0;
      }
      .el-icon-s-comment {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 19px;
      }
      .el-icon-star-on {
        font-size: 100px;
        position: absolute;
        right: 40px;
        bottom: 0;
        font-size: 19px;
      }
    }
  }
}
</style>
