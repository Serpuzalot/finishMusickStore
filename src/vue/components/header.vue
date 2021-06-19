<template>
    <header>
        <modalBasket ref="basketModal" ></modalBasket>
        <nav>
            <div class="wrapper">
                <div class="section_logo">
                    <h1 class="logo"><router-link :to="{name:'mainpage'}"> tartuga</router-link></h1>
                    <ul class="navigation">
                        <li><router-link :to="{name:'gallery'}">Галерея</router-link></li>
                        <li><router-link :to="{name:'gallery'}">Бренды</router-link></li>
                        <li><router-link :to="{name:'blog'}">Блог</router-link></li>
                        <li><router-link :to="{name:'warranty'}">Гарантия</router-link></li>
                        <li><router-link :to="{name:'delivery'}">Оплата и Доставка</router-link></li>
                        <li><router-link :to="{name:'company'}">О нас</router-link></li>
                    </ul>
                </div>
            </div>
        </nav>
        <section >
            <div class="wrapper">
                <div class="fixed_header">
                    <div class="dropdown_category" :class="{active:drop}">
                        <div class="drop_container">
                            <a class="drop_btn" @click="dropdown()">
                                <span class="burger_menu">
                                    <span class="line_menu v1"></span>
                                    <span class="line_menu v2"></span>
                                </span>
                                <span class="xc">Каталог товаров</span>
                            </a>
                        </div>
                        <div class="drop_menu">
                            <ul>
                                <li v-for="(category,index) in category" :key="index" @click="dropUp()">
                                <router-link :to="{name:'subcategory',params:{id:index}}">
                                    {{category.name}}
                                </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="all_block">
                        <div class="search">
                            <input type="text" v-model="value" @click="openList()">
                            <span class="fas fa-search"></span>
                            <div class="drop_list" v-if="filterProduct" :class="{active:isOpen}">
                                <ul>
                                    <li v-for="(item,index) in filterProduct" :key="index">
                                        <router-link :to="{name:'product',params:{code:item.artikl}}">{{item.name}}</router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="basket">
                            <span @click="openBasket()"><span class="fas fa-shopping-bag"><span class="count_item" v-show="basket.length != 0">{{basket.length}}</span></span></span>
                        </div>
                        <div class="currency">
                            <span @click="resetPrice()" class="fas fa-dollar-sign"></span>
                            <span @click="updatePrice()" class="fas fa-hryvnia"></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </header>
</template>

<script>
module.exports = {
    data(){
        return {
            drop:false,
            isOpen:false,
            value:'',
            isOpenBasket:false,
        }
    },
    methods:{
       dropdown(){
            this.drop = !this.drop
        },
        openList(){
            this.isOpen = !this.isOpen
        },
        openBasket(){
            this.$refs.basketModal.openBasket();
        },
        
        dropUp(){
            this.drop = false;
        },
        resetPrice(){
            if(!this.isUSD) {
                this.$store.dispatch('setUSD')
            }
        },
        updatePrice(){
           if(this.isUSD) {
                this.$store.dispatch('setUAH')
            }
        }
    },
    computed:{
        category(){
            return this.$store.getters['category'].category;
        },
        products(){
            return this.$store.getters['products'].products;
        },
        filterProduct(){
            if(this.products != undefined){
                return this.products.filter((element) => {
                    if(element.name.indexOf(this.value) != -1){
                        return true
                    }else{
                        return false
                    }
                }) 
            }
        },
        basket(){
            console.log(this.$store.getters['getBaket'] )
           return this.$store.getters['getBaket'] 
        },
        isUSD() {
            return this.$store.getters['isUSD'];
        },
    },
    components:{
        'modalBasket':require('./../components/basket.vue')
    }
}

</script>
