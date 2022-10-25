import { createRouter, createWebHistory } from "vue-router";
import AuthView from "/src/views/authView.vue";
import userStatusCheckView from "/src/views/userStatusCheckView.vue";
import ResearchView from "/src/views/researchView.vue";
import BrainstormView from "/src/views/brainstormView.vue";
import ConstructView from "/src/views/constructView.vue";
import FinaliseView from "/src/views/FinaliseView.vue";
import gptResult from "/src/components/finalise/gptResult.vue";
import grammarResult from "/src/components/finalise/grammarResult.vue";
import store from '../store/index.js';

const routes = [
    {
        path: "/",
        component: AuthView,
        
    },
    {
        path: "/userStatusCheck",
        component: userStatusCheckView,
    },
    {
        path: "/research",
        component: ResearchView,
        beforeEnter: (to, from, next) => {
            if (!store.state.userDetail) {
                next("/");
            } else {
                console.log(store.state.userDetail);
                store.commit("switchTab", "researchView");
                next();
            }
        }
    },
    {
        path: "/brainstorm",
        component: BrainstormView,
        beforeEnter: (to, from, next) => {
            if (!store.state.userDetail) {
                next("/");
            } else {
                store.commit("switchTab", "brainstormView");
                next();
            }
        }
    },
    {
        path: "/construct",
        component: ConstructView,
        beforeEnter: (to, from, next) => {
            if (!store.state.userDetail) {
                next("/");
            } else {
                store.commit("switchTab", "constructView");
                next();
            }
        }
    },
    {
        path: "/finalise",
        component: FinaliseView,
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
                store.commit("switchTab", "finaliseView");
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