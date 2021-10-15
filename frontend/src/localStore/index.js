import Vue from "vue";
import Vuex from "vuex";

import * as deck from "./modules/deck";
import * as card from "./modules/card";
import * as study from "./modules/study";
import * as stats from "./modules/stats";
import * as modals from "./modules/modals";

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
    },

    plugins: [
        PersistentStore({
            moduleName: "deck",
            localStorageName: "deck",
            dispatch: "deck/setState"
        }),
    ],
});
