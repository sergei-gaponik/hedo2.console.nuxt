<template>
<div class="a-page">
  <div class="container">
    <slot />
  </div>
</div>
</template>

<style scoped>
.a-page {
  position: relative;
  top: 0;
  overflow: auto;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: var(--default-border-radius);
  box-shadow: var(--default-box-shadow);
}
</style>