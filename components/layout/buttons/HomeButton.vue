<template>
  <div>
    <nuxt-link to="/">
      <logo :height="height" color="#37474f" class="a-logo" />
    </nuxt-link>
  </div>
</template>

<script>

import Logo from '~/components/icons/Logo.vue'

export default {
  components: { Logo },
  props: ["height"]
}
</script>

<style scoped>
.a-logo{
  user-select: none;
}
</style>