<template>
    <div class="global_container">
        <callBacked ref="feedBackModal"></callBacked>
        <div class="btn_call_back" @click="openFeedBack()">
            <span class="fas fa-phone"></span>
        </div>
        <headerSpa />        
        <main>
            <router-view />
        </main>
        <footerSpa />
    </div>
</template>

<script>
module.exports = {
    name:'index',
    data: function(){
        return {
           

        }
    },
    methods:{
        openFeedBack(){
            this.$refs.feedBackModal.openFeedBack();
        },
    },
    components:{
        'callBacked':require('./../vue/components/phone.vue'),
        'modalBasket':require('./../vue/components/basket.vue'),
        'footerSpa': require('./../vue/components/footer.vue'),
        'headerSpa':require('./../vue/components/header.vue')
    },
    created:function(){
        this.$store.dispatch('getCategory');
        this.$store.dispatch('getProducts');
        this.$store.dispatch('getSlider');
        this.$store.dispatch('getGallery');
        this.$store.dispatch('getPromotions');
        this.$store.dispatch('getLS');
        this.$store.dispatch('getBrand');
    },
}
</script>