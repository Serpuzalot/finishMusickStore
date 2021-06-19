<template>
    <article class="order_form">
        <div class="wrapper">
            <h3>Оформление заказа</h3>
            <div class="order_content">
                <div class="left_order_bar">
                    <form action="">
                        <div class="colum">
                            <div class="row">
                                <label for="">Введите Ваше Имя*</label>
                                <input type="text" placeholder="Введите ваше имя" name="firstname">
                            </div>
                            <div class="row">
                                <label for="">Введите Вашу Фамилию*</label>
                                <input type="text" placeholder="Введите вашу фамилию" name="lastname">
                            </div>
                        </div>
                        <div class="colum">
                            <div class="row">
                                <label for="">Укажите Ваш Город*</label>
                                <input type="text" placeholder="Введите Ваш город" name="city">
                            </div>
                            <div class="row">
                                <label for="">Укажите почтовое отделение*</label>
                                <input type="text" placeholder="Почтовое отделение" name="lastname">
                            </div>
                        </div>
                        <div class="email">
                            <label for="">email*</label>
                            <input type="text" placeholder="Email" name="email">
                        </div>
                        <div class="comments">
                            <label for="">comments</label>
                            <textarea name="comments" id="" cols="30" rows="10" placeholder="Comments"></textarea>
                        </div>
                        <div class="btn_submit">
                            <button>Оформить заказ</button>
                        </div>
                    </form>
                </div>
                <div class="right_order_bar">
                    <ul>
                        <li v-for="(item,index) in basket" :key="index">
                            <div class="item">
                                <div class="item_img" :style="{background:'center / contain no-repeat url(' + item.img[0].url + ') ',}"></div>
                                <div class="item_description">
                                    <div class="item_header">
                                        <h3>{{item.name}}</h3>
                                        <span class="fas fa-ban" @click="deleteItem(index)"></span>
                                    </div>
                                    <div class="item_footer">
                                        <div class="counter">
                                            <span class="fas fa-minus" 
                                            v-show="item.counter != 1"
                                            @click="item.counter--">
                                            </span>
                                            <input v-model="item.counter">
                                            <span class="fas fa-plus" @click="item.counter++"></span>
                                        </div>
                                        <span :class="{'fa-dollar-sign':isUSD, 'fa-hryvnia':!isUSD}" class="fas">{{Number.parseInt(item.price)* Number.parseInt(item.counter) }}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <span>Итоговая сумма заказа {{totalPrice}} </span>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
module.exports ={
    data(){
        return{
            
        }
    },
    computed:{
        basket(){
            return this.$store.getters['getBaket'];
        },
        isUSD() {
            return this.$store.getters['isUSD'];
        },
        totalPrice(){
            let basket = this.basket;
            let totalPrice = 0;
            basket.forEach(item => {
                totalPrice += item.price*item.counter;
            });

            return totalPrice
        }
    },
    methods:{
        deleteItem(indexItem){
            this.basket.splice(indexItem,1);
            localStorage.setItem('basket',JSON.stringify(this.itemBasket));
        },
    }
}
</script>