<template>
  <div>
      <context-menu 
        :open="projectionMenuVisible" 
        :position="projectionMenuPosition"
        @close="projectionMenuVisible = false" 
      >
        <div v-for="column in columns" :key="column.index" class="a-projection-row">
          <check-box v-model="column.visible" />
          <span>{{ column.name }}</span>
        </div>
      </context-menu>
    <lazy-wrapper :loadingState="loadingState">
      <table class="a-table">
        <colgroup>
          <col span="1" width="10%">
          <col v-for="column in visibleColumns" :key="column.index" span="1" :width="`${90 / visibleColumns.length}%`"/>
        </colgroup>
        <thead class="a-thead-container" >
          <tr>
            <th :colspan="visibleColumns.length + 1">
              <div class="a-toolbar">
                <span class="a-toolbar-left">
                  <filter-button :action="test"/>
                  <sort-button :action="test"/>
                </span>
                <search-bar v-model="searchQuery" width="400px" ref="listviewSearch" />
                <projection-button :action="showProjectionMenu"/>
              </div>
            </th>
          </tr>
          <tr v-if="!selected.length">
            <th class="h6 a-th"><check-box v-model="checkboxAll" /></th>
            <th class="h6 a-th" v-for="column in visibleColumns" :key="column.index">
              {{ column.name }}
            </th>
          </tr>
          <tr v-if="selected.length">
            <th class="h6 a-th"><check-box v-model="checkboxAll" /></th>
              <th :colspan="visibleColumns.length">
                <div class="a-th a-buttons">
                  <div class="a-selected-caption">
                    {{ selected.length }} ausgewählt
                  </div>
                  <link-button v-for="button in buttons" :key="buttons.indexOf(button)" :action="() => buttonHandler(button)">
                    {{ button.caption }}
                  </link-button>
                </div>
              </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item._id">
            <td><check-box :checked="selected.includes(item._id)" @input="toggleSelection(item._id)" /></td>
            <td v-for="column in visibleColumns" :key="column.index" @click="edit(item._id)" class="pointer">
              {{ getValueFromPath(item, column.propertyPath) }}
            </td>
          </tr>
        </tbody>
      </table>
      <basic-list-view-footer 
        @nextPage="nextPage"
        @prevPage="prevPage"
        @setLimit="setLimit"
        :page="page"
        :hasNextPage="items.length == limit"
        :limit="limit"
      />
    </lazy-wrapper>
  </div>
</template>

<script lang="ts">

import LazyWrapper from '~/components/util/LazyWrapper.vue'
import LinkButton from '~/components/layout/buttons/LinkButton.vue'
import { LoadingState } from '~/types'
import CheckBox from '~/components/layout/inputs/CheckBox.vue'
import SearchBar from '~/components/layout/inputs/SearchBar.vue'
import FilterButton from '~/components/layout/buttons/list/FilterButton.vue'
import ProjectionButton from '~/components/layout/buttons/list/ProjectionButton.vue'
import SortButton from '~/components/layout/buttons/list/SortButton.vue'
import ContextMenu from '~/components/layout/menus/ContextMenu.vue'
import systemHandler from '~/core/systemHandler'
import BasicListViewFooter from './BasicListViewFooter.vue'

export default {
  components: { LazyWrapper, LinkButton, CheckBox, SearchBar, FilterButton, ProjectionButton, SortButton, ContextMenu, BasicListViewFooter },
  props: ["mapping", "buttons", "path", "result", "query"],
  data(){
    const columns = this.mapping.map((a, index) => ({ 
      name: a.name,
      propertyPath: a.propertyPath,
      index, 
      visible: a.visible !== undefined ? a.visible : true
    }))

    return {
      items: [],
      projection: columns.map(a => a.index),
      selected: [],
      columns,
      checkboxAll: false,
      searchQuery: "",
      projectionMenuVisible: false,
      projectionMenuPosition: null,
      queryIndex: 0,
      page: 1,
      limit: 50,
      loadingState: LoadingState.ready
    }
  },
  methods: {
    test(){

    },
    nextPage(){
      this.page++
      this.$fetch()
    },
    prevPage(){
      this.page--
      this.$fetch()
    },
    setLimit(limit){
      this.limit = limit
      this.page = 1
      this.$fetch()
    },
    showProjectionMenu(event){
      this.projectionMenuVisible = true
      this.projectionMenuPosition = [ event.clientX, event.clientY ]
    },
    buttonHandler({ action }){
      action(this.selected, this).then(selected => {
        if(selected) this.selected = selected
      })
    },
    edit(id){
      this.$router.push(`/${this.path}/${id}`)
    },
    toggleSelection(id){
      if(this.selected.includes(id))
        this.selected = this.selected.filter(a => a != id)
      else 
        this.selected.push(id)
    },
    getValueFromPath(item, propertyPath){
      
      try{
        let paths = propertyPath.split('.')
        let current = item

        for (let i = 0; i < paths.length; ++i) {
          if (current[paths[i]] == undefined) {
            return null;
          } else {
            current = current[paths[i]];
          }
        }
        return current;
      }
      catch(e){
        return null;
      }
    }
  },
  async fetch(){
    this.loadingState = LoadingState.loading

    const res = await systemHandler({
      query: this.query,
      variables: {
        filter: {
          _json: JSON.stringify(this.filter)
        },
        page: this.page,
        limit: this.limit
      }
    })

    this.loadingState = res.loadingState
    this.items = res.data[this.result]

  },
  watch: {
    checkboxAll(v){
      if(v)
        this.selected = this.items.map(a => a._id)
      else 
        this.selected = []
    },
    searchQuery(){
      
      const QUERY_DELAY = 200

      this.queryIndex++
      const _queryIndex = this.queryIndex

      setTimeout(() => {
        if(_queryIndex == this.queryIndex){
          // this.page = 1
          // this.filter = {
          //   $or: this.searchFields.map(s => ({
          //     [s]: { $regex: this.searchQuery, '$options': 'i' }
          //   }))
          // }
          // this.$fetch().then(() => {
          //   this.$nextTick(() => {
          //     this.$refs.listviewSearch.$el.querySelector("input").focus()
          //   })
          // })
        }
      }, QUERY_DELAY)
    }
  },
  computed: {
    visibleColumns(){
      return this.columns.filter(a => a.visible)
    }
  }
}
</script>

<style scoped>
.a-projection-row{
  display: flex;
  align-items: center;
  gap: var(--default-margin);
  margin: 2px 0;
}

.a-table{
  width: 100%;
  border-collapse: collapse;
}

.a-thead-container{
  text-align: left;
}

.a-table th{
  height: calc(var(--table-row-y) * 2);
}

.a-table tbody tr{
  height: var(--table-row-y);
}
.a-table tbody tr:hover{
  background-color: var(--c-gray-4);
}

.a-buttons{
  vertical-align: bottom;
  display: flex;
  gap: var(--default-gap);
}
.a-selected-caption{
  color: var(--c-blue-2);
  font-weight: normal;
}
.a-toolbar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
}
.a-toolbar-left{
  display: flex;
  align-items: center;
  gap: var(--default-gap);
}
</style>