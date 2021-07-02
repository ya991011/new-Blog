<template>
  <div>
    <Header :current-index="3" />
    <div class="sumup">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in article__list"
            :key="index"
            :timestamp="item.updatedAt"
            placement="top"
            size="large"
            color="green"
            type="danger"
          >
            <el-card>
              <h4>{{ item.title }}</h4>
              <p>{{ item.updatedAt }}</p>
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
import { getAllBlog } from "../../utils/http";
export default {
  components: { Header, Footer, UPTop },
  data() {
    return {
      reverse: true,
      article__list: [],
    };
  },
  created() {
    this.getAllBlogList();
  },
  methods: {
    async getAllBlogList() {
      const result = await getAllBlog();
      console.log(result);
      this.article__list = result.data.data;
    },
  },
};
</script>

<style scoped lang="scss">
.sumup {
  width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
