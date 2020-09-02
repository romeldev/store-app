import axios from 'axios'
axios.defaults.baseURL = process.env.API_URL

export const state = () => ({
    count: 1,
    items: [
        { id: 1, name: 'product #1' },
        { id: 2, name: 'product #2' },
        { id: 3, name: 'product #3' },
    ]
})

// calcular el estado derivado en función del estado de la tienda
export const getters = {
    getDataItems:  (state) => (page) => {
        return "list of items per page: "+page
    }
}


// La única forma de cambiar el estado en una tienda Vuex es realizando una mutación
// Las mutaciones deben ser sincrónicas
export const mutations = {
    increment( state, amount=1 ) {
        state.count = state.count+amount
    }
}

// Las acciones cometen muaciones
// Las acciones pueden ser asincronicas
// El 'context' expone: context.commit, context.state, context.getters, context.dispatch
export const actions = {
    increment (context, amount=1) {
        context.commit('increment', amount)
    },

    getDataItems(context, params) {
        return new Promise( (resolve, reject) => {
            axios.get('catalog', {params})
            .then( res => {
                resolve(res)
            })
            .catch( err => {
                reject(err)
            })
        })
    },

    getDataItem(context, params) {
        return new Promise( (resolve, reject) => {
            axios.get(`catalog/${params.id}`)
            .then( res => {
                resolve(res)
            })
            .catch( err => {
                reject(err)
            })
        })
    }
}
