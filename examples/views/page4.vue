<template>
  <div>
    <h3>页面4</h3>
    输入框：<input v-model="input" />
    <p>
      <router-link to="/page1">push到page1</router-link>
    </p>
    <p>
      <span @click="$router.back()">返回到page3</span>
    </p>
  </div>
</template>

<script>

export default {
  name: 'Page4',

  data () {
    return {
      input: ''
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
