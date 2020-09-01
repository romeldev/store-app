<template>
  <nav class="pagination is-centered is-small" role="navigation" aria-label="pagination">

    <a class="pagination-previous" 
      v-if="data.current_page > 1"
      @click.prevent="$emit('clicked', 1)">
      &#60;&#60;
    </a>

    <a class="pagination-previous" 
      v-if="data.current_page > 1"
      @click.prevent="$emit('clicked', data.current_page-1)">
      Previous
    </a>
    
    <ul class="pagination-list ">
      <li v-for="(page, keyp) in pages" :key="keyp">
        <a class="pagination-link" aria-label="Goto page 1"
          :class="page===data.current_page? 'is-current': ''"
          @click.prevent="$emit('clicked', page)"
          >{{page}}</a>
      </li>
    </ul>

    <a class="pagination-next" 
      v-if="data.current_page < data.last_page"
      @click.prevent="$emit('clicked', data.current_page+1)">
      Next
    </a>

    <a class="pagination-next" 
      v-if="data.current_page < data.last_page"
      @click.prevent="$emit('clicked', data.last_page)">
      &#62;&#62;
    </a>
  </nav>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      show_pages: 5,
    }
  },
  mounted () {
    
  },

  computed: {

    pages() {

      let first_page = 1;
      let last_page = this.data.last_page;
      let current_page = this.data.current_page;

      let pages = [];

      if( this.data.last_page === 1) return pages;

      if( last_page <= this.show_pages){
        for (let page = 1; page <= last_page; page++) pages.push(page)
      }else{
        let pivot = 2;
        let pivot_loop = 0;

        pages.push(current_page);
        
        while( pages[0] > first_page){
          pages.splice(0, 0, pages[0]-1)
          pivot_loop++;
          if (pivot_loop===pivot) break;
        }

        pivot = this.show_pages-pages.length;
        pivot_loop = 0;
        while( pages[pages.length-1] < last_page){
          pages.push(pages[pages.length-1]+1)
          pivot_loop++;
          if (pivot_loop===pivot) break;
        }

        while( pivot_loop < pivot)
        {
          pages.splice(0, 0, pages[0]-1)
          pivot_loop++
        }

      }
      return pages;
    },
  },

  methods: {
    
  }
}
</script>