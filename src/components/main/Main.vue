<script>
import HeaderMain from "@/components/main/HeaderMain.vue";
import axios from "axios";
import ProductPlaceholder from "@/components/UI/ProductPlaceholder.vue";
import StringProductPlaceholder from "@/components/UI/StringProductPlaceholder.vue";
import { API_BASE_URL } from '@/components/config/config';
import ProductPopup from "@/components/popup/ProductPopup.vue";

export default {
  name: "MainPage",
  components: {StringProductPlaceholder, ProductPlaceholder, HeaderMain, ProductPopup},
  data() {
    return {
      products: [],
      observer: null,
      currentPage: 1,
      itemsPerPage: 24,
      placeholdersCount: 24,
      total: 0,
      loading: true,
      dropdownOpen: false,
      dropdownToggled: false,
      selectedSorting: 'Newest',
      q: '',
      searchQuery: '',
      sortBy: 'title',
      order: 'asc',
      showPopup: false,
      currentProduct: {},
      isEdit: false
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);

    const sortParam = urlParams.get('sort');
    if (!this.selectedSorting || this.selectedSorting === '') {
      this.selectedSorting = 'Newest';
    } else if (this.selectedSorting !== 'Highest' && this.selectedSorting !== 'Low') {
      this.selectedSorting = sortParam || 'Newest';
    }

    const q = urlParams.get('q');

    if (q) this.q = q;
    if (q) {
      this.updateSearchQuery(q);
    }

    this.selectSorting(this.selectedSorting);
  },
  methods: {
    async fetchProducts(searchQuery = '') {
      this.loading = true;
      const skip = (this.currentPage - 1) * this.itemsPerPage;
      const limit = this.itemsPerPage;
      const sortBy = this.sortBy;
      const order = this.order;

      try {
        const response = await axios.get(`${API_BASE_URL}/products${searchQuery ? '/search' : ''}`, {
          params: {
            limit,
            skip,
            sortBy,
            order,
            select: 'id,title,brand,price,images',
            q: searchQuery || undefined
          }
        });
        this.products.push(...response.data.products);
        this.total = response.data.total;
        this.currentPage++;

      } catch (error) {
        console.error('Error fetching products:', error);
        this.products = [];
      } finally {
        this.loading = false;
      }
    },

    createObserver() {
      this.observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && this.total > 24 && this.currentPage < Math.ceil(this.total / this.itemsPerPage)) {
          this.fetchProducts(this.selectedSorting);
        }
      });
      this.observer.observe(this.$refs.observer);
    },

    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
      this.dropdownToggled = true;
    },

    navigateToProductDetail(product) {
      let newUrl = `/product/${product.id}`;
      this.$router.push(newUrl);
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    updateSearchQuery(query) {
      this.$router.replace({ path: '/search', query: { q: query } });
      this.searchQuery = query;
      this.products = [];
      this.currentPage = 1;

      this.fetchProducts(query);
    },

    selectSorting(sortOption) {
      this.products = [];
      this.currentPage = 1;
      switch (sortOption) {
        case 'low':
          this.sortBy = 'price';
          this.order = 'asc';
          this.selectedSorting = 'Lowest Price';
          break;
        case 'high':
          this.sortBy = 'price';
          this.order = 'desc';
          this.selectedSorting = 'Highest Price';
          break;
      }

      const currentPath = this.$route.path;
      const urlParams = new URLSearchParams(this.$route.query);

      if (['low', 'high'].includes(sortOption)) {
        urlParams.set('sort', sortOption);
      } else {
        urlParams.delete('sort');
      }

      const queryString = urlParams.toString();
      const newUrl = `${currentPath}?${queryString}`;
      this.$router.replace(newUrl);

      this.fetchProducts(this.searchQuery);
    },
    openAddPopup() {
      this.currentProduct = {
        title: '',
        brand: '',
        price: '',
        images: ['']
      };
      this.isEdit = false;
      this.showPopup = true;
    },
    editProduct(product) {
      this.currentProduct = { ...product };
      this.isEdit = true;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    saveProduct(product) {
      if (this.isEdit) {
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products.splice(index, 1, product);
        }
      } else {
        this.products.push(product);
      }
      this.showPopup = false;
    },
    deleteProduct(product) {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
      this.showPopup = false;
    },
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = this.$route.query.q;
    if (searchQuery) {
      this.searchQuery = searchQuery;
    }

    const sort = urlParams.get('sort');
    this.fetchProducts(sort);
    this.createObserver(sort);
  },
}
</script>

