<template>
<div>
  <page-header title="Produkt-Eigenschafts-Kategorie" >
    <primary-button to="productPropertyCategories/add">Hinzufügen</primary-button>
  </page-header>
  <panel>
    <div class="a-panel">
      <basic-list-view 
        :mapping="mapping" 
        :query="query"
        :buttons="buttons"
        path="productPropertyCategories" 
        result="productPropertyCategories"
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
import systemHandler from '~/core/systemHandler'

export default {
  components: { Panel, PageHeader, PrimaryButton, BasicListView },
  methods: {
    queryChanged(query){
      console.log({query})
    }
  },
  data(){

    const mapping = [
      {
        name: "Name",
        propertyPath: "name"
      },
      {
        name: "Beschreibung",
        propertyPath: "description"
      }
    ]

    const buttons = [
      {
        async action(selected, _this){

          const query = `
            mutation DeleteProductPropertyCategories($filter: ProductPropertyCategoryFilter!){
              deleteProductPropertyCategories(filter: $filter){
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
      query GetProductPropertyCategories($filter: ProductPropertyCategoryFilter, $page: Float!, $limit: Float!){
        productPropertyCategories(dereference: true, filter: $filter, page: $page, limit: $limit){
          _id
          name
          description
        }
      }
    `

    return {

      buttons,
      mapping,
      query
    }
  },
}
</script>

<style scoped>
.a-panel{
  overflow: scroll;
  min-width: 600px;
}
</style>