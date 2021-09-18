import repository from "../../api/repository";

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
    UPDATE_FAVORITE(state, id) {
        state.decks.map((deck) => {
            if (deck.id === id) {
                deck.favorite = !deck.favorite;
            }
        });
    },
    UPDATE_DECK_NAME(state, { id, newName }) {
        state.decks.map((deck) => {
            if (deck.id === id) {
                deck.name = newName;
            }
        });
    },
};

export const actions = {
    async fetchDecks({ commit }, { page }) {
        await repository.getDecks(page).then((data) => {
            commit("SET_DECKS", data.data.data);
            commit("SET_META", data.data.meta);
        });
    },
    async handleFavorite({ commit }, id) {
        commit("UPDATE_FAVORITE", id);
    },
    updateDeckName({ commit }, { id, newName }) {
        commit("UPDATE_DECK_NAME", { id, newName });
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
