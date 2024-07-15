<script>
export default {
  name: "ProductPlaceholder"
}
</script>

<template>
  <div class="product-placeholder">
    <div class="image-placeholder"></div>
    <div class="text-placeholder"></div>
    <div class="text-placeholder"></div>
    <div class="price-placeholder"></div>
  </div>
</template>

<style scoped>
.product-placeholder {
  position: relative;
  display: flex;
  margin: 5px;
  width: 180px;
  padding: 10px;
  /* margin: 0px; */
  background-color: #F7F7F7;
  border-radius: 10px;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: column;
}

.image-placeholder,
.text-placeholder,
.price-placeholder {
  background: linear-gradient(135deg, #e0e0e0 25%, #f8f8f8 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 5px;
}

.image-placeholder {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.text-placeholder {
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
}

.price-placeholder {
  width: 50%;
  height: 20px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 200%;
  }
  100% {
    background-position: -200% -200%;
  }

}
</style>

