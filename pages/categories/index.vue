<template>
  <div class="">
    <div class="modal" :class="modal.open?'is-active': ''">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{modal.title}}</p>
          <button class="delete" aria-label="close" @click="closeForm()"></button>
        </header>
        <section class="modal-card-body">

          <div v-if="form._action==='create' || form._action==='edit'">
            <div class="field">
              <label for="name" class="label">Name(*)</label>
              <input type="text" id="name" class="input" v-model="form.name"
                :class="{ 'is-danger': form.errors.has('name') }">

              <p class="help is-danger" v-if="form.errors.has('name')">
                {{ form.errors.get('name') }}
              </p>
            </div>
          </div>

          <div v-if="form._action==='delete'">
            <p>
              Do you really want to delete the category "{{form.name}}"? This process cannot be undone.
            </p>
          </div>
          
        </section>
        <footer class="modal-card-foot">
            <button class="button" @click.prevent="closeForm()">Cancel</button>
            <button class="button is-primary" @click.prevent="save()" v-if="form._action=='create'">Store</button>
            <button class="button is-success" @click.prevent="save()" v-if="form._action=='edit'">Update</button>
            <button class="button is-danger" @click.prevent="save()" v-if="form._action=='delete'">Delete</button>
        </footer>
      </div>
    </div>

    <div class="panel">
      <p class="panel-heading">
        {{resource}}
        <button @click="openForm('create', {})" class="button is-small is-primary">New</button>
      </p>

      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="Search" 
            v-model="search"
            v-on:keyup.enter="getItems()">
          <span class="icon is-left">
            <font-awesome-icon icon="search" size="xs" />
          </span>
        </p>
      </div>

      <a class="panel-block"  v-for="item in dataItems.data" :key="item.id">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger ">
            <span class="panel-icon mt-1" aria-haspopup="true" aria-controls="dropdown-menu">
              <font-awesome-icon icon="cog" fixed-width/>
            </span>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a href="#" @click.prevent="openForm('show', item)" class="dropdown-item">
                <font-awesome-icon icon="eye" fixed-width/>
                show
              </a>
              <a href="#" @click.prevent="openForm('edit', item)" class="dropdown-item">
                <font-awesome-icon icon="edit" fixed-width/>
                edit
              </a>
              <a href="#" @click.prevent="openForm('delete', item)" class="dropdown-item">
                <font-awesome-icon icon="trash" fixed-width/>
                delete
              </a>
            </div>
          </div>
        </div>
        {{ item.name }}
      </a>

      <div class="panel-block">
        <Paginator :data="dataItems" @clicked="getItems" />
      </div>
    </div>
  </div>
</template>

<script>
import Paginator from '../../components/Pagination'

export default {
  components: {
    Paginator
  },

  data() {
    return {
      title: 'Categories',
      resource: 'categories',
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

  head() {
    return {
      title: this.title,

      meta: [
        {
          property: 'og:description',
          content: 'Esta pagina muestra todas las categorias para clasificar los productos de la tienda',
        },

        //linea 2
        {
          property: 'og:image',
          content: 'https://ichef.bbci.co.uk/news/1024/branded_mundo/4425/production/_114154471_sitges.jpg',
        },
      ]
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
    }

  }
}
</script>

<style>

</style>