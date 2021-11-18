import Vue from "vue";
import Vuex from "vuex";

import * as deck from "./modules/deck";
import * as card from "./modules/card";
import * as study from "./modules/study";
import * as stats from "./modules/stats";
import * as modals from "./modules/modals";
import * as theme from "./modules/theme";

import PersistentStore from "./PersistentStore";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,

    modules: {
        deck,
        card,
        study,
        stats,
        modals,
        theme
    },

    plugins: [
        PersistentStore({
            moduleName: "deck",
            localStorageName: "deck",
            dispatch: "deck/setState",
        }),
        PersistentStore({
            moduleName: "card",
            localStorageName: "card",
            dispatch: "card/setState",
        }),
        PersistentStore({
            moduleName: "stats",
            localStorageName: "stats",
            dispatch: "stats/setState",
        }),
        PersistentStore({
            moduleName: "theme",
            localStorageName: "theme",
            dispatch: "theme/setState",
        }),
    ],
});
