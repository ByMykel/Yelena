import repository from "../../api/repository";
import updateState from "../updateState";
import axios from "axios";

export const namespaced = true;

export const state = {
    decks: [],
    meta: null,
    loading: false,
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
    SET_LOADING(state, data) {
        state.loading = data;
    },
};

export const actions = {
    async loadExampleDecks({ dispatch }) {
        const data = await axios
            .get(`/data/deck.json`)
            .then((data) => data.data);

        const deck = await repository
            .createDeck(data.decks.pop())
            .then((data) => data.data.data);

        dispatch("card/loadExampleCards", deck.id, { root: true });
    },
    async fetchDecks({ commit }, { page }) {
        commit("SET_LOADING", true);

        await repository.getDecks(page).then((data) => {
            commit("SET_DECKS", data.data.data);
            commit("SET_META", data.data.meta);
            commit("SET_LOADING", false);
        });
    },
    async handleFavorite({ commit }, id) {
        commit("UPDATE_FAVORITE", id);

        await repository.handleFavoriteDeck(id);
    },
    async updateDeckName({ commit }, { id, deck }) {
        commit("UPDATE_DECK_NAME", { id, newName: deck.name });

        await repository.updateDeckById(deck.id, deck);
    },
    async deleteDeckById(obj, id) {
        await repository.deleteDeckById(id).then(() => {
            updateState();
        });
    },
    async createDeck(obj, deck) {
        await repository.createDeck(deck).then(() => {
            updateState();
        });
    },
    async importDeck(obj, file) {
        let message = "";

        await repository
            .importDeck(file)
            .then((data) => {
                message = data.data.message;
            })
            .then(() => {
                updateState();
            });

        return message;
    },
    async getAllDecksName() {
        return await repository.getAllDecks();
    },
};

export const getters = {
    getDecks(state) {
        return state.decks;
    },
    getDecksMeta(state) {
        return state.meta;
    },
    getLoading(state) {
        return state.loading;
    },
};
