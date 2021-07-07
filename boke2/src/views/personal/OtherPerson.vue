<template>
  <div>
    <div class="personal__box"></div>
    <div class="personal__box__center">
      <div class="personal__box__title">
        <div class="box__left">
          <div class="box__left__img">
            <img :src="userImage" class="personal__img" />
            <div class="input">{{ userInfo.nickname }}</div>
          </div>
          <div class="attention">
            <div class="connection">
              <el-button type="info" @click="toSubmit">私信</el-button>
            </div>
            <div class="enter" ref="enter">
              <el-button type="primary" @click="enterRelation" class="enter-two"
                >关注</el-button
              >
            </div>
            <div class="cancel" ref="cancel">
              <el-button type="danger" @click="cancelRelation"
                >取消关注</el-button
              >
            </div>
          </div>
        </div>
        <div class="box__right__data">
          <div class="left__data">
            <ul class="data__left">
              <li>用户名:{{ userInfo.username }}</li>
              <p class="input"></p>
            </ul>
            <ul class="data__left">
              <li>电话:</li>
              <p class="input">{{ userInfo.phone }}</p>
            </ul>
          </div>
          <div class="data__right">
            <ul class="data__left">
              <li>年龄:</li>
              <p class="input">{{ userInfo.age }}</p>
            </ul>
            <ul class="data__left">
              <li>电话:</li>
              <p class="input">{{ userInfo.phone }}</p>
            </ul>
            <ul class="data__left">
              <li>毕业院校:</li>
              <p class="input">{{ userInfo.school }}</p>
            </ul>
          </div>
        </div>
      </div>
      <div class="personal__box__main">
        <el-tabs type="card">
          <el-tab-pane label="博客" class="card"
            ><div class="myArticle">
              <div class="myArticle__count">共条博客</div>
              <div
                class="myArticle__content"
                v-for="(item, index) in blogList"
                :key="index"
              >
                <div class="title">{{ item.title }}</div>
                <div class="content">{{ item.content | snippet }}</div>
                <div class="date">{{ item.updatedAt }}</div>
                <el-tag class="category" size="small">{{ item.region }}</el-tag>
              </div>
            </div>
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange"
                :page-size="3"
                layout="total, prev, pager, next"
                :total="100"
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
          <el-tab-pane label="私信">角色管理</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPerson,
  getRelation,
  setAttention,
  deleteAttention,
} from "../../utils/http";
export default {
  name: "Personal",
  data() {
    return {
      tabPosition: "left",
      userInfo: {},
      blogList: {},
      userImage: "",
      //粉丝列表
      fens: [],
      //关注人列表
      attention: [],
    };
  },
  created() {
    this.query();
    this.getUserRelation();
  },
  methods: {
    //私信
    toSubmit() {
      // this.$router.push({
      //   name:'connection',
      //   query:{
      //     user_Info:{
      //       username:this.userInfo.username,
      //       picture:this.userInfo.picture,
      //       userId:this.userInfo.id
      //     }
      //   }
      // })
      const name = this.userInfo.username;
      this.$router.push(`/connection/${name}`);
    },
    // 查询用户信息
    async query() {
      const user_id = {
        id: this.$route.query.id,
      };
      const result = await getPerson(user_id);
      this.userInfo = result.data.data.result;
      this.userImage = result.data.data.result.picture;
      this.blogList = result.data.data.result2;
      console.log(this.userInfo);
    },
    //分页
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //查询用户粉丝列表
    async getUserRelation() {
      const data = {
        userId: this.$route.query.id,
      };
      const result = await getRelation(data);
      this.fens = result.data.data.userList;
      if (result.data.data.amIFollowed == true) {
        this.$refs.cancel.style.display = "block";
        this.$refs.enter.style.display = "none";
      } else {
        this.$refs.cancel.style.display = "none";
        this.$refs.enter.style.display = "block";
      }
    },
    //关注
    async enterRelation() {
      const user = JSON.parse(sessionStorage.getItem("userInfo"));
      const followerId = user.id;
      const data = {
        userId: followerId,
        followerId: this.userInfo.id,
      };
      const result = await setAttention(data);
      if (result.data.errno == 0) {
        this.getUserRelation();
      } else {
        this.$message({
          type: "error",
          messgae: "网络不佳，请稍后重试！",
        });
      }
    },
    //取消关注
    async cancelRelation() {
      const user = JSON.parse(sessionStorage.getItem("userInfo"));
      const followerId = user.id;
      const data = {
        userId: followerId,
        followerId: this.userInfo.id,
      };
      const result = await deleteAttention(data);
      if (result.data.errno == 0) {
        this.getUserRelation();
      } else {
        this.$message({
          type: "error",
          messgae: "网络不佳，请稍后重试！",
        });
      }
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
    margin-top: 120px;
    height: 700px;
    .card {
      position: relative;
      height: 630px;
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
    margin-top: 120px;
    color: #333;
    overflow: hidden;
    .box__left {
      width: 400px;
      height: 450px;
      overflow: hidden;
      float: left;
      .attention {
        // overflow: hidden;
        width: 200px;
        height: 100px;
        position: relative;
        .connection {
          position: absolute;
          right: 0;
        }
        .enter {
          display: none;
          .enter-two {
            width: 130px;
          }
        }
        .cancel {
          position: absolute;
          display: none;
          width: 100px;
          top: 0;
          left: 0;
        }
      }
      .box__left__img {
        width: 200px;
        height: 200px;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
    }
    .box__right__data {
      width: 800px;
      height: 400px;
      float: right;
      li {
        float: left;
        line-height: 60px;
      }
      .input {
        float: left;
        width: 180px;
        // padding-left: 20px;
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
        width: 350px;
        .data__left {
          height: 60px;
          margin-right: 100px;
        }
      }
      .data__right {
        float: right;
        .data__left {
          height: 60px;
        }
      }
    }
  }
}
</style>
