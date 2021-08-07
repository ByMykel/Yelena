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
        SET_DECKS(state, decks) {
            state.decks = decks;
        },
    },
    actions: {
        async fetchCards({ commit }) {
            await repository.getCards().then((data) => {
                commit("SET_CARDS", data.data.data);
            });
        },
        async fetchDecks({ commit }) {
            await repository.getDecks().then((data) => {
                commit("SET_DECKS", data.data.data);
            });
        },
    },
    getters: {
        getCards(state) {
            return state.cards;
        },
        getDecks(state) {
            return state.decks;
        },
    },
    modules: {},
});
