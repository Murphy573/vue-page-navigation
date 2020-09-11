<template>
  <div id="app">
    <VuePageNavigation :include="include">
      <router-view />
    </VuePageNavigation>
  </div>
</template>

<script>
let a = 1;

export default {
  name: 'App',

  data () {
    return {
      include: ['Page1']
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
