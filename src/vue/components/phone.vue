<template>
    <article class="modal_call_back_container" :class="{'active':openFeedBackModal}">
        <div class="overlay" @click="closeFeedBackModal()"></div>
        <div class="modal_call_back">
            <h3>Наши контакты</h3>
            <ul>
                <li>
                    +138 909 93 03
                </li>
                 <li>
                    +138 909 93 03
                </li>
                 <li>
                    +138 909 93 03
                </li>
            </ul>

            <div class="feed_back">
                <h4>Хотите мы вам перезвоним ?</h4>
               <div class="row">
                    <label for="">Введите Ваше Имя*</label>
                    <input type="text" placeholder="Введите ваше имя" name="firstname">
                </div>
                <div class="row">
                    <label for="">Введите Ваш номер телефона*</label>
                    <input type="text" placeholder="Введите ваш номер телефона" name="phone">
                </div>
                <div class="btn_submit">
                    <button @click="sendEmail()">Заказать звонок</button>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
module.exports = {
    data(){
        return{
            openFeedBackModal:false,
        }
    },
    methods:{
        openFeedBack(){
            this.openFeedBackModal = true;
        },
        closeFeedBackModal(){
            this.openFeedBackModal = false;
        },
        sendEmail(){
            this.$store.dispatch('sendEmails');
        }
    }
}
</script>