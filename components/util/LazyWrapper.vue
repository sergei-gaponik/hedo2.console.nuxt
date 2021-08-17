<template>
  <div v-if="loadingState=='loading'" class="a-center"><loading-icon /></div>
  <div v-else-if="loadingState=='error'" class="a-center"><error-icon /></div>
  <div v-else><slot /></div>
</template>

<style scoped>
.a-center{
  text-align: center;
}
</style>

<script>
import LoadingIcon from '~/components/icons/status/LoadingIcon.vue'
import ErrorIcon from '~/components/icons/status/ErrorIcon.vue'
import { LoadingState } from '~/types'

export default {
  name: "LazyWrapper",
  components: { LoadingIcon, ErrorIcon },
  props: [ "loadingState" ]
}
</script>