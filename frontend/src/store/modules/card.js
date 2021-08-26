import repository from "../../api/repository";
import router from "../../router";

export const namespaced = true;

export const state = {
    deck: null,
    cards: [],
    meta: null,
};

export const mutations = {
    SET_DECK(state, deck) {
        state.deck = deck;
    },
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
            commit("SET_DECK", data.data.data.deck);
            commit("SET_CARDS", data.data.data.cards.data);
            commit("SET_META", {
                current_page: data.data.data.cards.current_page,
                last_page: data.data.data.cards.last_page,
                from: data.data.data.cards.from,
                to: data.data.data.cards.to,
                total: data.data.data.cards.total,
            });
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
    getCardsDeck(state) {
        return state.deck;
    },
    getCards(state) {
        return state.cards;
    },
    getCardsMeta(state) {
        return state.meta;
    },
};
