<template>
  <div class="a-footer">
    <div>

    </div>
    <div class="a-nav">
      <button type="button" @click="prevPage" :disabled="page == 1" class="a-navbutton">
        <back-icon :height="20" />
      </button>
      <div class="a-pagenum">{{page}}</div>
      <button type="button" @click="nextPage" :disabled="!hasNextPage" class="a-navbutton">
        <next-icon :height="20" />
      </button>
    </div>
  </div>
</template>

<script>
import NextIcon from '~/components/icons/navigation/NextIcon.vue'
import BackIcon from '~/components/icons/navigation/BackIcon.vue'

export default {
  components: { NextIcon, BackIcon },
  props: ["page", "hasNextPage", "limit"],
  methods: {
    nextPage(){
      if(this.hasNextPage){
        this.$emit("nextPage")
      }
    },
    prevPage(){
      if(this.page > 1){
        this.$emit("prevPage")
      }
    }
  }
}
</script>

<style scoped>
.a-footer{
  height: calc(var(--table-row-y) * 2);
  display: flex;
  justify-content: space-between;
  
}
.a-nav{
  display: flex;
  align-items: center;
  gap: var(--default-gap);
}
.a-navbutton{
  all: unset;
  cursor: pointer;
  fill: var(--c-gray-2);
  padding: 0 var(--button-padding-x);
}
.a-navbutton:disabled{
  fill: var(--c-gray-3);
  cursor: default;
}
.a-navbutton:enabled:active{
  fill: var(--c-gray-1);
}
.a-pagenum{
  font-size: 1.7rem;
  line-height: 20px;
  color: var(--c-gray-2);
  cursor: default;
}
</style>