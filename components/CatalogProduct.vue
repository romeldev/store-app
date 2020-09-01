<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img :src="imageItem" alt="Placeholder image">
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
</template>

<script>
export default {
    props: ['item'],

    computed: {
        imageItem: function()
        {
            if( this.item.photos.length > 0){
                return this.item.photos[0].url
            }
            return 'https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png'
        }
    },

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