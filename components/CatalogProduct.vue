<template>
    <a href="#" @click.prevent="goProduct()">
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img :src="item.image" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <!-- <div class="media has-background-info"> -->
                <div class="media">
                    <div class="media-content">
                        <p class="title is-5">{{item.name}}</p>
                        <p class="subtitle is-6">@brand</p>
                    </div>
                </div>

                <!-- <div class="content has-background-warning"> -->
                <div class="content">
                    <h6 v-if="item.price_ref!=null" class="has-text-grey-light">
                        <strike>$/.{{ item.price_ref }}</strike>
                        <span class="tag is-success">-{{ parseFloat(item.discount).toFixed(0)}} %</span>
                    </h6>
                    <h5 :class="item.price_ref!=null? 'has-text-danger': ''">
                        S/.{{item.price}}
                    </h5>

                    <!-- <span class="button is-success is-rounded">
                        <strong>Buy now →</strong>
                    </span> -->
                </div>
            </div>
        </div>
        
    </a>
</template>

<script>
export default {
    props: ['item'],

    methods: {
        goProduct() {
            this.$router.push({ name: 'catalog-id', params: {id: this.item.id} })
        }
    }
}
</script>

<style scoped>

    .card-content {
        height: 200px;
    }

    .media {
        min-height: 70px;
    }
    .content {
        min-height: 60px;
    }

    
</style>