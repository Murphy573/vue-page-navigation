<template>
  <div>
    <h3>页面3</h3>
    输入框：<input v-model="input" />
    <p>
      <router-link to="/page4"
        replace>replace到page4</router-link>
    </p>
    <p>
      <span @click="$router.back()">返回到page2</span>
    </p>
  </div>
</template>

<script>

export default {
  name: 'Page3',

  data () {
    return {
      input: ''
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
