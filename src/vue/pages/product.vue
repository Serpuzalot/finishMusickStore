<template>
    <article class="select_product">
        <div class="wrapper">
            <div class="header_product">
                <div class="left_bar">
                    <div class="product_photo">
                        <div class="image_dublicate_box swiper-container" v-swiper="{
                                slidesPerView:1,
                                
                            }">
                            <div class="image_dublicate_wrapper swiper-wrapper">
                                <div class="photo_dublicate swiper-slide"  v-for="(img,index) in product.img" :key="index">
                                    <img :src="img.url" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="image_box swiper-container" v-swiper="{
                        thumbs:{
                                    swiper:{
                                        el:'.image_dublicate_box',
                                        slidesPerView:product.img.length,
                                        direction:'vertical'
                                    }
                                }
                        }">
                            <div class="image_wrapper swiper-wrapper">
                                <div class="photo_image_box swiper-slide"  v-for="(img,index) in product.img" :key="index">
                                    <img :src="img.url" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right_bar">
                    <h3 class="name_product">{{product.name}}</h3>
                    <div class="colum_wrap">
                        <div class="colum_left">
                            <span class="product_available" v-if="product.available"><span class="fas fa-check"></span> Есть в наличие</span>
                            <span class="old_price">{{product.price}} <span class="fas fa-dollar-sign"></span></span>
                            <span class="new_price">{{Number.parseInt(product.price) - (Number.parseInt(product.price) * product.rebate / 100)}} <span class="fas fa-dollar-sign"></span></span>
                            <a @click="setToBasket(product)" v-if="!itemsBasket.some(el => el.artikl == product.artikl)"><span class="fas fa-shopping-cart"></span> купить</a>
                            <span v-else>товар в корзине</span>
                        </div>  
                        <div class="colum_right" >
                            <div class="accordion" :class="{'openAccordion':item.isOpenAccordion}" v-for="(item,index) in accordion" :key="index">
                                <h3 @click="toggleAccrdion(index)"><span :class="item.icon"></span> {{item.title}} <span :class="item.arrows"></span></h3>
                                <div class="accordion_message">
                                    <ul>
                                        <li v-for="(elemList,index) in item.description" :key="index">{{elemList}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="footer_product">
                <div class="title_footer_product">
                    <h4>Характеристики</h4>
                </div>
                <div class="descrip" v-html="product.description"></div>
            </div>
        </div>
    </article>
</template>

<script>
module.exports = {
    data:function(){
        return{
            accordion:[{
                title:'Наши Преимущества',
                arrows:'fas fa-chevron-right',
                icon:'fas fa-check-circle',
                isOpenAccordion:true,
                description:['Гибкая система скидок','Официальная гарантия','Отправка в день заказа','Возврат и обмен в течении 14 дней в соответсвии закона Украины о защите прав потребителей '],
            },{
                title:'Способы Доставки',
                arrows:'fas fa-chevron-right',
                icon:'fas fa-truck',
                isOpenAccordion:false,
                description:['Курьерская доставка по Одессе от 200 грн - бесплатно','Грузоперевозчиком по всей Украине от 4,000 грн - бесплатно'],
            },{
                title:'Варианты оплаты',
                arrows:'fas fa-chevron-right',
                icon:'fab fa-amazon-pay',
                isOpenAccordion:false,
                description:['Наложенный платеж','Приват24','VISA','MASTERCARD'],
            }],

        }
    },
    computed:{
        product(){
            let product = this.$store.getters['products'].products;
            return product.filter(product => product.artikl === this.selectProduct ? true : false)[0];
        },
        selectProduct(){
            return this.$route.params.code;
        },
        itemsBasket(){
            return this.$store.getters['getBaket'];
        },
    },
    methods:{
        setToBasket(item){
            this.$store.dispatch('setBasket',item);
        },
        toggleAccrdion(id){
            this.accordion[id].isOpenAccordion = !this.accordion[id].isOpenAccordion
        }
    },
}
</script>