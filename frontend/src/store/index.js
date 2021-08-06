import Vue from "vue";
import Vuex from "vuex";
import repository from "../api/repository";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cards: [],
        decks: [],
    },
    mutations: {
        SET_CARDS(state, cards) {
            state.cards = cards;
        },
    },
    actions: {
        async fetchCards({ commit }) {
            await repository.getCards().then((data) => {
                commit("SET_CARDS", data.data.data);
            });
        },
    },
    getters: {
        getCards(state) {
            return state.cards;
        },
    },
    modules: {},
});
