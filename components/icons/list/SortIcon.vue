<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="height + 'px'" :height="height + 'px'" focusable="false" viewBox="0 0 24 24" :fill="color">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
  </svg>
</template>

<script>
export default {
  props: ["color", "height"]
}
</script>