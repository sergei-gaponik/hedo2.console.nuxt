<template>
  <div>
    <input 
      class="a-input"
      :list="uid"
      :required="!!required"
      :value="value" 
      @input="$emit('input', $event.target.value)" />
    
    <datalist :id="uid">
      <option v-for="option in $data._options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </datalist>  
  </div>
</template>

<script lang="ts">
export default {
  props: {
    required: Boolean,
    value: String,
    options: Array
  },
  data() {

    let _options = []

    if(this.$props.options.length){

      if(typeof this.$props.options[0] == "object")
        if(Array.isArray(this.$props.options[0]))
          _options = this.$props.options.map(o => ({ value: o[0], label: o[1] }))
        else
          _options = this.$props.options
      else
        _options = this.$props.options.map(o => ({ value: o, label: o }))
    }

    return {
      uid: null,
      _options
    }
  }, 
  mounted() {
    this.uid = `options-${this._uid}`
  }
}
</script>

<style scoped>
.a-input {
  font-family: var(--default-font);
  border: 1px solid var(--c-gray-3);
  color: var(--c-gray-1);
  border-radius: var(--default-border-radius);
  padding: 0 5px;
  height: var(--form-element-y);
  box-sizing: border-box;
  width: 100%;
}
</style>