import updateState from "../updateState"

export const namespaced = true;

export const state = {
    decks: [],
    decksDisplayed: [],
    meta: null,
};

export const mutations = {
    SET_STATE(state, data) {
        Object.assign(state, data);
    },
    SET_DECKS(state, page) {
        state.decksDisplayed = state.decks
            .slice((page - 1) * 15, page * 15)
            .map((deck) => deck);
    },
    SET_META(state, page) {
        state.meta = {
            current_page: page,
            last_page: Math.floor((state.decks.length + 14) / 15),
            from: (page - 1) * 15 + 1,
            to: (page - 1) * 15 + state.decksDisplayed.length,
            total: state.decks.length,
        };
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
    DELETE_DECK(state, id) {
        state.decks = state.decks.filter((deck) => {
            if (deck.id !== id) {
                return deck;
            }
        });
    },
    CREATE_DECK(state, deck) {
        state.decks.push({
            id: Date.now(),
            name: deck.name,
            favorite: deck.favorite,
            cards_count: 0,
            due_cards_count: 0,
            created_at: new Date(),
            updated_at: new Date(),
        });
    },
};

export const actions = {
    setState({ commit }, data) {
        commit("SET_STATE", data);
    },
    fetchDecks({ commit }, { page }) {
        commit("SET_DECKS", page);
        commit("SET_META", page);
    },
    handleFavorite({ commit }, id) {
        commit("UPDATE_FAVORITE", id);
    },
    updateDeckName({ commit }, { id, deck }) {
        commit("UPDATE_DECK_NAME", { id, newName: deck.name });
    },
    deleteDeckById({ commit }, id) {
        commit("DELETE_DECK", id);
        updateState();
    },
    createDeck({ commit }, deck) {
        commit("CREATE_DECK", deck);
        updateState();
    },
    // async importDeck(obj, file) {
    //     let message = "";

    //     await repository
    //         .importDeck(file)
    //         .then((data) => {
    //             message = data.data.message;
    //         })
    //         .then(() => {
    //             updateState();
    //         });

    //     return message;
    // },
    getAllDecksName({ state }) {
        return { data: { data: state.decks } };
    },
};

export const getters = {
    getDecks(state) {
        return state.decksDisplayed;
    },
    getDecksMeta(state) {
        return state.meta;
    },
};
