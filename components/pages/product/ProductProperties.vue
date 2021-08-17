<template>
  <div v-if="productProperties != null">
    <product-profile-dialog 
      :open="profileDialogOpen"
      :properties="item.properties"
      @close="closeProfileDialog"
      @select="setProperties"
    />
    <label>Eigenschaften</label>
        <sub-panel class="mb">
          <div class="mb">
            <div v-for="property in item.properties" :key="property.property._id" class="a-property">
              <grid template="3fr 1fr" class="a-property-value">
                <div>
                  <select-box 
                    :value="property.property._id"
                    @change="id => changeProperty(property.property._id, id)"
                    :options="productProperties.map(a => ({ 
                      value: a._id, 
                      label: a.name, 
                      disabled: item.properties.some(b => b.property._id == a._id) 
                    }))"
                  />
                </div>
                <div>
                  <text-box v-if="property.property.dataType!='boolean'" v-model="property.value" />
                  <check-box v-else :checked="JSON.parse(property.value)" @input="checked => property.value = JSON.stringify(checked)" />
                </div>
              </grid>
              <div class="a-property-delete">
                <icon-button :action="() => deleteProperty(property.property._id)">
                  <delete-icon :height="24" />
                </icon-button>
              </div>
            </div>
            <div v-if="!item.properties || !item.properties.length" class="a-noproperties-label">
              Produkt-Eigenschaften hinzufügen oder Profil auswählen
            </div>
          </div>
          <div class="button-group">
            <icon-button :action="addProperty">
              <add-icon :height="24" />
              <span>Eigenschaft hinzufügen</span>
            </icon-button>
            <icon-button :action="openProfileDialog">
              <settings-icon :height="20" />
              <span>Profile</span>
            </icon-button>
          </div>
        </sub-panel>
  </div>
</template>

<script lang="ts">

import TextBox from '~/components/layout/inputs/TextBox.vue'
import { LoadingState } from '~/types'
import SelectBox from '~/components/layout/inputs/SelectBox.vue'
import Grid from '~/components/layout/page/Grid.vue'
import SubPanel from '~/components/layout/page/SubPanel.vue'
import ProductProfileDialog from '~/components/pages/product/ProductProfileDialog.vue'
import IconButton from '~/components/layout/buttons/IconButton.vue'
import DeleteIcon from '~/components/icons/basic/DeleteIcon.vue'
import SettingsIcon from '~/components/icons/basic/SettingsIcon.vue'
import AddIcon from '~/components/icons/basic/AddIcon.vue'
import systemHandler from '~/core/systemHandler'
import CheckBox from '~/components/layout/inputs/CheckBox.vue'

export default {
  components: { ProductProfileDialog, SelectBox, TextBox, Grid, IconButton, AddIcon, SettingsIcon, DeleteIcon, SubPanel, CheckBox },
  props: ["item"],
  data(){
    return {
      loadingState: LoadingState.ready,
      profileDialogOpen: false,
      productProperties: null
    }
  },
  async fetch(){

    const r1 = await systemHandler({ 
      query: `{
        productProperties{
          _id
          dataType
          name
        }
      }`
    })

    if(r1.loadingState != LoadingState.ready){
      this.loadingState = LoadingState.error
      return;
    }

    this.productProperties = r1.data.productProperties.sort((a, b) => a.name.localeCompare(b.name))

  },
  methods: {
    openProfileDialog(){
      this.profileDialogOpen = true
    },
    closeProfileDialog(){
      this.profileDialogOpen = false
    },
    addProperty(){
      this.item.properties.push({
        value: true,
        property: {
          _id: `_${Date.now().toString(36)}`,
          dataType: "boolean",
          name: "",
        }

      })
    },
    changeProperty(old, id){
      const _this = this.item.properties.find(a => a.property._id == old)
      const _property = this.productProperties.find(a => a._id == id)
      _this.property._id = _property._id
      _this.property.dataType = _property.dataType
      _this.property.name = _property.name
      _this.value = _property.dataType == "boolean" ? "true" : ""
    },
    deleteProperty(id){
      this.item.properties = this.item.properties.filter(a => a.property._id != id)
    },
    setProperties(profiles){

      const _properties = profiles.flatMap(profile => profile.properties)
      const ids = [ ...new Set(_properties.map(a => a.property._id)) ]

      this.item.properties = ids.map(id => _properties.find(a => a.property._id == id))
    }
  }
}
</script>

<style scoped>
.a-property{
  margin-bottom: var(--default-gap);
  display: flex;
  align-items: stretch;
  width: 100%;
  gap: var(--default-gap);
}
.a-property-value{
  flex: 1;
}
.a-noproperties-label{
  position: relative;
  line-height: var(--form-element-y);
  margin-bottom: var(--default-gap);
}
.a-property-delete{
  display: flex;
  align-items: center;
}
</style>