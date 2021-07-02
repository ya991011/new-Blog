<template>
  <div class="home">
    <Header :current-index="0" />
    <Article />
    <Footer />
    <UPTop />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Article from "./Article.vue";
import UPTop from "../../components/UPTop.vue";
import Footer from "../../components/Footer";
export default {
  name: "Home",
  components: {
    Header,
    Article,
    UPTop,
    Footer,
  },
};
</script>
<style lang="scss" scoped></style>
