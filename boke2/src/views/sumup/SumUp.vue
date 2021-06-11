<template>
  <div>
    <Header :current-index="3" />
    <div class="sumup">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="item in article__list"
            :key="item._id"
            :timestamp="item.date"
            placement="top"
            size="large"
            color="green"
            type="danger"
          >
            <el-card>
              <h4>{{ item.article__title }}</h4>
              <p>{{ item.date }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <Footer />
    <UPTop />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import UPTop from "../../components/UPTop.vue";
export default {
  components: { Header, Footer, UPTop },
  data() {
    return {
      reverse: true,
      article__list: [
        {
          _id: 0,
          img: require("../../../public/2.jpg"),
          article__title: "标题",
          article__content: "内容",
          category: "代码",
          date: "2021-05-20 16:33",
          comment: 40,
          like: 33,
          timestamp: "2021-05-20 16:33",
        },
        {
          _id: 1,
          img: require("../../../public/4.jpg"),
          article__title: "标题",
          article__content: "内容",
          category: "代码",
          date: "2021-05-24 18:33",
          comment: 40,
          like: 33,
          timestamp: "2021-05-24 18:33",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.sumup {
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
