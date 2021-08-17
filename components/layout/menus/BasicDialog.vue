<template>
  <div class="a-bg" v-if="open">
    <div class="a-container" v-click-outside="close">
      <panel>
        <div class="a-panel">
          <div>
            <slot />
          </div>
          <div class="a-buttons" v-if="form">
            <primary-button :action="submit">Anwenden</primary-button>
            <secondary-button :action="close">Abbrechen</secondary-button>
          </div>
        </div>
      </panel>
    </div>
  </div>
</template>

<script>
import Panel from '~/components/layout/page/Panel.vue'
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/layout/buttons/SecondaryButton.vue'

export default {
  props: {
    open: Boolean,
    form: Boolean
  },
  components: { Panel, PrimaryButton, SecondaryButton },
  methods: {
    close(){
      this.$emit('close')
    },
    submit(){
      this.$emit('submit')
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

.a-bg{
  z-index: 10000;
  background-color: var(--c-transparent-bg);
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
}
.a-container{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.a-panel{
  display: flex;
  flex-direction: column;
  gap: var(--default-margin);
}
.a-buttons{
  margin-top: auto;
  display: flex;
  flex-direction: row-reverse;
  gap: var(--default-gap);  
}
</style>