<template>
  <button class="a-button" @click="_action" :type="submit ? 'submit' : 'button'"><slot /></button>
</template>

<script>
export default {
  props: {
    action: Function,
    to: String,
    submit: Boolean
  },
  methods: {
    _action(){

      
      if(this.$props.submit) return;

      if(this.$props.to)
        this.$router.push(this.$props.to)
      else if(this.$props.action)
        this.$props.action()
    }
  }
}
</script>

<style scoped>
.a-button{
  all: unset;
  cursor: pointer;
  user-select: none;
  color: var(--c-blue-3);
  border-radius: var(--default-border-radius);
}
.a-button:active{
  color: var(--c-blue-1);
}
</style>