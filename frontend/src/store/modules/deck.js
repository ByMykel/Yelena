import repository from "../../api/repository";
import router from "../../router";

export const namespaced = true;

export const state = {
    decks: [],
    meta: null,
};

export const mutations = {
    SET_DECKS(state, decks) {
        state.decks = decks;
    },
    SET_META(state, meta) {
        state.meta = meta;
    },
};

export const actions = {
    async fetchDecks({ commit }, { page }) {
        await repository.getDecks(page).then((data) => {
            commit("SET_DECKS", data.data.data);
            commit("SET_META", data.data.meta);
        });
    },
    async createDeck({ dispatch }, deckForm) {
        await repository.createDeck(deckForm).then(() => {
            if (router.currentRoute.name === "Decks") {
                dispatch("fetchDecks", router.currentRoute.params.page || 1);
            }
        });
    },
};

export const getters = {
    getDecks(state) {
        return state.decks;
    },
    getDecksMeta(state) {
        return state.meta;
    },
};
