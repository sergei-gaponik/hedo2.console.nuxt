<template>
<div>
  <div class="a-header a-flex">
      <home-button height=30 class="a-flex-left" />
      <search-bar v-model="query"/>
  </div>
  <div style="margin-top:var(--header-y)"></div>
</div>
</template>

<script>

import HomeButton from '../buttons/HomeButton.vue'
import SearchBar from '../inputs/SearchBar.vue'

export default {
  components: { HomeButton, SearchBar },
  data(){
    return {
      query: ""
    }
  }
}

</script>

<style scoped>
.a-header{
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: var(--header-y);
  padding: 0 var(--padding-x);
  border-bottom: 2px solid var(--c-gray-3);
}
.a-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
</style>