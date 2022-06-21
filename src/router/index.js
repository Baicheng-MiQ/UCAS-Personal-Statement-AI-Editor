import { createRouter, createWebHistory } from "vue-router";
import HomeView from "/src/views/HomeView.vue";
import AuthView from "/src/views/authView.vue";
import store from '../store/index.js';

const routes = [
    {
        path: "/",
        name: "AuthView",
        component: AuthView,
        
    },
    {
        path: "/home",
        name: "HomeView",
        component: HomeView,
        // navigation guard: if unauthenticated, redirect to login
        beforeEnter: (to, from, next) => {
            if (!store.state.userDetail) {
                next("/");
            } else {
                next();
            }
        }

    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;