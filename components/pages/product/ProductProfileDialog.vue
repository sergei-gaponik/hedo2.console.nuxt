<template>
   <basic-dialog
    :open="open"
    @close="close"
  >
    <div class="a-container">
      <multi-select 
        :items="productProfiles.map(a => ({ value: a.name, key: a._id }))"
        noItemsLabel="Keine Profile"
        :action="deleteProfile"
        :select="selectProfiles"
        :rename="renameProfile"
      >
        <icon-button>
          <delete-icon :height="24" />
        </icon-button>
      </multi-select>
      <icon-button :action="createProfile">
        <add-icon :height="24" />
        <span>Profil erzeugen</span>
      </icon-button>

    </div>
  </basic-dialog>
</template>

<script>
import BasicDialog from '~/components/layout/menus/BasicDialog.vue'
import MultiSelect from '~/components/layout/menus/MultiSelect.vue'
import consoleHandler from '~/core/consoleHandler'
import IconButton from '~/components/layout/buttons/IconButton.vue'
import AddIcon from '~/components/icons/basic/AddIcon.vue'
import DeleteIcon from '~/components/icons/basic/DeleteIcon.vue'

export default {
  components: { BasicDialog, MultiSelect, IconButton, AddIcon, DeleteIcon },
  props: [ "open", "properties" ],
  data(){

    return {
      productProfiles: []
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    async createProfile(){

      const profile = {
        name: "Neues Profil",
        properties: this.properties
      }


      await consoleHandler({
        path: "createProductProfile",
        args: { profile }
      })

      this.$fetch()
    },
    async deleteProfile(id){

      const r = await consoleHandler({
        path: "deleteProductProfiles",
        args: { ids: [ id ] }
      })

      console.log(r)

      this.$fetch()
    },
    async renameProfile(id, name){

      const r = await consoleHandler({
        path: "updateProductProfile",
        args: { id, update: { name }}})

      console.log(r)

      this.$fetch()
    },
    selectProfiles(selected){

      this.$emit("select", this.productProfiles.filter(a => selected.includes(a._id)))
    }
  },
  async fetch(){

    const r = await consoleHandler({ path: "findProductProfiles" })
    
    this.productProfiles = r.data.productProfiles
  }
}
</script>

<style scoped>
.a-container{
  width: 400px;
}
</style>