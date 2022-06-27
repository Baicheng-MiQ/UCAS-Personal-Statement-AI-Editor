import { createRouter, createWebHistory } from "vue-router";
import HomeView from "/src/views/HomeView.vue";
import AuthView from "/src/views/authView.vue";
import gptResult from "/src/components/gptResult.vue";
import grammarResult from "/src/components/grammarResult.vue";
import store from '../store/index.js';

const routes = [
    {
        path: "/",
        component: AuthView,
        
    },
    {
        path: "/home",
        component: HomeView,
        children: [
            {
                path: "",
                component: gptResult,
            },
            {
                path: "grammar",
                component: grammarResult,
            }

        ],
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
    routes: routes,
});

export default router;