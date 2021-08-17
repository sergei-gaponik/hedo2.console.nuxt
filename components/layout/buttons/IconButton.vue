<template>
  <button @click="_action" class="icon-button" type="button">
    <slot />
  </button>
</template>

<script>
import AddIcon from '~/components/icons/basic/AddIcon.vue'

export default {
  components: { AddIcon },
  props: ["action"],
  methods: {
    _action(){
      if(this.action)
        this.action()
    }
  }
}
</script>

<style>

.icon-button{
  all: unset;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  border-radius: var(--default-border-radius);
  position: relative;
  min-width: 24px;
  height: 24px;
}

.icon-button > svg {
  fill: var(--c-blue-1);
}

.icon-button > span {
  color: var(--c-blue-1);
  font-weight: bold;
  padding: 0 var(--default-padding-x);
}

.icon-button:active{
  background-color: var(--c-gray-4);
}
</style>
