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
        <el-input v-model="input" placeholder="请输入内容" clearable>
        </el-input>
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
  </div>
</template>

<script>
import { getUserImage } from "../utils/http";
export default {
  props: ["currentIndex"],
  data() {
    return {
      headerList: [
        { text: "首页", to: { name: "Home" } },
        { text: "代码", to: { name: "Code" } },
        { text: "生活", to: { name: "Life" } },
        { text: "归档", to: { name: "SumUp" } },
      ],
      input: "",
      UserImage: "",
    };
  },
  created() {
    this.getImage();
  },
  methods: {
    async getImage() {
      const token = window.sessionStorage.getItem("token");
      console.log(token);
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
        this.$router.push("/personal");
      } else {
        this.$message({
          type: "error",
          message: "请先登录！",
        });
        this.$router.push("/login");
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
    width: 800px;
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
      display: inline-block;
      .btn {
        width: 70px;
        height: 35px;
        position: absolute;
        top: 0;
        right: 0;
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
