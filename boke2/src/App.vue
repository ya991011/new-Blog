<template>
  <div id="app">
    <div class="background"><img src="" alt="" /></div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  position: relative;
  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 100vh;
    background: url(../public/11.jpg) no-repeat;
    background-size: 100% 100%;
    opacity: 0.7;
    z-index: -1;
  }
}
</style>
