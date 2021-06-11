<template>
  <!-- 文章列表 -->
  <div>
    <!-- <div class="article__pilot"></div> -->
    <section
      v-for="(item, index) in BlogList"
      :key="index"
      class="article"
    >
      <div class="img">
        <img :src="item.imageUrl" />
      </div>
      <div class="article__right">
       <div class="article__title"  @click="handledetails(item.id)">
            {{ item.title }}
          </div>
          <span class="article__avatar" @click="toAuthorCenter(item.user.id)"><el-avatar :src="item.user.picture" size="small"></el-avatar>
</span>
          <span class="article__author">{{item.user.nickname}}</span>
          <span class="article__date">{{item.updatedAt}}</span>
        <div class="article__content">{{item.content | snippet}}</div>
      </div>
      <div class="article__footer">
        <el-tag size="small">{{ item.region }}</el-tag>
        <i class="el-icon-timer"></i>
        <!-- <span class="date">{{ item.updatedAt }}</span> -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["BlogList"],
  data() {
    return {};
  },
  methods: {
    handledetails(id) {
      this.$router.push(`/detail/${id}`);
    },
    toAuthorCenter(user_id){
      this.router.push(`/user/${user_id}`)
    }
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
  .article__author{
    font-size: 12px;
    margin: 0 10px;
  }
  .article__avatar{
    cursor: pointer;

  }
  .article__date{
    font-size: 12px;
  }
  .article__content {
    overflow: hidden;
    margin-top: 20px;
  }
  &__footer {
    width: 100%;
    overflow: hidden;
    margin-bottom: 0;
    position: absolute;
    bottom: 20px;
    .date {
      position: absolute;
      right: 0;
    }
  }
}
</style>
