<template>
  <div class="personal">
    <Header />
    <div class="personal__box"></div>
    <div class="personal__box__center">
      <div class="personal__box__title">
        <div class="box__left">
          <div class="box__left__img">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="userInfo.picture"
                :src="userInfo.picture"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <input type="text" class="input" v-model="userInfo.nickname" />
          </div>
          <div class="box__left__root" @click="toLogin">退出登录</div>
        </div>
        <div class="box__right__data">
          <div class="left__data">
            <ul class="data__left">
              <li>用户名:</li>
              <input type="text" class="input" v-model="userInfo.username" />
            </ul>
            <ul class="data__left">
              <li>电话:</li>
              <input type="text" class="input" v-model="userInfo.phone" />
            </ul>
            <ul class="data__left">
              <li>专业:</li>
              <input type="text" class="input" v-model="userInfo.school" />
            </ul>
          </div>

          <div class="data__right">
            <ul class="data__left">
              <li>年龄:</li>
              <input type="text" class="input" v-model="userInfo.age" />
            </ul>
            <ul class="data__left">
              <li>毕业院校:</li>
              <input type="text" class="input" v-model="userInfo.special" />
            </ul>
          </div>
          <ul class="data__left">
            <el-button type="primary" @click="edituserInfo()">保存</el-button>
          </ul>
        </div>
      </div>
      <div class="personal__box__main">
        <el-tabs :tab-position="tabPosition" style="height: 500px">
          <el-tab-pane label="用户管理">
            <div class="main__right">
              <div class="main__right__top">
                <ul>
                  <li class="text--active">评论回复</li>
                  <li>系统消息</li>
                  <li>私信</li>
                </ul>
              </div>
              <div class="main__right__content">
                <div class="message">
                  <div class="icon"><i class="el-icon-message-solid"></i></div>
                  <div class="text">均可发生分解算法加工费</div>
                </div>
              </div>
            </div></el-tab-pane
          >
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import { getUserInfo, editUserInfo } from "../../utils/http";
export default {
  components: { Header },
  name: "Personal",
  data() {
    return {
      tabPosition: "left",
      userInfo: {
        username: "",
        nickname: "",
        phone: "",
        school: "",
        age: "",
        special: "",
        picture: "",
      },
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    async query() {
      const result = await getUserInfo(this.userInfo);
      console.log(result);
      this.userInfo = result.data.data;
      console.log(this.userInfo);
    },
    async edituserInfo() {
      const result = await editUserInfo(this.userInfo);
      console.log(this.userInfo, result);
      this.userInfo = result.data.data;
    },
    toLogin() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    handleAvatarSuccess(res) {
      this.userInfo["picture"] = res.message.url;
      console.log(this.userInfo["picture"]);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
.personal {
  position: relative;
  min-height: 100vh;
  &__box {
    width: 1500px;
    min-height: 1400px;
    background: url("../../../public/12.jpg");
    background-size: 100% 100%;
    opacity: 0.5;
    border: 3px solid #fff;
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
  &__box__main {
    border: 3px solid #fff;
    box-sizing: border-box;
    margin-top: 200px;
    overflow: hidden;
    .main__left {
      float: left;
      width: 398px;
      height: 500px;
      border: 1px solid #fff;
      ul {
        li {
          height: 80px;
          line-height: 80px;
          list-style: none;
          text-align: center;
          cursor: pointer;
          border-bottom: 3px solid #fff;
        }
        .text--active {
          border-left: 3px solid red;
        }
      }
    }
    .main__right {
      float: left;
      width: 794px;
      height: 500px;
      border-bottom: 3px solid #fff;
      &__top {
        width: 100%;
        border-bottom: 3px solid #fff;
        overflow: hidden;
        ul li {
          float: left;
          width: 200px;
          line-height: 80px;
          text-align: center;
          list-style: none;
          cursor: pointer;
        }
        ul .text--active {
          border-bottom: 3px solid red;
        }
      }
      &__content {
        width: 93%;
        height: 184px;
        padding: 30px;
        border-bottom: 3px solid #fff;
        background-color: rgba(255, 255, 255, 0.8);
        .message {
          overflow: hidden;
          .icon {
            float: left;
            margin-right: 30px;
            color: red;
          }
          .text {
            float: left;
            font-size: 20px;
          }
        }
      }
    }
  }
  &__box__center {
    width: 1200px;
    margin: 0 auto;
    padding: 50px;
    overflow: hidden;
  }
  &__box__title {
    color: #333;
    overflow: hidden;
    .box__left {
      width: 400px;
      height: 450px;
      overflow: hidden;
      float: left;
      .input {
        padding-left: 50px;
      }
      .box__left__root {
        width: 150px;
        height: 50px;
        margin-top: 100px;
        background-color: red;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        color: #fff;
        cursor: pointer;
      }
      .box__left__img {
        width: 200px;
        height: 200px;
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409eff;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .input {
          float: left;
          width: 200px;
          padding-left: 20px;
          line-height: 62px;
          outline: none;
          border: 0;
          font-size: 23px;
          background-color: transparent;
        }
      }
    }
    .box__right__data {
      width: 800px;
      float: right;
      li {
        float: left;
        line-height: 60px;
      }
      .input {
        float: left;
        width: 200px;
        padding-left: 20px;
        line-height: 62px;
        outline: none;
        border: 0;
        font-size: 23px;
        background-color: transparent;
      }
      li::marker {
        color: red;
      }
      .left__data {
        float: left;
        .data__left {
          height: 60px;
          margin-right: 100px;
        }
      }
      .data__right {
        float: left;
        .data__left {
          height: 60px;
        }
      }
    }
  }
}
</style>
