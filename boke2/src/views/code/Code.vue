<template>
  <div class="code">
    <Header :current-index="1" />
    <Main />
    <div class="footer">
      <Footer />
    </div>
    <UPTop />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Main from "./Main.vue";
import Footer from "../../components/Footer";
import UPTop from "../../components/UPTop";
// import { getCodeBlog } from "../../utils/http";
export default {
  name: "Code",
  components: {
    Header,
    Main,
    Footer,
    UPTop,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.code {
  position: relative;
  min-height: 100vh;
  .footer {
    position: absolute;
    bottom: 0px;
    left: 0;
  }
}
</style>
