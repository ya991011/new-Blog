<template>
  <!-- 头部 -->
  <div class="container">
    <nav class="header">
      <!-- 导航 -->
      <div
        v-for="(item, index) in headerList"
        :key="item.text"
        :class="{ nav: true, 'nav--active': index === currentIndex }"
        class="nav"
      >
        <router-link :to="item.to" tag="a">
          <span>{{ item.text }}</span>
        </router-link>
      </div>
      <!-- 搜索框 -->
      <div class="input">
        <input
          v-model="input"
          placeholder="请输入关键字"
          clearable
          class="serach"
        />
        <el-button type="primary" class="btn" round @click="getserachList"
          >搜索</el-button
        >
      </div>
    </nav>
    <!-- 头像 -->
    <div class="personal__center">
      <img :src="UserImage" class="personal__img" ref="img" @click="toPerson" />
    </div>
    <!-- 创建文章按钮 -->
    <div class="create_blog" @click="toCreate" ref="create">
      <div class="create">+</div>
    </div>
    <!-- {{getserachList}} -->
  </div>
</template>

<script>
import { getUserImage, getSerach } from "../utils/http";
export default {
  props: ["currentIndex"],
  data() {
    return {
      headerList: [
        { text: "首页", to: { name: "Home" } },
        { text: "代码", to: { name: "Code" } },
        { text: "生活", to: { name: "Life" } },
        { text: "个人归档", to: { name: "SumUp" } },
      ],
      // 输入框数据
      input: "",
      UserImage: "",
    };
  },
  created() {
    this.getImage();
  },
  computed: {},
  methods: {
    async getserachList() {
      if (this.input == "") {
        this.$message({
          type: "error",
          message: "请先输入关键字！",
        });
        return;
      }
      const data = {
        title: this.input,
      };
      const result = await getSerach(data);
      console.log(result);
      this.$store.commit("serach", result.data.data);
      this.$router.replace({
        path: "/serach",
        query: {
          title: this.input,
        },
      });
    },
    async getImage() {
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        this.UserImage = "http://localhost:3000/format.jpg";
      } else {
        const result = await getUserImage();
        this.UserImage = result.data.picture;
      }
    },
    toCreate() {
      this.$router.push("/create_blog");
      // this.$refs.create.style.transform = 'rotate(45deg)'
    },
    toPerson() {
      const token = window.sessionStorage.getItem("token");
      if (token) {
        let newpage = this.$router.resolve({
          name: "Personal",
        });
        window.open(newpage.href, "_blank");
      } else {
        this.$message({
          type: "error",
          message: "请先登录！",
        });
        this.$router.push("/personal");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@keyframes translate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(145deg);
  }
}
.container {
  width: 100%;
  height: 100px;
  position: sticky;
  top: 0;
  background: url("../../public/9.jpg") no-repeat;
  background-size: 100%;
  box-shadow: 0 0 20px rgba($color: #000000, $alpha: 1);
  z-index: 99;
  .create_blog {
    position: absolute;
    left: 54%;
    top: 16%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #3a8ee6;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    opacity: 0.8;
  }
  .create_blog:hover {
    animation: translate 0.5s ease-in linear;
    opacity: 1;
  }
  .header {
    width: 1200px;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    .nav {
      float: left;
      line-height: 43px;
      margin-right: 20px;
    }
    .nav--active {
      a {
        color: #3a8ee6;
      }
    }
    .input {
      width: 290px;
      border: 3px solid #fff;
      border-radius: 23px;
      float: left;
      .serach {
        width: 200px;
        height: 43px;
        padding: 0 10px;
        float: left;
        outline: none;
        border: none;
        background-color: transparent;
      }
      .btn {
        float: left;
        width: 70px;
        height: 43px;
      }
    }
  }
  .personal__center {
    height: 80px;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    .personal__img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px solid #fff;
    }
  }
}
</style>
