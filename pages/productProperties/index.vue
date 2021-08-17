<template>
<div>
  <page-header title="Produkt-Eigenschaften" >
    <primary-button to="productProperties/add">Hinzufügen</primary-button>
  </page-header>
  <panel>
    <div class="a-panel">
      <basic-list-view 
        :mapping="mapping" 
        :query="query"
        :buttons="buttons"
        path="productProperties" 
        result="productProperties"
      />
    </div>
  </panel>
</div>
</template>

<script>
import Panel from '~/components/layout/page/Panel.vue'
import PageHeader from '~/components/layout/page/PageHeader.vue'
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import BasicListView from '~/components/layout/views/BasicListView.vue'
import { LoadingState } from '~/types'
import systemHandler from '~/core/systemHandler'

export default {
  components: { Panel, PageHeader, PrimaryButton, BasicListView },
  data(){

    const mapping = [
      {
        name: "Name",
        propertyPath: "name"
      },
      {
        name: "Anzeigename",
        propertyPath: "title"
      },
      {
        name: "Kategorie",
        propertyPath: "category.name"
      },
      {
        name: "Datentyp",
        propertyPath: "dataType",
        visible: false
      },
      {
        name: "Beschreibung",
        propertyPath: "description",
        visible: false
      }
    ]

    const query = `
      query GetProductProperties($filter: ProductPropertyFilter, $page: Float!, $limit: Float!){
        productProperties(dereference: true, filter: $filter, page: $page, limit: $limit){
          _id
          name
          dataType
          category {
            _id
            name
          }
          description
          title
      }
    }`

    const buttons = [
      {
        async action(selected, _this){

          const query = `
            mutation DeleteProductProperties($filter: ProductPropertyFilter!){
              deleteProductProperties(filter: $filter){
                errors
                deletedCount
              }
            }`

          const variables = {
            filter: {
              _json: JSON.stringify({ _id: { $in: selected } })
            }
          }

          const r = await systemHandler({ query, variables })
          _this.$nuxt.refresh()

          return []
        },
        caption: "Löschen"
      }
    ]

    return {
      buttons,
      mapping,
      query
    }
  }
}
</script>

<style scoped>
.a-panel{
  overflow: scroll;
  min-width: 600px;
}
</style>