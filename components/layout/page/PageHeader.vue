<template>
  <div class="a-page-header">
    <div class="a-container-left">
    <icon-button v-if="back != undefined" :action="backButtonAction" class="a-back-icon">
      <back-icon height=20 />
    </icon-button>
    <h2 class="a-page-title">{{ title }}</h2>
    </div>
    <slot />
  </div>
</template>

<script>
import IconButton from '../buttons/IconButton.vue'
import BackIcon from '../../icons/navigation/BackIcon.vue'

export default {
  components: { IconButton, BackIcon },
  props: ["title", "back"],
  methods: {
    backButtonAction(){
      if(this.back)
        this.$router.push(this.back)
      else
        this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.a-back-icon{
  padding: 0 var(--button-padding-x);
}
.a-page-header{
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  height: 90px;
}
.a-page-title{
  color: var(--c-blue-1);
  font-size: 22px;
  font-weight: bold;
}
.a-container-left{
  margin-right: auto;
  display: flex;
  align-items: center;
}
</style>