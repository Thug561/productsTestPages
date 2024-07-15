import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/main/Main.vue'
import NotFound from "@/components/main/NotFound.vue";
import ShopProduct from "@/components/shop/ShopProduct.vue";

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: Main,
    meta: {
      title: 'Home - Best Deals You Need To See'
    },
    children: [
      {
        path: ':id',
        name: 'ShopCatalogBrand',
        component: Main,
        meta: {
          title: 'Best Deals You Need To See'
        },
      }
    ],
  },

  {
    path: '/search',
    name: 'SearchResults',
    component: Main
  },
  {
    path: '/product/:id',
    name: 'ShopProduct',
    component: ShopProduct,
    meta: {
      title: 'Best Deals You Need To See'
    },
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Sorry, this page was not found'
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
