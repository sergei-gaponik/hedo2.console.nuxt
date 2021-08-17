<template>
  <input 
    class="a-input"
    :value="value" 
    @input="$emit('input', $event.target.value)"
    :required="required"
    :disabled="disabled"
    :pattern="htmlPattern"
    />
</template>

<script lang="ts">
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    required: Boolean,
    disabled: Boolean,
    value: String,
    pattern: String
  },
  computed: {
    htmlPattern(){
      if(this.pattern == "handle")
        return '[a-zA-Z0-9\-]+'
      else if(this.pattern)
        return this.pattern
      else
        return '.*'
    }
  }
}
</script>

<style scoped>
.a-input {
  all: unset;
  background-color: white;
  cursor: text;
  color: var(--c-gray-1);
  height: var(--form-element-y);
  box-sizing: border-box;
  width: 100%;
  border: 1px solid var(--c-gray-3);
  border-radius: var(--default-border-radius);
  padding: 0 5px;
}

.a-input:disabled {
  background-color: var(--c-gray-4);
  color: var(--c-gray-2);
}
.a-input:invalid {
    border-color: var(--c-error);
}
</style>