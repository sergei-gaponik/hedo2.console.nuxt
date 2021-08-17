<template>
<div>
  <div class="a-navbar">
    <nuxt-link v-for="menuItem in menuItems" :key="menuItem.path" :to="menuItem.path">
      <div class="a-menuitem">
        <span class="h6">{{ menuItem.name }}</span>
      </div>
    </nuxt-link>
    
  </div>
<div style="margin-right:200px"/>
</div>
</template>

<script>
export default {
  data(){

    const menuItems = [
      {
        name: "Produkte",
        path: "/products",
      },
      {
        name: "Produkt-Eigenschaften",
        path: "/productProperties",
      }
    ]

    return {
      menuItems
    }
  }
}
</script>

<style scoped>
.a-navbar{
  position: fixed;
  top: var(--header-y);
  left: 0;
  width: var(--navbar-x);
  background-color: white;
  border-right: 1px solid var(--c-gray-3);
  bottom: 0;
}
.a-menuitem{
  padding: var(--padding-x) var(--padding-y);
  cursor: pointer;
  color: var(--c-blue-1);
}
</style>