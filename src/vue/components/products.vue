<template>
  <section class="hot_position">
    <div class="wrapper">
      <div class="title_hot_product">
        <h2>Горячие предложения</h2>
      </div>
      <div class="navigation_hot_prodouct">
        <button @click="popularProduct()" :class="{ active: isPopular }">
          популярное
        </button>
        <button @click="hitProduct()" :class="{ active: isHit }">
          хиты продаж
        </button>
        <button @click="recommendProduct()" :class="{ active: isRecommend }">
          рекомендуем
        </button>
      </div>
      <div
        class="hot_container swiper-container"
        v-swiper="{
          loop: true,
          slidesPerView: 4,
          spaceBetween: 30,
          observer: true,
          observeParents: true,
          observeSlideChildren: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        }"
      >
        <div class="swiper-wrapper">
          <div
            class="hot_product_card swiper-slide"
            v-for="(product, index) in hotProducts"
            :key="index"
          
          >
            <div class="product">
                <router-link
                    :to="{
                    name: 'selectProduct',
                    params: { code: product.artikl },
                    }"
              >
                <img :src="product.img[0].url" alt="" />
                <h3>
                  {{
                    product.name.length >= 55
                      ? product.name.slice(0, 55) + "..."
                      : product.name
                  }}
                </h3>
                <p v-if="product.rebate">Скидка: {{ product.rebate }}%</p>
                <div class="brand" v-for="(elem, index) in brand" :key="index">
                  <img v-if="elem.name == product.brand" :src="elem.img" />
                </div>
              </router-link>
              <span class="by_price">
                <span class="old_price"
                  ><span
                    :class="{ 'fa-dollar-sign': isUSD, 'fa-hryvnia': !isUSD }"
                    class="fas"
                  ></span
                  >{{ product.price }}</span
                >
                <span class="new_price"
                  ><span
                    :class="{ 'fa-dollar-sign': isUSD, 'fa-hryvnia': !isUSD }"
                    class="fas"
                  ></span
                  >{{
                    Number.parseInt(product.price) -
                    (Number.parseInt(product.price) *
                      Number.parseInt(product.rebate)) /
                      100
                  }}</span
                >
              </span>
              <div
                class="btn"
                @click="moveToBasket(product)"
                v-if="!itemsBasket.some((el) => el.artikl == product.artikl)"
              >
                <span class="btn_buy"
                  ><span class="fas fa-shopping-cart"></span> Купить</span
                >
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
  data: function () {
    return {
      products: [],
      isHit: false,
      isPopular: true,
      isRecommend: false,
      isVisible: {
        hit: false,
        popular: true,
      },
    };
  },
  computed: {
    brand() {
      return this.$store.getters["getBrand"].brand;
    },
    hotProducts() {
      let storeProducts = this.$store.getters["products"].products;
      if (storeProducts != undefined)
        return storeProducts.filter((el) => {
          if (this.isVisible.hit === true) {
            return el.hit;
          } else if (this.isVisible.popular === true) {
            return el.popular;
          } else {
            return el.recommend;
          }
        });
    },
    itemsBasket() {
      return this.$store.getters["getBaket"];
    },
    isUSD() {
      return this.$store.getters["isUSD"];
    },
  },
  methods: {
    hitProduct() {
      this.isVisible.hit = true;
      this.isVisible.popular = false;
    },
    popularProduct() {
      this.isVisible.hit = false;
      this.isVisible.popular = true;
    },
    recommendProduct() {
      this.isVisible.hit = false;
      this.isVisible.popular = false;
    },
    moveToBasket(item) {
      this.$store.dispatch("setBasket", item);
    },
  },
};
</script>