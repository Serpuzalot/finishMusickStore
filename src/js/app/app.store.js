const Vue = require('vue');
const Vuex = require('vuex');
const Firebase = require('firebase/firebase');
const Axios = require('axios');
const { default: axios } = require('axios');
Vue.use(Vuex);


Firebase.initializeApp({
    apiKey: "AIzaSyCoUUFVnJa633rEgD2TyBaVXd5-_OzZgt0",
    authDomain: "storeforshop-46eb2.firebaseapp.com",
    projectId: "storeforshop-46eb2",
    storageBucket: "storeforshop-46eb2.appspot.com",
    messagingSenderId: "530501494737",
    appId: "1:530501494737:web:9f81a642b09dc54801a2f0",
    measurementId: "G-7ESBSX8PFM"
})

let db = Firebase.firestore();
// let nodemailer = require('../app/sendMail.js');

module.exports = new Vuex.Store({

    state: {
        category: [],
        products: [],
        slider: [],
        gallery: [],
        promotions: [],
        basket: [],
        brand: [],
        isUSD: true,
    },

    getters: {
        category(state) {
            return state.category;
        },
        products(state) {
            return state.products;
        },
        getSlider(state) {
            return state.slider;
        },
        getGallery(state) {
            return state.gallery;
        },
        getBaket(state) {
            return state.basket;
        },
        getPromotions(state) {
            return state.promotions;
        },
        getBrand(state) {
            return state.brand;
        },
        isUSD(state) {
            return state.isUSD
        }
    },

    mutations: {
        getCategory(state, payload) {
            state.category = payload;
        },
        getProducts(state, payload) {
            state.products = payload;
        },
        getSlider(state, payload) {
            state.slider = payload;
        },
        getGallery(state, payload) {
            state.gallery = payload;
        },
        setBasket(state, payload) {
            state.basket.push(payload);
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        getPromotions(state, payload) {
            state.promotions = payload;
        },
        getLS(state, payload) {
            state.basket = payload;
        },
        getBrand(state, payload) {
            state.brand = payload;
        },
        setUSD(state, payload) {
            state.products?.products?.forEach(product => product.price = Number(product.price) / payload)
        },
        setUAH(state, payload) {
            state.products?.products?.forEach(product => product.price = Number(product.price) * payload)
        },
        changeCurrency(state, payload) {
            state.isUSD = payload
        },
    },

    actions: {
        getCategory(context) {
            db.collection('category').doc('category').get()
                .then(function (response) {
                    context.commit('getCategory', response.data())
                })
        },
        getProducts(context) {
            db.collection('products').doc('product').get()
                .then(function (response) {
                    context.commit('getProducts', response.data())
                })
        },
        getSlider(context, payload) {
            db.collection('slider').doc('slide').get()
                .then(function (response) {
                    context.commit('getSlider', response.data());
                })
        },
        getGallery(context) {
            db.collection('gallery').doc('gallery').get()
                .then(function (response) {
                    context.commit('getGallery', response.data());
                })
        },
        setBasket(context, payload) {
            context.commit('setBasket', payload);
        },
        getPromotions(context, payload) {
            db.collection('promotions').doc('promotions').get()
                .then(function (response) {
                    context.commit('getPromotions', response.data());
                })
        },
        getLS(context) {
            if (localStorage.getItem('basket').length != 0) {
                context.commit('getLS', JSON.parse(localStorage.getItem('basket')))
            }
        },
        getBrand(context, payload) {
            db.collection('brand').doc('brand').get()
                .then(function (response) {
                    context.commit('getBrand', response.data());
                })
        },
        setUSD(context) {
            context.commit('setUSD', 27)
            context.commit('changeCurrency', true)
        },
        setUAH(context) {
            context.commit('setUAH', 27)
            context.commit('changeCurrency', false)
        },
        sendEmails() {
            axios.post('https://mailserver228.herokuapp.com/mail', {
                subject: 'LLL',
                message: 'OKKK'
            }).then(result => console.log(result.data)).catch(error => console.log(error))



            // let details = {
                
            // }
            // var formBody = [];
            // for (var property in details) {
            //     var encodedKey = encodeURIComponent(property);
            //     var encodedValue = encodeURIComponent(details[property]);
            //     formBody.push(encodedKey + "=" + encodedValue);
            // }
            // formBody = formBody.join("&");
        }
    }

})