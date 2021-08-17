<template>
  <button @click="action" class="a-sort-button" type="button">
    <sort-icon height="24" class="a-sort-icon" />
    <span class="a-caption">Sortieren</span>
  </button>
</template>

<script>
import SortIcon from '~/components/icons/list/SortIcon.vue'

export default {
  components: { SortIcon },
  props: ["action"]
}
</script>

<style scoped>

.a-sort-button{
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
  gap: var(--default-gap);
  height: var(--button-x);
  padding: 0 var(--button-padding-x);
}

.a-sort-icon{
  fill: var(--c-gray-2);
}

.a-sort-button:active .a-sort-icon{
  fill: var(--c-gray-1);
}

.a-caption{
  color: var(--c-gray-2);
}

.a-sort-button:active .a-caption{
  color: var(--c-gray-1);
}
</style>
