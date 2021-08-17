<template>
<div>
  <page-header title="Produkte" >
    <primary-button to="products/add">Hinzufügen</primary-button>
  </page-header>
  <panel>
    <div class="a-panel">
      <basic-list-view 
        :mapping="mapping" 
        :query="query"
        :buttons="buttons"
        result="products"
        path="products"
        :searchFields="searchFields"
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
        name: "Marke",
        propertyPath: "brand.name"
      },
      {
        name: "Name",
        propertyPath: "name"
      },
      {
        name: "Serie",
        propertyPath: "series.name"
      },
      {
        name: "Beschreibung",
        propertyPath: "description",
        visible: false
      }
    ]

    const searchFields = [ "handle" ]

    const buttons = [
      {
        async action(selected, _this){

          const query = `
            mutation DeleteProducts($filter: ProductFilter!){
              deleteProducts(filter: $filter){
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

    const query = `
      query GetProducts($filter: ProductFilter, $page: Float!, $limit: Float!){
        products(dereference: true, filter: $filter, page: $page, limit: $limit){
          _id
          name
          series{
            _id
            name
          }
          brand{
            _id
            name
          }
          description
        }
      }
    `


    return {
      query,
      buttons,
      mapping,
      searchFields
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