<template>
  <div>
    <h3>页面2</h3>
    输入框：<input v-model="input" />
    <p>
      <router-link to="/page3">跳转到page3</router-link>
    </p>
    <p>
      <span @click="$router.back()">返回到page1</span>
    </p>
  </div>
</template>

<script>

export default {

  data () {
    return {
      input: ''
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
