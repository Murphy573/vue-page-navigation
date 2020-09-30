<template>
  <div id="app">
    <transition :name="transitionName">
      <VuePageNavigation :include="include"
        :exclude="exclude">
        <router-view />
      </VuePageNavigation>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',

  watch: {
    $route () {
      let d = this.$route.params.PNKDirection;
      this.transitionName = d === 'forward' ? 'van-slide-right' : 'van-slide-left';
    }
  },

  data () {
    return {
      transitionName: 'van-fade',
      include: ['Page1'],
      exclude: ['Page3', 'Page4']
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

  @keyframes van-slide-left-enter {
    from {
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes van-slide-left-leave {
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes van-slide-right-enter {
    from {
      transform: translate3d(100%, 0, 0);
    }
  }

  @keyframes van-slide-right-leave {
    to {
      transform: translate3d(100%, 0, 0);
    }
  }

  @keyframes van-fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes van-fade-out {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .van-fade {
    &-enter-active {
      animation: 0.3s van-fade-in both ease-out;
    }

    &-leave-active {
      animation: 0.3s van-fade-out both ease-in;
    }
  }

  .van-slide-left {
    &-enter-active {
      animation: van-slide-left-enter 0.3s both ease-out;
    }

    &-leave-active {
      animation: van-slide-left-leave 0.3s both ease-in;
    }
  }

  .van-slide-right {
    &-enter-active {
      animation: van-slide-right-enter 0.3s both ease-out;
    }

    &-leave-active {
      animation: van-slide-right-leave 0.3s both ease-in;
    }
  }
}
</style>
