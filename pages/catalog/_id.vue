<template>
    <div class="box">
        <div class="columns">
            <div class="column is-half">
                <section class="hero is-medium has-carousel">
                    <div class="hero-carousel" id="slider">
                        <div class='has-background' v-for="photo in item.photos" :key="photo.id">
                            <img class="is-background" :src="photo.url" alt="" />
                        </div>
                    </div>
                   
                    <div class="hero-body has-text-centered">
                    </div>
                </section>
            </div>


            <div class="column is-half">
                <p class="is-size-4">{{item.name | capitalize }}</p>
                <p class="has-text-justified">{{item.descrip | capitalize}}</p>
                <br>
                <div class="field is-horizontal">
                    <div class="control mr-3">
                        <div class="select">
                            <select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>

                    <div class="control" style="width:100%">
                        <button class="button is-info is-fullwidth">ADD TO CARD</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

    data() {
        return {
            title: 'product',
            item: {},
            meta: []
        }
    },

    head() {
        let head = {}
        head.title = this.item.name
        
        head.meta = [{
            property: 'og:description',
            content: this.item.descrip
        }]

        this.item.photos.forEach(photo => {
            head.meta.push({
                property: 'og:image',
                content: photo.url
            })
        })
        return head
    },

    async asyncData({  app, params, store }) {
        let item =  await store.dispatch('catalog/getDataItem', params)
        item = item.data.data;
        return { item }
    },

    mounted() {
        bulmaCarousel.attach('#slider', {
            slidesToScroll: 1,
            slidesToShow: 1,
            // navigation: true,
            loop: true,
            // effect: 'fade',
        });
    }
}
</script>

<style>

</style>