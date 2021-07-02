<template>
  <!-- 文章列表 -->
  <div>
    <template v-if="BlogList">
      <div class="Article">
        <article v-for="(item, index) in BlogList" :key="index" class="article">
          <div class="img">
            <img :src="item.imageUrl" />
          </div>
          <el-card class="article__right">
            <div class="article__title" @click="handledetails(item.id)">
              {{ item.title }}
            </div>
            <span
              class="article__avatar"
              @click="toAuthorCenter(item.user_id, item.user.username)"
              ><el-avatar :src="item.user.picture" size="small"></el-avatar>
            </span>
            <span class="article__author">{{ item.user.username }}</span>
            <span class="article__date">{{ item.updatedAt }}</span>
            <div class="article__content" v-html="item.content"></div>
          </el-card>
          <div class="article__footer">
            <el-tag size="small">{{ item.region }}</el-tag>
            <!-- <i class="el-icon-timer"></i> -->
            <i class="el-icon-s-comment"></i>
            <i @click="setlike(item.id)" class="el-icon-star-on" ref="like"
              >0</i
            >
          </div>
        </article>
      </div>
    </template>
    <template v-if="codeBlog">
      <div class="Article">
        <article v-for="(item, index) in codeBlog" :key="index" class="article">
          <div class="img">
            <img :src="item.imageUrl" />
          </div>
          <div class="article__right">
            <div class="article__title" @click="handledetails(item.id)">
              {{ item.title }}
            </div>
            <span
              class="article__avatar"
              @click="toAuthorCenter(item.user_id, item.user.username)"
              ><el-avatar :src="item.user.picture" size="small"></el-avatar>
            </span>
            <span class="article__author">{{ item.user.username }}</span>
            <span class="article__date">{{ item.updatedAt }}</span>
            <div class="article__content">{{ item.content | snippet }}</div>
          </div>
          <div class="article__footer">
            <el-tag size="small">{{ item.region }}</el-tag>
            <i class="el-icon-timer"></i>
            <!-- <el-tag size="small">{{item.Comms.length}}</el-tag> -->
            <i class="el-icon-s-comment"></i>
          </div>
        </article>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["BlogList", "codeBlog"],
  data() {
    return {
      commnNmber: "",
      like: 0, //点赞数
      zan: 0, //点击次数
      flag: 0, //是否已点赞
    };
  },
  created() {},
  methods: {
    handledetails(id) {
      let newpage = this.$router.resolve({
        path: `/detail/${id}`,
      });
      window.open(newpage.href, "_blank");
    },
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
    async setlike() {
      this.zan++;
      if (this.zan == 1) {
        this.$refs.like[0].innerHTML++;
        this.$refs.like[0].style.color = "red";
      }
      if (this.zan == 2) {
        this.$refs.like[0].innerHTML--;
        this.$refs.like[0].style.color = "#ccc";
        this.zan == 0;
      }
    },
  },
};
</script>

<style scoped lang="scss">
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
    height: 220px;
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
    float: left;
    overflow: hidden;
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
    height: 100px;
    margin-top: 20px;
    // background: #fff;
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
</style>
