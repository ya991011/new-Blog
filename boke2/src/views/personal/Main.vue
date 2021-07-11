<template>
  <div>
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
              <input type="text" class="input" v-model="userInfo.special" />
            </ul>
          </div>

          <div class="data__right">
            <ul class="data__left">
              <li>年龄:</li>
              <input type="text" class="input" v-model="userInfo.age" />
            </ul>
            <ul class="data__left">
              <li>毕业院校:</li>
              <input type="text" class="input" v-model="userInfo.school" />
            </ul>
          </div>
          <ul class="data__left">
            <el-button type="primary" @click="edituserInfo()">保存</el-button>
          </ul>
        </div>
      </div>
      <div class="personal__box__main">
        <el-tabs type="card">
          <el-tab-pane label="我的博客" class="card"
            ><div class="myArticle">
              <div class="myArticle__count">共{{ myBlogList.count }}条博客</div>
              <div
                class="myArticle__content"
                v-for="(item, index) in myBlogList.blogList"
                :key="index"
              >
                <div class="title">{{ item.title }}</div>
                <div class="content">{{ item.content | snippet }}</div>
                <div class="date">{{ item.updatedAtFormat }}</div>
                <el-tag class="category" size="small">{{ item.region }}</el-tag>
              </div>
            </div>
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange"
                :page-size="3"
                layout="total, prev, pager, next"
                :total="myBlogList.count"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的粉丝" class="fens">
            <div class="box" v-for="(item, index) in fens" :key="index">
              <div class="img">
                <img :src="item.picture" />
              </div>
              <div class="username">{{ item.username }}</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的私信" class="private">
            <div class="private__latter">
              <div class="private__latter__box" v-for="(item,index) in message" :key="index">
                <template>
                <div class="box__picture"><img :src="item.setName.picture" alt=""></div>
                <div class="box__username">{{item.setName.username}}</div>
                <div class="box__message">{{ item.msg }}</div>
                <div class="box__time"></div>
                </template>
                <!-- <template><div class="box__message">{{ item.msg }}</div></template> -->
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUserInfo,
  editUserInfo,
  getMyBlog,
  getRelation,
} from "../../utils/http";
export default {
  name: "Personal",
  data() {
    return {
      tabPosition: "left",
      userInfo: {
        // picture:''
      },
      myBlogList: [],
      fens: [],
      message: [],
    };
  },
  created() {
    this.query();
    this.myBlog();
    this.getUserRelation();
  },
  mounted() {
    this.$socket.connect();
    const { username } = JSON.parse(sessionStorage.getItem("userInfo"));
    this.$socket.emit("setName", username);
    this.sockets.subscribe("message", (data) => {
      this.message.push(data)
      console.log(this.message)
      if(this.message.to == data.to){
        alert("3")
      }
    });
  },
  methods: {
    async query() {
      const result = await getUserInfo();
      this.userInfo = result.data.data;
      console.log(this.userInfo);
    },
    async myBlog() {
      let page = {
        page: 1,
      };
      const result = await getMyBlog(page);
      this.myBlogList = result.data.data;
    },
    async edituserInfo() {
      const result = await editUserInfo(this.userInfo);
      this.userInfo = result.data.data;
    },
    toLogin() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    handleAvatarSuccess(res) {
      this.userInfo["picture"] = res.message.url;
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
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      const page = { page: val };
      const result = await getMyBlog(page);
      this.myBlogList = result.data.data;
    },
    //个人粉丝列表
    async getUserRelation() {
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      const id = userInfo.id;
      const data = {
        userId: id,
      };
      const result = await getRelation(data);
      this.fens = result.data.data.userList;
    },
  },
  sockets: {
    connect() {
      console.log("连接成功！");
    },
  },
};
</script>

<style lang="scss" scoped>
.personal {
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
    height: 700px;
    .private {
      &__latter {
        width: 1000px;
        margin: 0 auto;
        &__box {
          overflow: hidden;
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
          .box__picture {
            float: left;
            width: 100px;
            height: 100px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .box__username {
            float: left;
            margin-left: 10px;
            font-size: 25px;
          }
          .box__message {
            position: relative;
            top: 60px;
            color:#ddd;
            right: 50px;
            font-size: 20px;
          }
        }
      }
    }
    .fens {
      padding: 10px 30px;
      overflow: hidden;
      .box {
        width: 170px;
        height: 170px;
        cursor: pointer;
        float: left;
        .username {
          text-align: center;
        }
        .img {
          margin: 15px auto;
          width: 100px;
          height: 100px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
    .card {
      position: relative;
      height: 630px;
    }
    .block {
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
    }
    .myArticle {
      position: relative;
      padding: 20px;
      font-size: 20px;
      &__count {
        line-height: 20px;
      }
      &__content {
        .title {
          padding: 20px 0;
          font-weight: bold;
          cursor: pointer;
        }
        .title:hover {
          color: #3a8ee6;
        }
        .content {
          font-size: 16px;
          padding: 10px 0;
        }
        .date {
          padding: 10px 0;
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
