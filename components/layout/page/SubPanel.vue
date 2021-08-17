<template>
<div class="a-subpanel">
  <div class="container">
    <slot />
  </div>
</div>
</template>

<style scoped>
.a-subpanel {
  position: relative;
  top: 0;
  overflow: auto;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--c-gray-4);
  border-radius: var(--default-border-radius);
}
</style>