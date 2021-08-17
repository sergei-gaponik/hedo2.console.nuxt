<template>
  <textarea
      class="a-textarea"
      :row="rows"
      :value="value"
      :required="!!required"
      @input="$emit('input', $event.target.value)"
      :style="{ height: `calc(var(--form-element-y) * ${rows})` }"
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
    value: String,
    rows: [Number, String]
  },
}
</script>

<style scoped>
.a-textarea {
  font-family: var(--default-font);
  border: 1px solid var(--c-gray-3);
  color: var(--c-gray-1);
  border-radius: var(--default-border-radius);
  padding: 0 5px;
  box-sizing: border-box;
  width: 100%;
  resize: none;
}
</style>