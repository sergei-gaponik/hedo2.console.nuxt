<template>
<div>
  <Header />
  <NavBar />
  <div class="a-page-bg">
    <div class="a-page">
      <Nuxt />
    </div>
    <div style="margin-bottom:calc(var(--page-margin) * 2)"></div>
  </div>
</div>
</template>

<script>
import Header from '../components/layout/header/Header.vue'
import NavBar from '../components/layout/navbar/NavBar.vue'


export default {
  components: { Header, NavBar },

}
</script>

<style scoped>
.a-page-bg{
  position: fixed;
  margin-left: var(--navbar-x);
  background-color: var(--c-gray-4);
  height: calc(100vh - var(--header-y));
  width: calc(100vw - var(--navbar-x));
  overflow-y: auto;
}
.a-page{
  position: relative;

  top: var(--page-margin);
  left: var(--page-margin);
  width: calc(100% - var(--page-margin) * 2);
}
</style>