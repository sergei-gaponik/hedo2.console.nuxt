<template>
<div>
  <page-header :title="'Produkt-Eigenschafts-Kategorien ' + (id ? 'bearbeiten' : 'hinzufügen')" back="/productPropertyCategories" />

  <panel>
    <form @submit.prevent="formSubmit">
      <div class="mb">
        <label>Name*</label>
        <text-box v-model="item.name" required />
      </div>
      <div class="mb2">
        <label>Beschreibung</label>
        <multi-line v-model="item.description" rows="3" />
      </div>
      <div class="button-group">
        <primary-button submit>Speichern</primary-button>
        <secondary-button to="/productPropertyCategories">Verwerfen</secondary-button>
      </div>
    </form>
  </panel>

</div>
</template>

<script>
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

export default {
  components: { TextBoxWithOptions, Panel, PageHeader, PrimaryButton, SecondaryButton, SelectBox, TextBox, Grid, MultiLine },
  data(){
    return {
      productPropertyCategories: [],
      loadingState: LoadingState.ready,
			id: this.$route.params.id != 'add' ? this.$route.params.id : null,
      item: {
        name: "",
        description: ""
      }
    }
  },
  async asyncData(){

    const r1 = await systemHandler({ 
      query: `{
        productPropertyCategories{
          description
          name
        }
      }`
    })

    if(r1.loadingState != LoadingState.ready){
      this.loadingState = LoadingState.error
      return { categories: null }
    }

    const categories = r1.data.productPropertyCategories

    return { categories }
  },
  async fetch(){

    if(!this.id) return;

    const r2 = await systemHandler({ 
      query: `
			query GetProductPropertyByID($id: String!){
        productProperty(filter: {_id: $id}, dereference: true){
          name
          category {
            _id
            name
          }
          dataType
          description
          name
          _id
        }
      }`,
      variables: { id: this.id }
		})

		if(r2.loadingState == LoadingState.ready && r2.data.productProperty){

			const productProperty = r2.data.productProperty

			this.item.name = productProperty.name
			this.item.category = productProperty.category?.name || null
			this.item.dataType = productProperty.dataType
			this.item.description = productProperty.description
		}

  },
  methods: {
    async formSubmit(){

      const r1 = await systemHandler({
        query: `
          query GetProductPropertyCategory($name: String!){
            productPropertyCategory(filter:{name:$name}){
              _id
              description
              name
            }
          }`,
        variables: { name: this.item.category }
      })

      if(r1.loadingState != LoadingState.ready){
        this.loadingState = LoadingState.error
        return;
      }

      let oid = null;

      if(r1.data.productPropertyCategory){
        oid = r1.data.productPropertyCategory._id
      }
      else{
        const r2 = await systemHandler({
          query: `
            mutation CreateProductPropertyCategory($name: String!){
              createProductPropertyCategory(input: {
                name: $name
              }){
                errors
                productPropertyCategory{
                  _id
                }
              }
            }`,
          variables: { name: this.item.category }
        })

        if(r2.loadingState != LoadingState.ready){
          this.loadingState = LoadingState.error
          return;
        }

        oid = r2.data?.createProductPropertyCategory?.productPropertyCategory?._id

        if(!oid){
          this.loadingState = LoadingState.error
          return;
        }
      }

			if(this.id){

				const r3 = await systemHandler({
					query:  `
						mutation UpdateOneProductProperty($input: ProductPropertyInput!, $id: String!){
							updateOneProductProperty(filter: { _id: $id}, input: $input){
								errors
							}
						}`,
					variables: { 
						input: {
							name: this.item.name,
							description: this.item.description,
							dataType: this.item.dataType,
							category: oid
						},
						id: this.id
					}
				})

				if(r3.data?.productProperty?._id)
					this.loadingState = r3.loadingState
				else 
					this.loadingState = LoadingState.error
			}
			else{
				
				const r3 = await systemHandler({
					query:  `
						mutation CreateProductProperty($input: ProductPropertyInput!){
							createProductProperty(input: $input){
								productProperty{
									_id
								}
								errors
							}
						}`,
					variables: { 
						input: {
							name: this.item.name,
							description: this.item.description,
							dataType: this.item.dataType,
							category: oid
						}
					}
				})

				console.log(r3)

				const id = r3.data?.createProductProperty?.productProperty?._id

				if(!id){
					this.loadingState = LoadingState.error
					return;
				}
			}
      if(this.loadingState == LoadingState.ready)
        this.$router.push(`/productPropertyCategories`)

    }
  }
}
</script>

