
<template>
  <router-view />
</template>

<script>
</script>

<style>
* {
  color: #111111;
  padding: 0;
  margin: 0;
  font-family: 'Moderat', sans-serif;
  object-fit: cover;
}

:root {
  --light-gray: #F7F7F7;
  --default-gap: 36px;
}

h1 {
  font-family: 'Zodiak', sans-serif;
  font-size: 1.25em;
  font-weight: 540;
}

.button {
  border: none;
  background: #111;
  padding: 0.875em 2.5em;
  color: white;
}

.button-wrapper {
  display: flex;
  justify-content: center;
}

.categories-name p, .categories-name span {
  font-size: 1em;
  font-weight: 400;
  color: #8B8B8B;
}

.categories-name p.active {
  color: #111;
}

.categories-name {
  display: flex;
}

/*.categories-name span {
 margin: 0 0.3em 0 0;
} */

.page-wrapper {
  display: flex;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 50px;
  flex-wrap: wrap;
}

.page-wrapper > div {
 width: 78.75em; /* 1260px */
}

.category-separator .separator {
  width: 100%;
  height: 1px;
  background: #DCDCDC;
}

.category-separator {
  display: flex;
  gap: 1.5em;
  align-items: center;
  margin-bottom: 3.75em;
}

.category-separator .category-text {
  font-family: 'Zodiak', sans-serif;
  font-size: 2em;
  font-style: normal;
  font-weight: 540;
  line-height: normal;
  white-space: nowrap;
}



.category-products > div > .product-image {
  object-fit: contain;
  height: 100%;

  width: 100%;
  max-width: calc((1260px - 352px) / 4);
  max-height: calc((1260px - 352px) / 4);
}

.category-products > div > p.author, .category-products > div > p.price {
  font-weight: 500;
}

.category-products > div > p:not(:last-child) {
  margin-bottom: 0.5em;
}

.category-products > div > p.author {
  margin-top: 1em;
}



.mobile {
  display: none !important;
}

html {
  -webkit-tap-highlight-color: transparent;
}

.summary-title {
  font-size: 1em;
  font-weight: 500;
  padding-bottom: 1.25em;
  border-bottom: 1px solid #DCDCDC;
}

.summary-info {
  padding: 1.25em 0;
  border-bottom: 1px solid #DCDCDC;
}

.summary-info div {
  display: flex;
  justify-content: space-between;
  font-size: 1em;
}

.summary-info div:not(:last-child) {
  margin-bottom: 1.5em;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 1.25em;
  margin-bottom: 2em;
}

.summary-total p {
  font-weight: 900;
}

.summary-button {
  width: 100%;
  cursor: pointer;
}

.additional-info {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--light-gray);
  height: 18.75em;
}

.additional-item > p, .additional-item > h1 {
  text-align: center;
}

.additional-item > div {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}

.additional-info .title {
  font-size: 1.25em;
  margin-bottom: 0.75em;
}

.additional-item > div > img {
  height: 3.25em;
  width: 3.25em;
}

.additional-info > div {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8.75em;
  width: 70.75em;
}


@media (max-width: 990px) {
  .mobile {
    display: block !important;
  }

  .category-products > div > .product-image {
    width: auto;
    height: auto;
  }

  .desktop {
    display: none !important;
  }

  .category-separator .category-text {
    font-size: 24px;
  }

  .category-separator {
    gap: 16px;
    margin-bottom: 24px;
    padding-top: 10px;
    padding-bottom: 18px;
  }

  .scrolling-content div h1 {
    font-size: 20px;
  }

  .summary-title, .summary-info div p, .summary-total p {
    font-size: 16px;
  }

  .summary-title {
    margin-bottom: 20px;
    padding-bottom: 20px;
  }

  .summary-info div:not(:last-child) {
    margin-bottom: 24px;
  }

  .summary-info {
    padding: 20px 0;
  }

  .summary-total {
    margin-top: 20px;
    margin-bottom: 32px;
  }

  .summary-button {
    padding: 20px 0;
    font-size: 16px;
  }

  .additional-info .title {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .additional-info > div {
    display: grid;
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .additional-info {
    height: initial;
    padding: 80px 53px;
  }

  .additional-item > div > img {
    height: 52px;
    width: 52px;
  }

  .additional-item > p {
    font-size: 16px;
  }
}
</style>
