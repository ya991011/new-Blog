<template>
  <el-card class="comment">
    <div class="comment__input">
      <el-card class="card">
        <div class="title">评论</div>
        <div class="content">
          <textarea
            v-model="text"
            ref="text"
            class="input"
            cols="95"
            rows="10"
            placeholder="请输入评论吧~"
          ></textarea>
          <el-button type="primary" class="btn" @click="submit()"
            >发送评论</el-button
          >
        </div>
      </el-card>
    </div>
    <!-- 评论列表 -->
    <div class="comment__content" v-for="(item, index) in comment" :key="index">
      <div class="comment__content__title">
        <div
          class="title__picture"
          @click="toAuthorCenter(item.user_id, item.user.username)"
        >
          <el-avatar :src="item.user.picture"></el-avatar>
        </div>
        <div class="title__author">
          <div class="author__username">{{ item.user.username }}</div>
          <div class="author__date">{{ item.updatedAt }}</div>
        </div>
      </div>
      <div class="comment__content__text">
        <el-tag class="tag">内容</el-tag>
        {{ item.content }}
      </div>
      <!-- 用户回复列表 -->
      <div class="answerUser"></div>
      <div
        class="comment__content__answer"
        ref="cancel"
        @click="Answer(item.user_id, item.id)"
      >
        回复
      </div>

      <div class="comment__answer" ref="answer">
        <el-card class="card">
          <div class="title" @click="Cancel">取消回复</div>
          <div class="content">
            <textarea
              v-model="answer"
              ref="text"
              class="input"
              cols="95"
              rows="10"
              placeholder="请输入内容吧~"
            ></textarea>
            <el-button type="primary" class="btn">发送</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getCommList, LssueComm } from "../../utils/http";
export default {
  props: ["blog_id"],
  data() {
    return {
      text: "",
      answer: "",
      comment: [],
      newBlog_id: "",
      //评论者id
      commentUser_id: "",
      comment_id: "",
    };
  },
  created() {},
  methods: {
    toAuthorCenter(user_id, name) {
      const userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      if (userInfo) {
        console.log(userInfo.username, name);
        if (userInfo.username == name) {
          this.$router.push("/personal");
        } else {
          this.$router.push({
            path: "/personal_center",
            query: { id: user_id },
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "请先登录！",
        });
      }
    },
    Answer(user_id, comment_id) {
      this.$refs.answer[0].style.display = "block";
      this.$refs.cancel[0].style.display = "none";
      this.commentUser_id = user_id;
      this.comment_id = comment_id;
    },
    Cancel() {
      this.$refs.answer[0].style.display = "none";
      this.$refs.cancel[0].style.display = "block";
    },
    async submit() {
      const content = {
        content: this.text,
        blog_id: this.blog_id,
      };
      const result = await LssueComm(content);
      if (result) {
        this.$message({
          type: "success",
          message: "发表成功！",
        });
      }
      this.getList();
      this.text = "";
    },
    async getList() {
      const id = {
        blog_id: this.newBlog_id,
      };
      const result = await getCommList(id);
      if (result.data.errno == 0) {
        this.comment = result.data.data.CommList;
        console.log(this.comment);
      }
    },
    //   async submitAnswer() {
    //     const data = {
    //       comment_id: this.comment_id,
    //       user_id: this.commentUser_id,
    //       text: this.answer,
    //     };
    //     const result = await setAnswer(data);
    //     console.log(result);
    //     this.getList();
    //     this.answer = "";
    //     this.$refs.answer[0].style.display = "none";
    //   },
  },

  // 动态传递的数据需使用watch监听后使用
  watch: {
    blog_id: function (newData) {
      this.newBlog_id = newData;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  margin: 20px 0;
  width: 1100px;
  &__input {
    margin-top: 30px;
    border-radius: 10%;
    .card {
      position: relative;
      padding: 30px 10px;
    }
    .title {
      line-height: 50px;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
    }
    .content {
      margin: 20px 0;
      background: #f2f6fc;
      .input {
        margin: 20px 20px;
        border: none;
        outline: none;
        font-size: 20px;
        background-color: #f2f6fc;
        resize: none;
      }
      .btn {
        position: absolute;
        right: 45px;
        bottom: 20px;
      }
    }
  }
  &__content {
    position: relative;
    padding: 20px;
    &__title {
      overflow: hidden;
      padding: 10px 0;
      .title__picture {
        float: left;
        margin-right: 20px;
      }
      .title__author {
        float: left;
        .author__username {
          font-size: 18px;
        }
        .author__date {
          margin-top: 5px;
          font-size: 12px;
        }
      }
    }
    &__text {
      font-size: 18px;
      .tag {
        margin-right: 10px;
      }
    }
    &__answer {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 16px;
      cursor: pointer;
    }
    &__answer:hover {
      color: royalblue;
    }
    .comment__answer {
      display: none;
      margin: 30px;
      padding: 20px;
      width: 950px;
      box-shadow: 0 0 5px rgba($color: #bfe70e, $alpha: 1);
      background-color: rgba(255, 253, 232, 0.7) !important;
      .card {
        background-color: #f2f6fc;
        .input {
          margin: 20px 20px;
          border: none;
          outline: none;
          font-size: 20px;
          background-color: #f2f6fc;
          resize: none;
        }
        .title {
          font-size: 16px;
          padding: 15px 0;
          cursor: pointer;
          border-bottom: 1px solid #ccc;
        }
      }
    }
  }
}
</style>
