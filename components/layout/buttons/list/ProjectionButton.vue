<template>
  <button @click="action" class="a-projection-button" type="button">
    <projection-icon height="24" class="a-projection-icon" />
    <span class="a-caption">Spalten</span>
  </button>
</template>

<script>
import ProjectionIcon from '~/components/icons/list/ProjectionIcon.vue'

export default {
  components: { ProjectionIcon },
  props: ["action"]
}
</script>

<style scoped>

.a-projection-button{
  all: unset;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--default-gap);
  height: var(--button-x);
  padding: 0 var(--button-padding-x);
}

.a-projection-icon{
  fill: var(--c-gray-2);
}

.a-projection-button:active .a-projection-icon{
  fill: var(--c-gray-1);
}

.a-caption{
  color: var(--c-gray-2);
}

.a-projection-button:active .a-caption{
  color: var(--c-gray-1);
}
</style>
