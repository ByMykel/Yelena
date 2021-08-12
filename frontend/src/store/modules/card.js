import repository from "../../api/repository";
import router from "../../router";

export const namespaced = true;

export const state = {
    cards: [],
    meta: null,
};

export const mutations = {
    SET_CARDS(state, cards) {
        state.cards = cards;
    },
    SET_META(state, meta) {
        state.meta = meta;
    },
};

export const actions = {
    async fetchCards({ commit }, { id, page }) {
        await repository.getCardsByDeckId(id, page).then((data) => {
            commit("SET_CARDS", data.data.data);
            commit("SET_META", data.data.meta);
        });
    },
    async createCard({ dispatch }, cardForm) {
        await repository.createCard(cardForm).then(() => {
            if (router.currentRoute.name === "DeckById") {
                dispatch("fetchCards", {
                    id: router.currentRoute.params.id,
                    page: router.currentRoute.params.page || 1,
                });
            }
        });
    },
};

export const getters = {
    getCards(state) {
        return state.cards;
    },
    getCardsMeta(state) {
        return state.meta;
    },
};
