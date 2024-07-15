<script>
import axios from "axios";
import BrandPlaceholder from "@/components/UI/ImagePlaceholder.vue";
import TextProductPlaceholder from "@/components/UI/TextProductPlaceholder.vue";
import StringProductPlaceholder from "@/components/UI/StringProductPlaceholder.vue";
import { API_BASE_URL } from '@/components/config/config';
import HeaderMain from "@/components/main/HeaderMain.vue";

export default {
  name: "ShopProduct",
  props: {
    id: {
      type: String,
      required: false
    }
  },
  components: {HeaderMain, StringProductPlaceholder, TextProductPlaceholder, BrandPlaceholder},
  created() {
    this.fetchProductData();
  },

  data() {
    return {
      isShippingOpen: false,
      selectedProduct: [],
      isLoading: true,
      products: [],
    }
  },
  methods: {
    toggleShipping() {
      this.dropdownToggled = true;
      this.isShippingOpen = !this.isShippingOpen;
    },

    async fetchProductData() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${API_BASE_URL}/product/${this.$route.params.id}`);

          this.selectedProduct = response.data;
          console.log(this.selectedProduct)
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        this.isLoading = false;
      }
    },

    updateSearchQuery(query) {
      console.log('updateSearchQuery called', query);
      this.$router.replace({ path: '/search', query: { q: query } });
      this.searchQuery = query;
    },

    handleBeforeLeave(el) {
      el.style.animation = 'fadeOut 0.3s forwards';
    }
  },
}
</script>

<template>
  <HeaderMain @update-search-query="updateSearchQuery"/>
  <div class="page-wrapper">
    <div>
      <div class="product-info">
        <div class="product-images">

          <div id="first-section-wrapper" class="mobile">
            <div v-if="isLoading" class="products-container">
              <BrandPlaceholder style="height: 500px; display: flex; width: calc(100vw - 62px);"/>
            </div>
            <img v-if="!isLoading" :src="this.selectedProduct?.images[0]" alt="product-image-1" id="main-image">
          </div>
          <div class="product-images-controller" id="product-images-controller">
          </div>
          <div  class="main-image desktop">
            <div v-if="isLoading" class="products-container">
              <BrandPlaceholder style="height: 500px;"/>
            </div>
            <img v-if="!isLoading" :src="this.selectedProduct?.images[0]" alt="product-image-1" id="main-image">
          </div>
        </div>
        <div>
          <div class="product-title">
            <div v-if="isLoading" class="products-container">
              <TextProductPlaceholder style="width: auto;"/>
            </div>
            <p class="product-author" v-if="!isLoading">{{ this.selectedProduct?.brand }}</p>
            <h1 class="product-name" v-if="!isLoading">{{ this.selectedProduct?.title }}</h1>
            <div class="product-price" v-if="!isLoading">
              <p class="price">${{ this.selectedProduct?.price }}</p>
            </div>
          </div>
          <div class="product-colors">
            <div v-if="isLoading" class="products-container" style="width: 100%;">
              <StringProductPlaceholder style="padding-bottom: 10px;"/>
            </div>
            <div class="current-color" v-if="!isLoading">
              <span>Information: &nbsp;{{ this.selectedProduct?.warrantyInformation }}</span>
            </div>
          </div>
          <div class="product-size">
            <div class="select-size">
              <div class="current-value">{{ this.selectedProduct?.availabilityStatus }}</div>
            </div>
          </div>
          <div>
            <div class="section-with-hiding" style=" cursor: pointer;">
              <p @click="toggleShipping">
                <span>Shipping & Returns</span>
                <img :class="{ rotate: isShippingOpen, 'no-rotate': !isShippingOpen }" src="../../assets/icons/chevron-down.svg" alt="chevron-down"/>
              </p>
              <transition name="modal-fade" @before-leave="handleBeforeLeave">
              <p v-if="isShippingOpen" :class="{ open: isShippingOpen, close: !isShippingOpen }" class="text">
                North American orders are shipped within 1-2 business days. You will receive an automatic dispatch email
                containing your tracking information once your order has shipped.
                Our ultimate priority is your happiness with your product and the experience on our website. If you order
                a product that does not fit or match your expectations, you can return the product within 30 days in the
                original condition with no questions asked. Please email us to start a return/exchange process.
              </p>
              </transition>
            </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes heartExplosion {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

@keyframes slideDown {
  0% {
    max-height: 0;
    opacity: 0;
  }
  100% {
    max-height: 500px;
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    max-height: 500px;
    opacity: 1;
  }
  100% {
    max-height: 0;
    opacity: 0;
  }
}

.open {
  animation: slideDown 0.5s forwards;
}

.close {
  animation: slideUp 0.5s forwards;
}
.rotate {
  transform: rotate(180deg);
  transition: transform 0.5s;
}

.no-rotate {
  transition: transform 0.5s;
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-products > div > .product-image {
  object-fit: contain;
  width: 12.437em;
  height: 200px;
}

.product-image > author:hover{
  text-decoration: underline;
}

.modal.fade .modal-dialog {
  -webkit-transition: -webkit-transform .3s ease-out;
  transition: -webkit-transform .3s ease-out;
  -o-transition: transform .3s ease-out;
  transition: transform .3s ease-out;
  transition: transform .3s ease-out, -webkit-transform .3s ease-out;
  -webkit-transform: translate(0, -50px);
  -ms-transform: translate(0, -50px);
  transform: translate(0, -50px)
}

@media (prefers-reduced-motion: reduce) {
  .modal.fade .modal-dialog {
    -webkit-transition: none;
    -o-transition: none;
    transition: none
  }
}

.modal.show .modal-dialog {
  -webkit-transform: none;
  -ms-transform: none;
  transform: none
}

.modal.modal-static .modal-dialog {
  -webkit-transform: scale(1.02);
  -ms-transform: scale(1.02);
  transform: scale(1.02)
}

.modal-dialog-scrollable .modal-content {
  max-height: -webkit-calc(100vh - 1rem);
  max-height: calc(100vh - 1rem);
  overflow: hidden
}

.modal-dialog-scrollable .modal-footer, .modal-dialog-scrollable .modal-header {
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0
}

.modal-dialog-scrollable .modal-body {
  overflow-y: auto
}

.modal-dialog-centered.modal-dialog-scrollable .modal-content {
  max-height: none
}

.modal-header .close {
  padding: 1.5rem 2rem;
  margin: -1.5rem -2rem -1.5rem auto
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}
.modal-footer > * {
  margin: .25rem
}

.product-info {
  display: grid;
  grid-template-columns: 1fr 29.375em;
  gap: 2em;
  margin-bottom: 2em;
}

.product-images {
  display: grid;
  grid-template-columns: 6.875em 1fr;
  gap: 1em;
}

.left-side-images img {
  width: 100%;
  margin-bottom: 0.75em;
}

.left-side-images img.active {
  border: 1px solid #111111;
}

.main-image img {
  width: 100%;
  height: 500px;
  object-fit: contain;
}

.product-title .product-name {
  font-size: 2em;
}

.product-price .price {
  font-size: 1.75em;
  font-weight: 500;
  letter-spacing: -0.6px;
}

.product-price {
  display: flex;
  gap: 1em;
  align-items: center;
}

.product-price {
  color: white;
  font-size: 0.875em;
  display: flex;
  align-items: center;
  height: 52px;
}

.product-title {
  margin-bottom: 2.5em;
}

.product-details div span {
  text-decoration: underline;
}

.current-color span:first-child {
  color: #8B8B8B;
}

.current-color {
  margin-bottom: 1.125em;
}

.colors-variants .active {
  border: 1px solid black;
}

.colors-variants {
  display: flex;
  gap: 0.625em;
}

.product-colors {
  margin-bottom: 2.375em;
}

.product-size .text {
  font-size: 1em;
  font-weight: 400;
  margin-bottom: 1em;
}

.select-size {
  background-color: var(--light-gray);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 1.0625em 1.25em;
}

.select-size .current-value {
  text-align: center;
  font-size: 1.375em;
  font-weight: 400;
  line-height: 138%;
}

.product-size {
  margin-bottom: 3.25em;
}

.shop-now button {
  background-color: #00aa5b;
  width: 100%;
  font-size: 1.125em;
  padding: 1.375em 0;
  cursor: pointer;
}

.add-to-cart button {
  width: 100%;
  font-size: 1.125em;
  padding: 1.375em 0;
  cursor: pointer;
}

.price-alert p {
  font-size: 1.125em;
  font-weight: 500;
}

.section-with-hiding p span {
  font-weight: 900;
  font-size: 1.125em;

}

.section-with-hiding p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.compare-across .text span {
  font-weight: 500;
  font-size: 1em;
  line-height: 115%;
}

.price{
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}

.compare-across .price {
  font-size: 1.125em;
  font-weight: 500;
  line-height: 115%;
  margin-bottom: 1em;
}

.compare-across {
  margin-bottom: 2.3125em;
}

.compare-variants > div {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1em;
}

.compare-variants > div > img {
  height: 6.25em;
}

.compare-variants > div > div .name {
  margin-bottom: .075em;
  color: #0D99FF;
  font-size: 1.375em;
}

.compare-variants > div > div .price {
  font-size: 1.5em;
  font-weight: 400;
}

.compare-variants .separator {
  width: 100%;
  height: 1px;
  background: #DCDCDC;
  margin: 2em 0;
}


.also-like .category-products {
  display: grid;
  padding-left: 23px;
  padding-right: 23px;
  grid-template-columns: repeat(1, 4fr);
  justify-items: center;
  align-items: center;
  justify-content: space-between;
}

.load-more .button-wrapper {
  font-weight: 500;
}


.main-image {
  grid-column: 2;
  grid-row: 1;
}

.colors-variants img {
  height: 4.375em;
  width: 4.375em;
}

button.visit-site {
  color: white;
}

@media (max-width: 990px) {

  .main-image {
    grid-column: initial;
    grid-row: initial;
  }

  .product-info {
    display: block;
    margin-bottom: 80px;
    margin-top: 4px;
  }

  .page-wrapper {
    overflow-x: hidden;
    width: calc(100vw - 32px);
    padding: 0 16px
  }

  .page-wrapper > div {
    width: calc(100vw - 32px);
  }

  .product-images {
    display: grid;
    grid-template-columns: auto;
    gap: 0;
    transform: translateX(-16px);
    width: 100vw;
    overflow-x: hidden;
  }

  .product-images {
    display: flex;
    transition: transform 0.5s;
  }

  .product-images .left-side-images img {
    display: none;
    height: initial;
    width: 100vw;
    margin-bottom: 0;
  }

  .also-like .category-products {
    overflow-x: hidden;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px 16px;
  }

  .also-like .category-products > div,
  .also-like .category-products > div > img {
    width: 100%;
  }

  .left-side-images > img.active {
    border: none;
  }

  #first-section-wrapper {
    display: flex !important;
    text-align: center;
    transform: translateZ(10px);
    z-index: 1000;
    object-fit: contain;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .product-images-controller {
    display: flex;
    width: calc(100vw - 32px);
    padding: 0 16px;
    margin: 12px 0 32px 0;
  }

  .product-images-controller div {
    background: #E9E9E9;
    height: 1px;
    width: 100%;
  }

  .product-images-controller div.active {
    background-color: #111111;
  }

  .product-author {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .product-title .product-name {
    font-size: 24px;
  }

  .product-price .price {
    font-size: 24px;
    letter-spacing: -0.48px;
  }

  .product-price {
    gap: 16px;
  }

  .product-price {
    font-size: 14px;
    padding: 7px 14px 8px 11px;
    line-height: normal;
    height: initial;
  }

  .product-title {
    margin-bottom: 32px;
  }

  .product-details div, .product-details div span {
    font-size: 14px;
    line-height: 140%;
  }

  .current-color > span {
    font-size: 14px;
    line-height: normal;
  }

  .current-color {
    margin-bottom: 16px;
  }

  .colors-variants img {
    height: 70px;
    width: 70px;
  }

  .product-colors{
    margin-bottom: 32px;
  }

  .product-size .text {
    font-size: 14px;
    line-height: 138%;
    margin-bottom: 12px;
  }

  .select-size {
    font-size: 16px;
    font-weight: 400;
    line-height: 138%;
    padding: 16px;
  }

  .select-size img {
    height: 24px;
    width: 24px;
  }

  .product-size {
    margin-bottom: 40px;
  }

  .shop-now button, .add-to-cart button {
    padding: 19px 0;
    font-size: 16px;
  }

  .price-alert p {
    font-size: 16px;
    font-weight: 500;
    gap: 8px;
  }

  .add-to-cart .description {
    font-size: 18px;
    line-height: 115%;
  }

  .add-to-cart .description {
    font-size: 14px;
    line-height: 140%;
  }

  .section-with-hiding p span,
  .compare-across,
  .compare-across .text span,
  .compare-across .price {
    font-size: 16px;
  }

  .compare-across {
    margin-bottom: 16px;
  }

  .compare-variants > div {
    grid-template-columns: auto 1fr;
    gap: 16px 24px;
  }

  .compare-variants > div > button {
    grid-column: 1 / 3;
    color: #111;
    background-color: white;
    border: 1px solid #111;
  }

  .compare-variants > div > img {
    width: 80px;
    height: 100px;
  }

  .compare-variants > div > div .name,
  .compare-variants > div > div .price {
    font-size: 16px;
  }

  .compare-variants > div > div > .name {
    line-height: 140%;
    margin-bottom: 8px;
  }

  .category-products > div > p {
    font-size: 14px;
  }

  .category-products > div > p.author {
    margin-top: 16px;
  }

  .category-products > div > p:not(:last-child) {
    margin-bottom: 8px;
  }

  .load-more button {
    width: 100%;
    padding: 14px 0;
    font-size: 14px;
  }
}


</style>
