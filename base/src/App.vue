<template>
  <div id="app">
    <!-- <blog-header></blog-header> -->
    <transition :name="transitionName">
      <router-view />
    </transition>
    <footernav></footernav>
  </div>
</template>

<script>
import footernav from "./components/FooterNav/index.vue";
export default {
  name: "app",
  components: {
    footernav
  },
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  watch: {
    $route(to, from) {
      var array = sessionStorage.getItem("hrefArray").split(",");
      if (array.indexOf(to.fullPath) > array.indexOf(from.fullPath)) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}

#app {
  /* padding-top: 0.44rem; */
  padding-bottom: 0.5rem;
  /* transition: all 0.8s ease; */
  width: 100%;
}

.container {
  width: 100%;
  height: 100%;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.5s ease;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
