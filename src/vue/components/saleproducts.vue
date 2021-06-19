<template>
    <section class="profitable_offer">
        <div class="wrapper">
            <div class="profitable_title">
                <h2>Выгодные предложения</h2>
            </div>
            <div class="profitable_navigation">
                <button @click="saleProduct()" :class="{'active':isSales}">Скидки</button>
                <button @click="discountProduct()" :class="{'active':isDiscount}">Расспродажи</button>
                   
            </div>
            <div class="sales_container swiper-container" v-swiper="{
                    loop: true,
                    slidesPerView:4,
                    spaceBetween:30,
                    observer:true,
                    observeParents:true,
                    observeSlideChildren:true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },}" :class="{'active':isSales}" ref="a1">
                <div class="swiper-wrapper">
                    <div class="profitable_card swiper-slide" v-for="(product,index) in salesProduct" :key="index" >
                        <div class="product">
                            <router-link :to="{name:'selectProduct',params:{code:product.artikl}}">
                                <img :src="product.img[0].url" alt="">
                                <h3>{{product.name.length >= 55 ? product.name.slice(0,55) + "..." : product.name}}</h3>
                                <p v-if="product.rebate">Скидка: {{ product.rebate }}%</p>
                                <div class="brand" v-for="(elem,index) in brand" :key="index">
                                    <img v-if="elem.name == product.brand" :src="elem.img">
                                    
                                </div>
                            </router-link>
                            <span class="by_price">
                                <span class="old_price"><span  :class="{'fa-dollar-sign':isUSD, 'fa-hryvnia':!isUSD}" class="fas"></span>{{product.price}}</span>
                                <span class="new_price"><span  :class="{'fa-dollar-sign':isUSD, 'fa-hryvnia':!isUSD}" class="fas"></span>{{Number.parseInt(product.price) - (Number.parseInt(product.price) * Number.parseInt(product.rebate)/100)}}</span>
                            </span>
                            <div class="btn" @click="moveToBasket(product)" v-if="!itemsBasket.some(el => el.artikl == product.artikl)">
                                <span class="btn_buy"><span class="fas fa-shopping-cart"></span> Купить</span>
                            </div>
                            <span v-else>товар в корзине</span>
                        </div>
                    </div>
                </div>
                <div class="swiper-button-prev fas fa-arrow-alt-circle-left"></div>
                <div class="swiper-button-next fas fa-arrow-alt-circle-right"></div>
            </div>
             <div class="discounts_container swiper-container" v-swiper="{
                    loop: true,
                    slidesPerView:4,
                    spaceBetween:30,
                    observer:true,
                    observeParents:true,
                    observeSlideChildren:true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },}" :class="{'active':isDiscount}" ref="a2">
                <div class="swiper-wrapper">
                    <div class="profitable_card swiper-slide" v-for="(product,index) in discountsProducts" :key="index">
                        <div class="product">
                            <router-link :to="{name:'selectProduct',params:{code:product.artikl}}">
                                <img :src="product.img[0].url" alt="">
                                <h3>{{product.name.length >= 55 ? product.name.slice(0,55) + "..." : product.name}}</h3>
                                <p v-if="product.rebate">Скидка: {{ product.rebate }}%</p>
                                <div class="brand" v-for="(elem,index) in brand" :key="index">
                                    <img v-if="elem.name == product.brand" :src="elem.img">
                                    
                                </div>
                            </router-link>
                            <span class="by_price">
                                <span class="old_price"><span  :class="{'fa-dollar-sign':isUSD, 'fa-hryvnia':!isUSD}" class="fas"></span>{{product.price}}</span>
                                <span class="new_price"><span  :class="{'fa-dollar-sign':isUSD, 'fa-hryvnia':!isUSD}" class="fas"></span>{{Number.parseInt(product.price) - (Number.parseInt(product.price) * Number.parseInt(product.rebate)/100)}}</span>
                            </span>
                            <div class="btn" @click="moveToBasket(product)" v-if="!itemsBasket.some(el => el.artikl == product.artikl)">
                                <span class="btn_buy"><span class="fas fa-shopping-cart"></span> Купить</span>
                            </div>
                            <span v-else>товар в корзине</span>

                         </div>
                    </div>
                </div>
                <div class="swiper-button-prev fas fa-arrow-alt-circle-left"></div>
                <div class="swiper-button-next fas fa-arrow-alt-circle-right"></div>
            </div>
        </div>
    </section>
</template>   

<script>
module.exports = {
    data:function(){
        return {
            products:[],
            isSales:true,
            isDiscount:false,
        }
    },
    methods:{
        saleProduct(){
            this.isSales =  true;
            this.isDiscount = false;
        },
        discountProduct(){
            this.isDiscount = true;
            this.isSales =  false;
        },
        moveToBasket(item){
            this.$store.dispatch('setBasket',item)
        },
        
    },
    computed:{
        brand(){
            return this.$store.getters['getBrand'].brand
        },
        salesProduct(){
            let storeProducts = this.$store.getters['products'].products;
            
            if(storeProducts != undefined){
                
                let fileredProduct = storeProducts.filter(el => {
                    if(el.sales === true){
                        return true
                    } else {
                        return false
                    }    

                })
                return fileredProduct
            }
        },
        discountsProducts(){
            let storeProducts = this.$store.getters['products'].products;
            
            if(storeProducts != undefined){
                
                let fileredProduct = storeProducts.filter(el => {
                    if(el.discounts === true){
                        return true
                    } else {
                        return false
                    }    

                })
                return fileredProduct
            }
        },
        itemsBasket(){
            return this.$store.getters['getBaket'];
        },
        isUSD() {
            return this.$store.getters['isUSD'];
        },
    },
    
  
    
}
</script>