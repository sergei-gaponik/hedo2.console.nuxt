<template>
  <div class="a-list">
    <div class="a-item" v-for="item in items" :key="item.key">
      <div class="a-item-caption" @click="() => editMode != item.key && select(item.key)">
        <div v-if="editMode == item.key">
          <form @submit.prevent="() => _rename(item)">
            <text-box v-model="item.value" />
          </form>
        </div>
        <div v-else>
          {{item.value}}
        </div>
      </div>
      <div v-if="rename !== undefined && editMode != item.key" @click="() => edit(item.key)" class="a-item-action">
        <icon-button>
          <edit-icon height=24 />
        </icon-button>
      </div>
      <div v-if="action !== undefined" @click="() => action(item.key)" class="a-item-action">
        <slot />
      </div>
    </div>  
    <div v-if="!items.length">
      Keine Profile
    </div>
  </div>
</template>

<script lang="ts">
import IconButton from '../buttons/IconButton.vue'
import TextBox from '~/components/layout/inputs/TextBox.vue'
import EditIcon from '~/components/icons/basic/EditIcon.vue'

export default {
  components: { IconButton, TextBox, EditIcon },
  props: {
    items: Array,
    action: Function,
    select: Function,
    rename: Function
  },
  data(){
    return {
      editMode: null,
      renameRequestIndex: 0
    }
  },
  methods: {
    edit(key){
      if(this.editMode == key)
        this.editMode = null
      else
        this.editMode = key
    },
    _rename(_item){
      this.rename(_item.key, _item.value)
      this.editMode = null
    }
  }
}
</script>

<style scoped>
.a-list{
  width: 100%;
  line-height: var(--form-element-y);
  margin-bottom: var(--default-gap);
}
.a-item{
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  
  align-items: stretch;
  padding: 0 var(--default-padding-x);
  width: 100%;
  border-radius: var(--default-border-radius);
}
.a-item-caption{
  flex: 1;
}
.a-item-action {
  display: flex;
  align-items: center;
}
.a-item:hover{
  background-color: var(--c-gray-4);
}
</style>