<template>
  <div class="">
    <div class="columns is-multiline">
      <div class="column is-one-third" v-for="item in dataItems.data" :key="item.id">
        <CatalogProduct :item="item" />
      </div>

      <div class="column is-full">
        <Paginator :data="dataItems" @clicked="getItems" />
      </div>
    </div>

    
  </div>
</template>

<script>
import Paginator from '@/components/Pagination'
import CatalogProduct from '@/components/CatalogProduct'

export default {
  components: {
    Paginator,
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
    }
  },

  created() {
    this.getItems();
  },

  methods: {

    openForm(action, item={})
    {
      this.form.fill(item);
      this.form._action = action;
      this.modal.open = true;

      if( this.form._action=='create') this.form._method = 'POST'
      if( this.form._action=='edit') this.form._method = 'PUT'
      if( this.form._action=='delete') this.form._method = 'DELETE'
      if( this.form._action=='show') this.form._method = 'GET'
    },

    closeForm()
    {
      // this.form.reset();
      this.form.clear();
      this.modal.open = false;
    },

    save() {
      let url = this.$axios.defaults.baseURL

      url += this.form._action==='create'? `${this.resource}`
        : `${this.resource}/${this.form.id}`;

      this.form.post( url )
      .then( res => {
        this.getItems();
        this.closeForm();
      })
      .catch(err => {
        console.error(err.response)
      })
    },

    async getItems( page=1) {
      let resItems = await this.$axios.get(`${this.resource}?page=${page}&search=${this.search}`);
      this.dataItems = resItems.data;
      this.dataItems.current_page = this.dataItems.meta.current_page;
      this.dataItems.last_page = this.dataItems.meta.last_page;
    }

  }
}
</script>

<style>

</style>