<template>
    <nav class="pagination is-centered is-small" role="navigation" aria-label="pagination">

        <a class="pagination-previous" 
            v-if="current_page > 1"
            @click.prevent="$emit('clicked', 1)">
            &#60;&#60;
        </a>

        <a class="pagination-previous" 
            v-if="current_page > 1"
            @click.prevent="$emit('clicked', current_page-1)">
            Previous
        </a>
        
        <ul class="pagination-list ">
            <li v-for="(page, keyp) in pages" :key="keyp">
                <a class="pagination-link" aria-label="Goto page 1"
                    :class="page===current_page? 'is-current': ''"
                    @click.prevent="$emit('clicked', page)"
                    >{{page}}</a>
            </li>
        </ul>

        <a class="pagination-next" 
            v-if="current_page < last_page"
            @click.prevent="$emit('clicked', current_page+1)">
            Next
        </a>

        <a class="pagination-next" 
            v-if="current_page < last_page"
            @click.prevent="$emit('clicked', last_page)">
            &#62;&#62;
        </a>
        
    </nav>
</template>

<script>
export default {
    props: [ 'current_page', 'last_page' ],
    data () {
        return {
            show_pages: 5,
        }
    },

    computed: {

        pages() {
            let first_page = 1;
            let pages = [];

            if( this.last_page === 1) return pages;

            if( this.last_page <= this.show_pages){
                for (let page = 1; page <= this.last_page; page++) pages.push(page)
            }else{
                let pivot = 2;
                let pivot_loop = 0;

                pages.push(this.current_page);
                
                while( pages[0] > first_page){
                    pages.splice(0, 0, pages[0]-1)
                    pivot_loop++;
                    if (pivot_loop===pivot) break;
                }

                pivot = this.show_pages-pages.length;
                pivot_loop = 0;
                while( pages[pages.length-1] < this.last_page){
                    pages.push(pages[pages.length-1]+1)
                    pivot_loop++;
                    if (pivot_loop===pivot) break;
                }

                while( pivot_loop < pivot){
                    pages.splice(0, 0, pages[0]-1)
                    pivot_loop++
                }

            }
            return pages;
        },
    },
}
</script>