import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store';
import router from './router'

const app = createApp(App);

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        if (to.params.id) {
            document.title = `${to.params.id} - ${to.meta.title}`;
        } else {
            document.title = to.meta.title;
        }
    } else {
        document.title = 'Best Deals You Need To See';
    }
    next();
});

app.use(router);
app.use(store);
app.mount('#app');
