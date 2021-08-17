<template>
  <div class="a-grid" :style="{ gridTemplateColumns: template ? template : '1fr '.repeat(cols) }">
    <slot />
  </div>
</template>

<script>
export default {
  props: ["template", "cols"]
}
</script>

<style scoped>
.a-grid{
  display: grid;
  gap: var(--default-gap);
}
</style>