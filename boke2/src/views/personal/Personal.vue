<template>
  <div class="personal">
    <Header />
    <Main />
  </div>
</template>

<script>
import Main from "./Main.vue";
import Header from "../../components/Header.vue";
export default {
  components: { Header, Main },
};
</script>
<style lang="scss" scoped>
.personal {
  position: relative;
  min-height: 100vh;
}
</style>