<template>
  <HeaderMain @update-search-query="updateSearchQuery"/>
  <div class="page-wrapper">
    <div>
      <div class="categories-content">
        <div class="categories-filter" id="categories-filter"></div>
        <div class="categories-products" id="categories-products">
          <div class="bread-crumbs-container">
            <div v-if="loading" class="products-container" style="margin-left: 10px;">
              <StringProductPlaceholder style="width: calc(40vw - 100px); padding-bottom: 0px;" />
            </div>
            <h1 class="categories-title-update desktop" v-if="!loading && !searchQuery">Clothes, Bags & Shoes</h1>
            <h1 class="categories-title-update desktop" v-else>{{ searchQuery }}</h1>
          </div>
          <div class="categories-title">
            <div class="filter-sort-container">
              <div class="categories-sorting" @click="toggleDropdown()" ref="dropdown">
                <p>Sort by:</p>
                <div class="sorting-variants">
                  <p class="sorting-value">{{ selectedSorting }}</p>
                  <img src="@/assets/icons/chevron-down.svg">
                </div>
                <ul :class="{ open: dropdownOpen, close: !dropdownOpen && dropdownToggled }" class="sorting-options">
                  <li @click="selectSorting('low')">Lowest Price</li>
                  <li @click="selectSorting('high')">Highest Price</li>
                </ul>
              </div>
              <div class="AddProduct" @click="openAddPopup">Add Product</div>
            </div>
          </div>
          <div class="category-products">
            <div v-for="product in products" :key="product.id" class="product">
              <img :src="product.images[0]" alt="product-image" class="product-image" @click="navigateToProductDetail(product)">
              <p class="author">{{ `${product.brand}` }}</p>
              <p :title="product.title">{{ `${product.title}` }}</p>
              <div class="container-price">
                <p class="price">${{ product.price }}</p>
              </div>
              <div class="editButton" @click="editProduct(product)">Edit</div>
            </div>
            <div ref="observer" style="height: 1px;"></div>
            <div class="scroll-up-container" @click="scrollToTop">
              <img class="scroll-up" src="@/assets/images/row-up.png" alt="Scroll to top"/>
            </div>
          </div>
          <div v-if="loading" class="products-container">
            <ProductPlaceholder v-for="n in placeholdersCount" :key="n"/>
          </div>
          <div class="all-brands-wrapper button-wrapper" v-if="total > 24 && currentPage < Math.ceil(total / itemsPerPage)">
            <button class="all-brands button" @click="fetchProducts(selectedSorting)">Load more</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ProductPopup
      v-if="showPopup"
      :product="currentProduct"
      :isEdit="isEdit"
      @save="saveProduct"
      @delete="deleteProduct"
      @close="showPopup = false"
  />
</template>

<style scoped>
.AddProduct{
  background-color: #000;
  color: #fff;
  padding: 15px;
}

.AddProduct:hover{
  cursor: pointer;
}

.editButton{
  border: 1px solid #000;
  border-radius: 3px;
  padding: 4px;
}

.category-products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 60px;
  align-items: center;
  justify-content: center;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px 14px;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
}

.filter-sort-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  margin-top: 20px;
}

.categories-title-update {
  font-size: x-large;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
}

.bread-crumbs-container {
  position: relative;
  width: 100%;
  display: flex;
  padding-bottom: 20px;
  justify-content: space-between;
}

.scroll-up {
  bottom: 25px;
  right: 25px;
  position: fixed;
  width: 50px;
  height: 50px;
  z-index: 1;
  cursor: pointer;
}

.all-brands-wrapper {
  margin-bottom: 4.9375em;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.all-brands-wrapper .all-brands {
  position: relative;
  display: flex;
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  text-align: center;
}

.container-price {
  display: flex;
  margin-bottom: 0.5em;
}

.product {
  transition: transform 0.3s ease;
}

.product:hover {
  transform: scale(1.1);
  text-decoration: underline;
}

.product {
  display: flex;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

@keyframes openDropdown {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 320px;
    overflow-y: scroll;
    overflow-x: hidden;
    opacity: 1;
  }
}

@keyframes closeDropdown {
  from {
    max-height: 136px;
    opacity: 1;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
}

.open {
  animation: openDropdown 0.3s forwards;
}

.close {
  animation: closeDropdown 0.3s forwards;
}
.sorting-options {
  position: absolute;
  display: flex;
  transform: translate(0, 15px);
  border: 1px solid black;
  background-color: white;
  margin-top: 25px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 4px;
  height: 136px;
  z-index: 2;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  list-style-type: none;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
}

.sorting-options li {
  cursor: pointer;
  padding: 7px;
}

.sorting-options li:hover {
  text-decoration: underline;
}

.categories-content {
  display: grid;
  grid-template-columns: 15.25em 61.25em;
  gap: 2.25em;
}

.applied-filters-content > div {
  background-color: var(--light-gray);
  display: flex;
  gap: 0.75em;
  align-items: center;
  padding: 0.375em 0.75em;
}

.applied-filters-content > div > img {
  height: 0.75em;
  width: 0.75em;
}

.filter-group > div > div:not(:last-child),
.filter-group > form > div:not(:last-child),
.filter-group-content > div:not(:last-child) {
  margin-bottom: 0.75em;
}

.brands-search input {
  border: none;
  outline: none;
  background-color: var(--light-gray);
  width: 100%;
  padding-right: 1em;
  box-sizing: border-box;
}

.filter-form .container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 1.25em;
  width: 1.25em;
}

.filter-form .container-filter input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 1.25em;
  width: 1.25em;
}

