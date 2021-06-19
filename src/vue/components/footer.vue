<template>
    <footer>
        <div class="wrapper">
            <div class="content_footer">
                <div class="left_footer_bar">
                    <ul>
                        <li><router-link :to="{name:'company'}">О нас</router-link></li>
                        <li><router-link :to="{name:'gallery'}">Галерея</router-link></li>
                        <li><router-link :to="{name:'gallery'}">Гарантия</router-link></li>
                        <li><router-link :to="{name:'delivery'}">Оплата и Доставка</router-link></li>             
                        <li><router-link :to="{name:'gallery'}">Бренды</router-link></li>
                        <li><router-link :to="{name:'promotions'}">Акции</router-link></li>
                        <li><router-link :to="{name:'blog'}">Блог</router-link></li>
                    </ul>
                </div>
                <div class="right_footer_bar">
                    <div class="social">
                        <h4>Наши социальные сети :</h4>
                        <div class="icons">
                            <a href=""><span class="fab fa-instagram"></span></a>
                            <a href=""><span class="fab fa-telegram"></span></a>
                            <a href=""><span class="fab fa-facebook"></span></a>
                            <a href=""><span class="fab fa-youtube"></span></a>
                        </div>
                    </div>
                    <div class="time_work">
                        <div class="weekdays">
                            <p>Понедельник - Суббота</p>
                            <span>с 9:00 до 18:00</span>
                        </div>
                    </div>
                    <h3><router-link :to="{name:'mainpage'}"> tartuga</router-link></h3>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
module.exporst = { 
    data(){
        return{

        }
    }
}
</script>