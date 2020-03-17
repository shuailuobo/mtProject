<template>
  <footer id="tfooter">
    <router-link
      to="/ShowBlogs"
      exact
    >
      <img
        src="../assets/p5.png"
        alt=""
      >
      <p>首页</p>
    </router-link>
    <router-link
      to="/AddBlog"
      exact
    ><img
        src="../assets/p3.png"
        alt=""
      >
      <p>淘客</p>
    </router-link>
    <router-link
      to="/"
      exact
    ><img
        src="../assets/p2.png"
        alt=""
      >
      <p>拼团商城</p>
    </router-link>
    <router-link
      to="/"
      exact
    ><img
        src="../assets/p4.png"
        alt=""
      >
      <p>个人中心</p>
    </router-link>
  </footer>
</template>
<script>
export default {
  name: "tfooter",
  data() {
    return {};
  }
};
</script>

<style scoped>
#tfooter {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  padding: 10px 0px;
  width: 100%;
  height: 50px;
}

a {
  text-decoration: none;
  display: inline-block;
  margin: 0 10px;
  text-align: center;
  font-size: 10px;
  color: #666;
}

p {
  margin: 0;
}

a > img {
  width: 30px;
  height: 30px;
}

.router-link-active {
  color: #fc5d65;
}
</style>
