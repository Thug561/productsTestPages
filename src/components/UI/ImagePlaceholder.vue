<script>
export default {
  name: "BrandPlaceholder"
}
</script>

<template>
  <div class="product-placeholder ">
    <div class="image-placeholder "></div>
  </div>
</template>

<style scoped>
.product-placeholder {
  position: relative;
  margin: 5px;
  width: 70%;
  height: 100%;
  padding: 10px;
  background-color: #F7F7F7;
  border-radius: 10px;
}

.image-placeholder {
  background: linear-gradient(135deg, #e0e0e0 25%, #f8f8f8 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 5px;
}

.image-placeholder {
  width: 100%;
  height: inherit;
  margin-bottom: 10px;
  border-radius: 10px;
}
.image-placeholder .mobile{
  width: 100%;
  height: 300px !important;
  /* height: inherit; */
  margin-bottom: 10px;
  border-radius: 10px;
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
