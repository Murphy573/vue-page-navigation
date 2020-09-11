<template>
  <div>
    <h3>页面1</h3>
    输入框：<input v-model="input" />
    <p>
      <router-link to="/page2">跳转到page2</router-link>
    </p>
  </div>
</template>

<script>

export default {
  name: 'Page1',

  data () {
    return {
      input: ''
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
