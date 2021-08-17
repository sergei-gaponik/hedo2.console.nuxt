<template>
<div>
  <page-header :title="'Produkte ' + (id ? 'bearbeiten' : 'hinzufügen')" back="/products" />
  <panel>
    <form @submit.prevent="formSubmit">
      <grid template="1fr 1fr" class="mb">
        <div>
          <label>Marke*</label>
          <select-box 
            v-if="item.brand != null"
            v-model="item.brand._id"
            :options="brandOptions"
          />
        </div>
        <div>
          <label>Serie</label>
          <select-box 
            v-if="item.series != null && item.brand != null"
            v-model="item.series._id"
            :options="seriesOptions"
          />
        </div>
        <div>
          <label>Name*</label>
          <text-box v-model="item.name" required />
        </div>
        <div>
          <label>Handle</label>
          <text-box v-model="item.handle" required :disabled="!id" pattern="handle" />
        </div>
      </grid>
      <div class="mb">
        <product-properties :item="item"/>
      </div>
      <div class="mb2">
        <label>Beschreibung</label>
        <multi-line v-model="item.description" rows="5" />
      </div>
      <div class="button-group">
        <primary-button submit>Speichern</primary-button>
        <secondary-button to="/products">Verwerfen</secondary-button>
      </div>
    </form>
  </panel>
</div>
</template>

<script lang="ts">
import TextBoxWithOptions from '~/components/layout/inputs/TextBoxWithOptions.vue'
import TextBox from '~/components/layout/inputs/TextBox.vue'
import Panel from '~/components/layout/page/Panel.vue'
import PageHeader from '~/components/layout/page/PageHeader.vue'
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/layout/buttons/SecondaryButton.vue'
import systemHandler from '~/core/systemHandler'
import { LoadingState } from '~/types'
import SelectBox from '~/components/layout/inputs/SelectBox.vue'
import Grid from '~/components/layout/page/Grid.vue'
import MultiLine from '~/components/layout/inputs/MultiLine.vue'
import AddIcon from '~/components/icons/basic/AddIcon.vue'
import ProductProperties from '~/components/pages/product/ProductProperties.vue'

export default {
  components: { ProductProperties, TextBoxWithOptions, Panel, PageHeader, PrimaryButton, SecondaryButton, SelectBox, TextBox, Grid, MultiLine, AddIcon },
  data(){
    return {
      loadingState: LoadingState.ready,
			id: this.$route.params.id != 'add' ? this.$route.params.id : null,
      item: {},
      series: [],
      brands: []
    }
  },
  async fetch(){

    const r1 = await systemHandler(`{
      series{
        _id
        name
        brand {
          _id
        }
      }
    }`)

    this.series = r1.data.series

    const r2 = await systemHandler(`{
      brands{
        _id
        name
      }
    }`)

    this.brands = r2.data.brands

    if(!this.id) return;

    const r3 = await systemHandler({ 
      query: `
			query GetProductByID($id: String!){
        product(filter: {_id: $id}, dereference: true){
          _id
          name
          series {
            _id
          }
          brand {
            _id
          }
          description
          handle
          properties {
            property {
              name
              dataType
              _id
            }
            value
          }
        }
      }`,
      variables: { id: this.id }
		})

		if(r3.loadingState == LoadingState.ready && r3.data.product){
			this.item = r3.data.product
      if(!this.item.series)
        this.item.series = {}
		}

  },
  computed: {
    brandOptions(){
      return this.brands.map(a => ({ 
        value: a._id, 
        label: a.name
      }))
    },
    seriesOptions(){
      return this.series.filter(a => a.brand._id == this.item.brand._id).map(a => ({ 
        value: a._id, 
        label: a.name
      }))
    }
  },
  methods: {
    async formSubmit(){

      let input: any = {
        name: this.item.name,
        series: this.item.series._id,
        brand: this.item.brand._id,
        description: this.item.description,
        properties: this.item.properties
          .filter(a => a?.property?._id && !a.property._id.startsWith("_"))
          .map(a => ({ 
              value: a.value, 
              property: a.property._id 
          }))
      }

			if(this.id){

        input.handle = this.item.handle

				const r = await systemHandler({
					query:  `
						mutation UpdateOneProduct($input: ProductInput!, $id: String!){
							updateOneProduct(filter: { _id: $id}, input: $input){
								errors
							}
						}`,
					variables: { 
						input,
						id: this.id
					}
				})

				this.loadingState = r.loadingState
			}
			else{
				
				const r = await systemHandler({
					query:  `
						mutation CreateProduct($input: ProductInput!){
							createProduct(input: $input){
								product{
									_id
								}
								errors
							}
						}`,
					variables: { 
						input
					}
				})
        
        if(r.data?.createProduct?.product?._id)
					this.loadingState = r.loadingState
				else 
					this.loadingState = LoadingState.error
			}
      
      if(this.loadingState == LoadingState.ready)
        this.$router.push(`/products`)

    }
  }
}
</script>

<style scoped>

</style>