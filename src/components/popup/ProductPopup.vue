<script>
import {mapActions} from "vuex";

export default {
  props: {
    product: {
      type: Object,
      default: () => ({
        title: '',
        brand: '',
        price: '',
        images: ['']
      })
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localProduct: { ...this.product }
    };
  },

  methods: {
    ...mapActions(["addProduct", "updateProduct", "deleteProduct"]),
    addProductHandler() {
      this.addProduct(this.localProduct)
          .then(() => {
            this.$emit("save", this.localProduct);
            this.$emit("close");
          })
          .catch(error => {
            console.error('Error adding product:', error);
          });
    },
    updateProductHandler() {
      this.updateProduct(this.localProduct)
          .then(() => {
            this.$emit("save", this.localProduct);
            this.$emit("close");
          })
          .catch(error => {
            console.error('Error updating product:', error);
          });
    },
    deleteProductHandler() {
      this.deleteProduct(this.localProduct.id)
          .then(() => {
            this.$emit("delete", this.localProduct);
            this.$emit("close");
          })
          .catch(error => {
            console.error('Error deleting product:', error);
          });
    }
  }
};
</script>

<template>
  <div class="popup" @click="$emit('close')">
    <div class="popup-content" @click.stop>
      <h2>{{ isEdit ? 'Edit Product' : 'Add Product' }}</h2>
      <form @submit.prevent="isEdit ? updateProductHandler() : addProductHandler()" style="line-height: 50px;">
        <div class="placeholderWrapper">
          <label for="title">Title:</label>
          <input class="placeholder" type="text" v-model="localProduct.title" required />
        </div>
        <div class="placeholderWrapper">
          <label for="brand">Brand:</label>
          <input class="placeholder" type="text" v-model="localProduct.brand" required />
        </div>
        <div class="placeholderWrapper">
          <label for="price">Price:</label>
          <input class="placeholder" type="tel" v-model="localProduct.price" required />
        </div>
        <div class="placeholderWrapper">
          <label for="images">Image URL:</label>
          <input class="placeholder" type="text" v-model="localProduct.images[0]" required />
        </div>
        <button class="AddProduct" type="submit">{{ isEdit ? 'Update' : 'Add' }}</button>
        <button class="AddProduct" type="button" @click="$emit('close')">Cancel</button>
        <button class="AddProduct" v-if="isEdit" @click="deleteProductHandler">Delete</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.placeholderWrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.placeholder{
  padding: 5px;
  margin-left: 20px;
  border: 1px solid #b7b7b7;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease-in-out forwards;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: slideIn 0.3s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    visibility: hidden;
  }
  to {
    opacity: 1;
    visibility: visible;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.popup.closing {
  animation: fadeOut 0.3s ease-in-out forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

.AddProduct{
  border: none;
  margin-left: 5px;
  margin-right: 5px;
  background-color: #000;
  color: #fff;
  padding: 15px;
  text-decoration: none;
}
</style>
