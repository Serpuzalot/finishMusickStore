<template>
    <div class="list_products">
        <div class="wrapper">
            <div class="live_sort">
                <div class="btn_sort" @click="sortParam ='minPrice'">
                    от меньшего к большему
                    <span class="fas fa-arrow-up"></span>
                </div>
                <div class="btn_sort" @click="sortParam ='maxPrice'">
                    от большего к меньшему
                    <span class="fas fa-arrow-down"></span>
                </div>
            </div>
            <div class="cards_box">
                <article class="card_product" v-for="(product,index) in testSort" :key="index">
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
                </article>
            </div>
            <p v-if="products.length === 0 "> Товар отсутвует</p> 
            <div class="pagination">
                <ul>
                    <li v-for="(page,index) in pagination.pages" :key="index" @click="setPage(page)">{{page}}</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
let sortPriceMinimum = function (a, b) { return a.price - b.price };
let sortPriceMaximum = function (a, b) { return b.price - a.price };
module.exports = {
    name:'listProducts',
    data:function(){
        return{
            isActive:false,
            perPage:20,
            pagination:{},
            sortParam:'',
        }
    },
    computed:{
        selectCategory(){
            return [this.$route.params.mainCategory,this.$route.params.extraCategory];
        },
        products(){
            let getProduct = this.$store.getters['products'].products;
            return getProduct.filter((product)=>{
                if(product.category[0] == this.selectCategory[0] && product.category[1] == this.selectCategory[1]){
                    return true  
                } else {
                    return false
                }
            });
        },
        itemsBasket(){
            return this.$store.getters['getBaket'];
        },
        brand(){
            return this.$store.getters['getBrand'].brand;
        },
        isUSD() {
            return this.$store.getters['isUSD'];
        },
        testSort(){
            switch(this.sortParam){
                case 'minPrice' : return this.paginate(this.products.sort(sortPriceMinimum));
                case 'maxPrice' : return this.paginate(this.products.sort(sortPriceMaximum));
                default : return this.paginate(this.products); 
            }
        }
    },
    methods:{
        moveToBasket(item){
            this.$store.dispatch('setBasket',item)
        },
        setPage(page){
            this.pagination = this.paginator(this.products.length, page)
        },
        paginate(products){
            let test = products.slice(this.pagination.startIndex,this.pagination.endIndex + 1);
            return test;
        },
        paginator(totalItems,currentPage){
            let startIndex =(currentPage -1) * this.perPage;
            let endIndex = Math.min(startIndex + this.perPage - 1, totalItems -1 );

            return {
                currentPage: currentPage,
                startIndex:startIndex,
                endIndex:endIndex,
                pages:Math.ceil(totalItems/this.perPage)
            }
        },
    },
    mounted(){
        this.setPage(1)
    }
}
</script>

