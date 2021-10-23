import updateState from "../updateState";
import axios from "axios";

export const namespaced = true;

export const state = {
    deck: null,
    cards: [],
    cardsDisplayed: [],
    meta: null,
    loading: false,
};

export const mutations = {
    SET_STATE(state, data) {
        Object.assign(state, data);
    },
    SET_DECK(state, deck) {
        state.deck = deck;
    },
    SET_CARDS(state, { cards, page }) {
        state.cardsDisplayed = cards
            .slice((page - 1) * 15, page * 15)
            .map((card) => card);
    },
    SET_META(state, page) {
        const numberOfCards = state.cards.filter(
            (card) => card.deck_id === state.deck.id
        ).length;

        state.meta = {
            current_page: page,
            last_page: Math.floor((numberOfCards + 14) / 15),
            from: (page - 1) * 15,
            to: (page - 1) * 15 + state.cardsDisplayed.length,
            total: numberOfCards,
        };
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
    DELETE_CARD(state, id) {
        state.cards = state.cards.filter((card) => card.id !== id);
    },
    CREATE_CARD(state, card) {
        state.cards.push({
            id: Math.floor(Math.random() * Date.now()),
            deck_id: card.deck_id,
            question: card.question,
            answer: card.answer,
            favorite: card.favorite,
            repetitions: 0,
            ease_factor: 2.5,
            interval: 0,
            review_date: null,
            review_date_human: "Has never been reviewed",
            created_at: new Date(),
            updated_at: new Date(),
        });
    },
    UPDATE_CARD_SUPERMEMO(state, card) {
        state.cards.map((item) => {
            if (item.id === card.id) {
                item.interval = card.interval;
                item.repetitions = card.repetitions;
                item.ease_factor = card.easeFactor;
                item.review_date = card.review_date;
                item.review_date_human = card.review_date;
            }
        });
    },
};

export const actions = {
    async loadExampleCards({ commit }) {
        await axios.get(`/Yelena/data/card.json`).then((data) => {
            commit("SET_STATE", data.data);
        });

        updateState();
    },
    setState({ commit }, data) {
        commit("SET_STATE", data);
    },
    fetchCards({ commit, rootState }, { id, page }) {
        const deck = rootState.deck.decks.find((deck) => deck.id === id);

        const cards = rootState.card.cards.filter(
            (card) => card.deck_id === deck.id
        );

        commit("SET_DECK", deck);
        commit("SET_CARDS", { cards, page });
        commit("SET_META", page);
    },
    handleFavorite({ commit }, id) {
        commit("UPDATE_FAVORITE", id);
    },
    updateCardQuestion({ commit }, { id, question }) {
        commit("UPDATE_CARD_QUESTION", { id, question });
    },
    updateCardAnswer({ commit }, { id, answer }) {
        commit("UPDATE_CARD_ANSWER", { id, answer });
    },
    deleteCardById({ commit }, id) {
        commit("DELETE_CARD", id);
        updateState();
    },
    createCard({ commit }, card) {
        commit("CREATE_CARD", card);
        commit("deck/INCREASE_CARD_COUNT", card.deck_id, { root: true });
        updateState();
    },
};

export const getters = {
    getCardsDeck(state) {
        return state.deck;
    },
    getCards(state) {
        return state.cardsDisplayed;
    },
    getCardsMeta(state) {
        return state.meta;
    },
    getLoading(state) {
        return state.loading;
    },
};
