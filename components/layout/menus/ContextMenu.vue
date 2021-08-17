<template>
  <div v-if="open">
    <div class="a-container" v-click-outside="close" :style="{ top: `${position[1]}px`, left: `${position[0]}px` }">
      <panel>
        <slot />
      </panel>
    </div>
  </div>
</template>

<script>
import Panel from '~/components/layout/page/Panel.vue'
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/layout/buttons/SecondaryButton.vue'

export default {
  props: ["open", "position"],
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
.a-container{
  z-index: 10000;
  position: fixed;
  transform: translate(-50%, 10px);
}
</style>