<template>
  <button @click="action" class="a-filter-button" type="button">
    <filter-icon height="24" class="a-filter-icon" />
    <span class="a-caption">Filter</span>
  </button>
</template>

<script>
import FilterIcon from '~/components/icons/list/FilterIcon.vue'

export default {
  components: { FilterIcon },
  props: ["action"]
}
</script>

<style scoped>

.a-filter-button{
  all: unset;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  height: var(--button-x);
  padding: 0 var(--button-padding-x);
  gap: var(--default-gap);
}

.a-filter-icon{
  fill: var(--c-gray-2);
}

.a-filter-button:active .a-filter-icon{
  fill: var(--c-gray-1);
}

.a-caption{
  color: var(--c-gray-2);
}

.a-filter-button:active .a-caption{
  color: var(--c-gray-1);
}
</style>
