<template>
  <div>
    <select 
      class="a-select"
      :value="value" 
      @change="$emit('change', $event.target.value)"
      :required="!!required"
    >
      <option selected disabled value="">Auswählen</option>
      <option 
        v-for="option in computedOptions" 
        :key="option.value" 
        :value="option.value"
        :disabled="option.disabled || false"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    required: Boolean,
    value: String,
    options: Array
  },
  computed: {

    computedOptions(){
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
      return _options;
    }


    
  }

}
</script>

<style scoped>

.a-select {
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