.checkmark img {
  margin-left: 0.125em;
  height: 0.875em;
  width: 0.875em;
}

.categories-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5em;
}

.categories-title h1 {
  font-size: 2em;
}

.categories-sorting > p {
  font-size: 1em;
  color: #8B8B8B;
  display: flex;
  align-items: center;
}

.categories-sorting {
  display: flex;
  cursor: pointer;
  gap: 0.5em;
}

.sorting-variants {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.sorting-variants img {
  height: 1.5em;
  width: 1.5em;
}

.categories-content {
  margin-bottom: 9.625em;
}

.filter-group div:last-child, .filter-group form:last-child {
  /*max-height: 20em;*/
  -webkit-transition: max-height 0.5s;
  -moz-transition: max-height 0.5s;
  -ms-transition: max-height 0.5s;
  -o-transition: max-height 0.5s;
  transition: max-height 0.5s;
  overflow: hidden;

}

.filter-group div.hidden:last-child, .filter-group form.hidden:last-child {
  max-height: 0;
}

.filter-title img, .filter-title.hidden img {
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.filter-title.hidden img {
  animation-name: hide-filter-group;
}

.filter-title img {
  animation-name: display-filter-group;
}

.applied-filters-content > div {
  margin-bottom: 0 !important;
}

@keyframes hide-filter-group {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(90deg);
  }
}

@keyframes display-filter-group {
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.categories-content {
  display: grid;
  grid-template-columns: 244px 1fr;
  gap: 36px;
}

.applied-filters-content > div {
  background-color: var(--light-gray);
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 6px 12px;
}

.applied-filters-content > div > img {
  height: 12px;
  width: 12px;
}

.filter-group {
  margin-bottom: 40px;
}

.filter-group > div > div:not(:last-child),
.filter-group > form > div:not(:last-child),
.filter-group-content > div:not(:last-child){
  margin-bottom: 12px;
}

.brands-search input {
  border: none;
  outline: none;
  background-color: var(--light-gray);
  width: 100%;
  padding-right: 16px;
  box-sizing: border-box;
}

.filter-form .container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 20px;
  width: 20px;
}

.checkmark img {
  margin-left: 2px;
  height: 14px;
  width: 14px;
}

.categories-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.categories-title h1 {
  font-size: 32px;
}

.categories-sorting > p {
  font-size: 16px;
  width: 70px;
  color: #8B8B8B;
  display: flex;
  align-items: center;
}

.categories-sorting {
  display: flex;
  gap: 8px;
}

.sorting-variants {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sorting-variants img {
  height: 24px;
  width: 24px;
}

.category-products {
  margin-bottom: 0px;
}

.categories-content {
  margin-bottom: 140px;
}

.filter-group div:last-child, .filter-group form:last-child {
  -webkit-transition: max-height 0.5s;
  -moz-transition: max-height 0.5s;
  -ms-transition: max-height 0.5s;
  -o-transition: max-height 0.5s;
  transition: max-height 0.5s;
}

.filter-title img, .filter-title.hidden img {
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.filter-title.hidden img {
  animation-name: hide-filter-group;
}

.filter-title img {
  animation-name: display-filter-group;
}

.applied-filters-content > div {
  margin-bottom: 0 !important;
}

@media (max-width: 1340px) {
  .products-container{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1080px) {
  .products-container{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 990px) {

  @keyframes hide-filter-group {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(90deg);
    }
  }

  @keyframes display-filter-group {
    from {
      transform: rotate(90deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  @media (max-width: 990px) {
    .categories-content {
      display: block;
    }

    .page-wrapper {
      padding: 0 16px;
    }

    .categories-filter {
      position: fixed;
      background-color: white;
      width: calc(100vw - 32px);
      top: 0;
      left: -100vw;
      z-index: 10000;
      padding: 24px 16px;
      height: calc(100vh - 48px);
      overflow-y: scroll;
      transition: max-width 0.5ms;
    }

    .category-products {
      grid-template-columns: 1fr 1fr;
    }

    .category-products > div > .product-image {
      width: 100%;
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

    .category-products {
      margin-bottom: 60px;
    }

    .categories-products .button-wrapper .button {
      width: 100%;
      padding: 14px 40px;
      font-size: 14px;
      font-weight: 500;
    }

    .mobile-filter p span, .mobile-filter p {
      font-size: 14px;
    }

    .categories-sorting > p {
      font-size: 14px;
    }

    .sorting-variants .sorting-value {
      font-size: 14px;
    }

    .categories-products h1 {
      font-size: 24px;
      padding: 24px 0;
    }

    .mobile .applied-filters .applied-filters-content > div p {
      font-size: 14px;
    }

    .mobile .applied-filters .applied-filters-content > div {
      padding: 12px;
    }

    .applied-filters-content > div > img {
      height: 12px;
      width: 12px;
    }

    .mobile.items-count span {
      color: #8B8B8B;
    }

    .categories-title {
      margin-bottom: 24px;
    }

    .mobile .filter-title p {
      font-size: 24px;
      font-weight: 900;
      line-height: 115%;
    }

    .mobile .filter-title {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 32px;
    }

    .mobile .filter-title img {
      height: 20px;
      width: 20px;
      margin-right: 2px;
    }

    .filter-title span {
      font-size: 20px;
      line-height: 115%;
    }

    .filtering-group p {
      font-size: 16px;
    }

    .filter-group > div > div:not(:last-child),
    .filter-group > form > div:not(:last-child),
    .filter-group-content > div:not(:last-child) {
      margin-bottom: 16px;
    }

    .checkmark img {
      height: 14px;
      width: 14px;
      margin-left: 2px;
    }

    .brands-search input {
      font-size: 14px;
      font-weight: 400;
      padding-left: 12px;
    }

    .filter-form.hidden input {
      display: none;
    }

    @keyframes open-filters {
      from {
        left: -100vw;
      }
      to {
        left: 0;
      }
    }

    @keyframes hide-filters {
      from {
        left: 0;
      }
      to {
        left: -100vw;
      }
    }
  }

  @media (max-width: 990px) {
    .categories-content {
      display: block;
    }

    .products-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px 64px;
      flex-wrap: wrap;
      justify-items: center;
    }

    .bread-crumbs-container {
      display: none;
    }

    .page-wrapper {
      padding: 0 16px;
    }

    .categories-filter {
      position: fixed;
      background-color: white;
      width: calc(100vw - 32px);
      top: 0;
      left: -100vw;
      z-index: 10000;
      padding: 24px 16px;
      height: calc(100vh - 48px);
      overflow-y: scroll;
      transition: max-width 0.5ms;
    }

    .filter-sort-container {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      align-content: center;
    }

    .category-products {
      grid-template-columns: 4fr;
    }

    .category-products > div > .product-image {
      width: 100%;
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

    .category-products {
      margin-bottom: 0px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 60px 24px;
      justify-items: center;
      align-items: center;
      justify-content: center;
    }

    .categories-products .button-wrapper .button {
      width: 100%;
      padding: 14px 40px;
      font-size: 14px;
      font-weight: 500;
    }

    .mobile-filter p span, .mobile-filter p {
      font-size: 14px;
      width: 60px;
    }

    .categories-sorting > p {
      font-size: 14px;
      width: 60px;
    }

    .sorting-variants .sorting-value {
      font-size: 14px;
    }

    .categories-products h1 {
      font-size: 24px;
      padding: 24px 0;
    }

    .mobile .applied-filters .applied-filters-content > div p {
      font-size: 14px;
    }

    .mobile .applied-filters .applied-filters-content > div {
      padding: 12px;
    }

    .applied-filters-content > div > img {
      height: 12px;
      width: 12px;
    }

    .mobile.items-count span {
      color: #8B8B8B;
    }

    .categories-title {
      align-items: flex-end;
      margin-bottom: 24px;
    }

    .mobile .filter-title p {
      font-size: 24px;
      font-weight: 900;
      line-height: 115%;
    }

    .mobile .filter-title img {
      height: 20px;
      width: 20px;
      margin-right: 2px;
    }

    .filter-title span {
      font-size: 20px;
      line-height: 115%;
    }

    .filtering-group p {
      font-size: 16px;
    }

    .filter-group > div > div:not(:last-child),
    .filter-group > form > div:not(:last-child),
    .filter-group-content > div:not(:last-child) {
      margin-bottom: 16px;
    }

    .checkmark img {
      height: 14px;
      width: 14px;
      margin-left: 2px;
    }

    .brands-search input {
      font-size: 14px;
      font-weight: 400;
      padding-left: 12px;
    }

    .filter-form.hidden input {
      display: none;
    }

    @keyframes open-filters {
      from {
        left: -100vw;
      }
      to {
        left: 0;
      }
    }

    @keyframes hide-filters {
      from {
        left: 0;
      }
      to {
        left: -100vw;
      }
    }
  }

  @media (max-width: 600px) {
    .products-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px 0px;
      align-items: center;
      flex-wrap: wrap;
    }

    .category-products {
      margin-bottom: 0px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 60px 24px;
      justify-items: center;
    }
  }
}
</style>
