import repository from "../../api/repository";
import updateState from "../updateState";
import axios from "axios";

export const namespaced = true;

export const state = {
    deck: null,
    cards: [],
    meta: null,
    loading: false,
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
    UPDATE_FAVORITE(state, id) {
        state.cards.map((card) => {
            if (card.id === id) {
                card.favorite = !card.favorite;
            }
        });
    },
    UPDATE_CARD_QUESTION(state, { id, question }) {
        state.cards.map((card) => {
            if (card.id === id) {
                card.question = question;
            }
        });
    },
    UPDATE_CARD_ANSWER(state, { id, answer }) {
        state.cards.map((card) => {
            if (card.id === id) {
                card.answer = answer;
            }
        });
    },
    SET_LOADING(state, data) {
        state.loading = data;
    },
};

export const actions = {
    async loadExampleCards(obj, id) {
        const cards = await axios.get(`/data/card.json`).then((data) => {
            return data.data.cards;
        });

        for (const card of cards.slice(0, 10)) {
            await repository.createCard({
                deck_id: id,
                question: card.question,
                answer: card.answer,
            });
        }

        updateState();
    },
    async fetchCards({ commit }, { id, page }) {
        commit("SET_LOADING", true);

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
            commit("SET_LOADING", false);
        });
    },
    async handleFavorite({ commit }, id) {
        commit("UPDATE_FAVORITE", id);

        await repository.handleFavoriteCard(id);
    },
    async updateCardQuestion({ commit }, { id, question }) {
        commit("UPDATE_CARD_QUESTION", { id, question });

        await repository.updateCardById(id, { question });
    },
    async updateCardAnswer({ commit }, { id, answer }) {
        commit("UPDATE_CARD_ANSWER", { id, answer });

        await repository.updateCardById(id, { answer });
    },
    async deleteCardById(obj, id) {
        await repository.deleteCardById(id).then(() => {
            updateState();
        });
    },
    async createCard(obj, card) {
        await repository.createCard(card).then(() => {
            updateState(card.id);
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
    getLoading(state) {
        return state.loading;
    },
};
