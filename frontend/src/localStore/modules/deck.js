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
    fetchDecks({ commit }, { page }) {
        const data = localStorage.getItem("deck");

        if (data !== null) {
            const parsed = JSON.parse(data);

            const decks = parsed.decks.slice((page - 1) * 20, page * 20)

            commit("SET_DECKS", decks);
            commit("SET_META", parsed.meta);
        }
    },
    // async handleFavorite({ commit }, id) {
    //     commit("UPDATE_FAVORITE", id);
    // },
    // updateDeckName({ commit }, { id, newName }) {
    //     commit("UPDATE_DECK_NAME", { id, newName });
    // },
};

export const getters = {
    getDecks(state) {
        return state.decks;
    },
    getDecksMeta(state) {
        return state.meta;
    },
};
