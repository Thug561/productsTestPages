<script>
export default {
  name: "StringProductPlaceholder"
}
</script>

<template>
  <div class="product-placeholder-string">
    <div class="text-placeholder"></div>
  </div>
</template>

<style scoped>
.product-placeholder-string {
  position: relative;
  width: 70%;
  height: 100%;
  padding: 10px;
  padding-bottom: 0px;
  background-color: #F7F7F7;
  border-radius: 10px;
}


.text-placeholder,
.price-placeholder {
  background: linear-gradient(135deg, #e0e0e0 25%, #f8f8f8 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 5px;
}

.text-placeholder {
  width: 100%;
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

