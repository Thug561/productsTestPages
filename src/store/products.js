import axios from "axios";
import {API_BASE_URL} from "@/components/config/config";

const state = {
    products: [],
    total: 0,
    currentPage: 1,
    itemsPerPage: 24,
    loading: false
};

const getters = {
    currentPage: (state) => state.currentPage,
    itemsPerPage: (state) => state.itemsPerPage,
    loading: (state) => state.loading
};

const actions = {
    async addProduct({ commit }, product) {
        try {
            const response = await axios.post(`${API_BASE_URL}/products/add`, product, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Add product response:', response.data);
            commit('addProduct', response.data);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    },

    async updateProduct({ commit }, product) {
        try {
            const response = await axios.put(`${API_BASE_URL}/products/${product.id}`, {
                title: product.title,
                brand: product.brand,
                price: product.price,
                images: product.images
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('Update product response:', response.data);
            commit('updateProduct', response.data);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    },

    async deleteProduct({ commit }, productId) {
        try {
            await axios.delete(`${API_BASE_URL}/products/${productId}`);
            console.log('Delete product response:', productId);
            commit('deleteProduct', productId);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
};


const mutations = {
    addProduct: (state, product) => state.products.push(product),
    updateProduct: (state, updatedProduct) => {
        const index = state.products.findIndex((product) => product.id === updatedProduct.id);
        if (index !== -1) {
            state.products.splice(index, 1, updatedProduct);
        }
    },
    deleteProduct: (state, productId) => {
        state.products = state.products.filter((product) => product.id !== productId);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
