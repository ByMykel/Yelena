import Vue from "vue";
import VueRouter from "vue-router";
import Stats from "../views/Stats.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Decks",
        component: () =>
            import("../views/Decks/Index.vue"),
    },
    {
        path: "/decks/:id",
        name: "DeckById",
        component: () =>
            import("../views/Decks/Show.vue"),
    },
    {
        path: "/stats",
        name: "Stats",
        component: Stats,
    },
    {
        path: "*",
        name: "PageNotFound",
        component: () =>
            import("../views/PageNotFound.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
