<script>
export default {
  name: "HeaderMain",
  data() {
    return {
      searchQuery: "",
    };
  },
  emits: ['updateSearchQuery'],
  methods: {
    updateSearchQuery(eventOrQuery) {
      const query = typeof eventOrQuery === 'string' ? eventOrQuery : eventOrQuery.target.value;
      this.searchQuery = query;
      this.$emit('updateSearchQuery', query);
    },
    handleEnter() {
      this.updateSearchQuery(this.searchQuery);
    },
    handleSearchSubmit(event) {
      event.preventDefault();
      if (this.searchQuery) {
        const formattedQuery = this.searchQuery.split(' ').join('+');
        this.$emit('updateSearchQuery', formattedQuery);
      }
    },
  },
}
</script>

<template>
  <header class="header">
    <div class="header-wrapper desktop">
      <div class="first-part">
        <router-link to="/" class="header-logo" style="text-decoration: none">
          products
        </router-link>
        <form @submit="handleSearchSubmit" class="header-search">
          <div class="search-icon">
            <img src="../../assets/icons/searh.svg"/>
          </div>
          <input
              type="text"
              v-model="searchQuery"
              @keydown.enter="handleEnter"
              placeholder="Search for products..."
          />
        </form>
      </div>
      <div class="separator"></div>
    </div>
  </header>
</template>



<style scoped>
.header-wrapper {
  /*  width: 77.5em; 1240px */
  max-width: 1260px;
  width: 100%;
}
.header {
  display: flex;
  justify-content: center;
  padding-top: 2.25em;
  padding-left: 50px;
  padding-right: 50px;
}
.header-logo {
  text-transform: uppercase;
  font-size: 2.375em; /* 38px */
  font-style: normal;
  font-weight: 900;
  line-height: 115%; /* 43.7px */
}

.search-icon img {
  height: 1.5em;
  width: 1.5em;
}

.header-wrapper .first-part {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2em;
}

.header-search {
  display: flex;
}

.header-search input {
  border: none;
  outline: none;
  background-color: var(--light-gray);
  padding-top: 1.0625em; /* 17px */
  padding-bottom: 1em;
  width: 100%; /* 540px */
  padding-left: 0.75em;
  font-size: 1em;
  font-weight: 400;
}

.header-search .search-icon {
  background-color: var(--light-gray);
  display: flex;
  align-items: center;
  padding-left: 1em;
}

.header-wrapper .separator {
  width: 100%;
  height: 1px;
  background-color: #fff;
  margin-top: 2em;
}

.menu-and-search .menu input {
  height: 18px;
  width: 20px;
  position: absolute;
  transform: translate(0, -8px);
  opacity: 0;
}

#cart-items > div:not(.separator) {
  display: flex;
  gap: 1.25em;
}
#cart-items > div:not(.separator) > img {
  width: 6.875em;
}
#cart-items > div:not(.separator) .name {
  font-weight: 500;
  font-size: 1em;
  margin-bottom: 0.5em;
}

#cart-items > div:not(.separator) .manufacture {
  font-weight: 400;
  font-size: 1em;
  margin-bottom: 1.25em;
}

#cart-items > div:not(.separator) .parameters {
  display: flex;
  gap: 1em;
  margin-bottom: 1.25em;
}

#cart-items > div:not(.separator) .parameters > p {
  color: #8B8B8B;
}

#cart-items > div:not(.separator) .parameters > p,
#cart-items > div:not(.separator) .parameters > span {
  font-size: 0.875em;
}

#cart-items > div:not(.separator) .price {
  font-size: 1em;
  font-weight: 500;
}

#cart-items .separator {
  margin: 1.5em 0;
}

.cart-total > p {
  font-size: 1.125em;
}

.cart-container .button {
  width: 100%;
  display: block;
  padding-left: 0;
  padding-right: 0;
  text-align: center;
  text-decoration: none;
}

#count-items-in-cart > span {
  font-size: 0.75em;
  color: white;
  transform: translateY(-1px);
}

@media (max-width: 990px) {
  .close-mobile-menu{
    position: fixed;
    right: 18px;
    top: 28px;
    z-index: 9999;
  }

  .header {
    margin: 0;
    padding: 0;
    width: 100%;
    display: block;
  }

  .header .mobile {
    display: flex !important;
    justify-content: space-between;
    padding: 18px 16px;
    align-items: center;
  }

  .header .mobile .menu-and-search {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .mobile .logo {
    display: flex;
    position: absolute;
    left: 0;
    width: 100%;
    top: 25px;
    justify-content: center;
    padding: 20px 0;
  }
  .header-wrapper .separator, #mobile-menu > .separator{
    position: absolute;
    display: flex;
    width: 80%;
    height: 1px;
    top: 250px;
    background: #DCDCDC;
    margin-top: 32px;
    margin-bottom: 32px;
    align-items: center;
    justify-content: center;
  }
}
</style>
