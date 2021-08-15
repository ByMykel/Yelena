import Vue from "vue";
import Vuex from "vuex";

import * as deck from "./modules/deck";
import * as card from "./modules/card";
import * as study from "./modules/study";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,

    modules: {
        deck,
        card,
        study
    },
});
