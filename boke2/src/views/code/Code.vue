<template>
  <div class="code">
    <Header :current-index="1" />
    <Main />
    <Footer />
    <UPTop />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Main from "./Main.vue";
import Footer from "../../components/Footer";
import UPTop from "../../components/UPTop";
export default {
  name: "Code",
  components: {
    Header,
    Main,
    Footer,
    UPTop,
  },
};
</script>
<style lang="scss" scoped></style>
