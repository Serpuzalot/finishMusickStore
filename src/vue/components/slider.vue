<template>
    <section class="sliderContainer swiper-container" v-swiper="{
                loop: true,
                slidesPerView:1,
                pagination:{
                    el:'.swiper-pagination',
                    clickable:true,
                    dynamicBullets:true,
                },
                autoplay:{
                    delay:3000,
                    disableOnInteraction:false,
                }
            }">
        <div class="swiper-wrapper">
            <div  v-for="(slide,index) in slider" :key="index" class="slide swiper-slide"  :style="{background:'center / contain no-repeat url(' + slide.img + ') ',}">
            
            </div>

        </div>
        <div class="dots swiper-pagination"></div>
    </section>
</template>

<script>
module.exports = {
    data:function(){
        return {
          
        }
    },
    computed:{
        slider(){
            return this.$store.getters['getSlider'].slider;
        }
    }
}

</script>
