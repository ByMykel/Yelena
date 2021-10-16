import updateState from "../updateState";

export const namespaced = true;

export const state = {
    deck: null,
    cards: [],
    cardsDisplayed: [],
    meta: null,
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
        state.meta = {
            current_page: page,
            last_page: Math.floor((state.cards.length + 14) / 15),
            from: (page - 1) * 15 + 1,
            to: (page - 1) * 15 + state.cardsDisplayed.length,
            total: state.cards.length,
        };
    },
    UPDATE_FAVORITE(state, id) {
        state.cards.map((card) => {
            if (card.id === id) {
                card.favorite = !card.favorite;
            }
        });
    },
    UPDATE_CARD_QUESTION(state, { id, newQuestion }) {
        state.cards.map((card) => {
            if (card.id === id) {
                card.question = newQuestion;
            }
        });
    },
    UPDATE_CARD_ANSWER(state, { id, newAnswer }) {
        state.cards.map((card) => {
            if (card.id === id) {
                card.answer = newAnswer;
            }
        });
    },
    DELETE_CARD(state, id) {
        state.cards = state.cards.filter((card) => {
            if (card.id !== id) {
                return card;
            }
        });
    },
    CREATE_CARD(state, card) {
        state.cards.push({
            id: Date.now(),
            deck_id: card.deck_id,
            question: card.question,
            answer: card.answer,
            favorite: card.favorite,
            created_at: new Date(),
            updated_at: new Date(),
        });
    },
};

export const actions = {
    setState({ commit }, data) {
        commit("SET_STATE", data);
    },
    fetchCards({ commit, rootState }, { id, page }) {
        const deck = rootState.deck.decks.find((deck) => {
            if (deck.id === id) {
                return deck;
            }
        });

        const cards = rootState.card.cards.filter((card) => {
            if (card.deck_id === deck.id) {
                return card;
            }
        });

        commit("SET_DECK", deck);
        commit("SET_CARDS", { cards, page });
        commit("SET_META", page);
    },
    handleFavorite({ commit }, id) {
        commit("UPDATE_FAVORITE", id);
    },
    updateCardQuestion({ commit }, { id, newQuestion }) {
        commit("UPDATE_CARD_QUESTION", { id, newQuestion });
    },
    updateCardAnswer({ commit }, { id, newAnswer }) {
        commit("UPDATE_CARD_ANSWER", { id, newAnswer });
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
};
