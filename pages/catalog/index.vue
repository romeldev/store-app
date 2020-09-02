<template>
  <div class="">
    <div class="columns is-multiline">
      <div class="column is-one-third" v-for="item in dataItems.data" :key="item.id">
        <CatalogProduct :item="item" />
      </div>

      <div class="column is-full">
          <CatalogPaginator
          :current_page="dataItems.meta.current_page" 
          :last_page="dataItems.meta.last_page" 
          @clicked="getItems" />
      </div>

    </div>
  </div>
</template>

<script>
import CatalogPaginator from '@/components/CatalogPaginator'
import CatalogProduct from '@/components/CatalogProduct'

export default {
  components: {
    CatalogPaginator,
    CatalogProduct
  },

  data() {
    return {
      resource: 'catalog',
      search: '',
      modal: {
        open: false,
        title: 'Modal',
      },

      form: new this.$Form({
        id: '',
        name: '',
        _action: '', // create, edit, delete, show
        _method: '', // POST/PUT/DELETE
      }),

      dataItems: {},

      meta: [],
    }
  },

  async asyncData({ query, store }) {
    let params = {
      page: query.page==null? 1: query.page,
      search: query.search==null? '': query.search,
    }
    let dataItems =  await store.dispatch('catalog/getDataItems', params)
    dataItems = dataItems.data;

    let meta = [
      {
        property: 'og.description',
        content: 'Encuentra los mejores productos en nuestro catalago virtual!'
      }
    ]
    dataItems.data.forEach(item => {
      meta.push({
        property: 'og:image',
        content: item.image
      })
    });
    
    return { dataItems, meta }
  },

  head() {
    return  {
      title: this.resource,
      meta: this.meta,
    }
  },

  created(){
    // this.getItems()
  },

  methods: {
    async getItems( page=1 ) {

      this.$router.push({ name: 'catalog', query: {page: page} })

      let params = {
        page: page,
        search: this.search,
      }

      let resItems = await this.$store.dispatch('catalog/getDataItems', params)
      this.dataItems = resItems.data;
      this.dataItems.current_page = this.dataItems.meta.current_page;
      this.dataItems.last_page = this.dataItems.meta.last_page;
    }
  }
}
</script>

<style>

</style>