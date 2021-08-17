<template>
<div class="a-container" :style="{ width }">
  <input 
    class="a-input"
    :value="value" 
    ref="input"
    @input="changeValue"  />
  <span class="a-icon" @click="clearInput" >
    <search-icon v-if="!hasInput" color="var(--c-gray-2)" height="15"/>
    <cross-icon v-if="hasInput"  color="var(--c-gray-2)" height="15"/>
  </span>
</div>
</template>

<script lang="ts">
import SearchIcon from '~/components/icons/navigation/SearchIcon.vue'
import CrossIcon from '~/components/icons/basic/CrossIcon.vue'

export default {
  components: { SearchIcon, CrossIcon },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: ["value", "width"],
  methods: {
    changeValue(e: any){

      this.hasInput = !!e.target.value.length

      this.$emit('input', e.target.value)
    },
    clearInput(){
      
      this.hasInput = false

      this.$emit('input', '')
    }
  },
  data(){
    return {
      hasInput: !!this.$props.value?.length
    }
  }
}
</script>

<style scoped>
.a-container {
  position: relative;
}
.a-input {
  font-family: var(--default-font);
  border: none;
  outline: none;
  background-color: var(--c-gray-3);
  color: var(--c-gray-1);
  border-radius: var(--default-border-radius);
  padding: 0 var(--default-padding-x);
  height: var(--form-element-y);
  width: calc(100% - var(--default-padding-x) * 2);
}
.a-icon {
  position: absolute;
  right: var(--default-padding-x);
  top: calc(var(--form-element-y) / 2);
  transform: translateY(-50%);
  height: 15px;
}
</style>