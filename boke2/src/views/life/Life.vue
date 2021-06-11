<template>
  <div>
    <div class="life">
      <Header :current-index="2" />
    </div>
    <div class="main">
      <Card />
    </div>
    <Footer />
    <UPTop />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import UPTop from "../../components/UPTop.vue";
import Card from "./Card.vue";
export default {
  name: "WaterFall",
  components: { Header, Card, Footer, UPTop },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 1200px;
  margin: 0 auto;
}
</style>
