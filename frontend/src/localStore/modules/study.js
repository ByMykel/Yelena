import supermemo from "../../api/supermemo";

export const namespaced = true;

export const state = {
    study_deck: null,
};

export const mutations = {
    SET_STUDY_DECK(state, deck) {
        state.study_deck = deck;
    },
};

export const actions = {
    fetchStudyDeck({ commit, rootState }, id) {
        const deck = rootState.deck.decks.find((deck) => deck.id === id);
        const cards = rootState.card.cards.filter((card) => {
            if (card.deck_id !== id) {
                return;
            }

            if (new Date(card.review_date) >= new Date()) {
                return;
            }

            return card;
        });

        commit("SET_STUDY_DECK", { ...deck, cards });
    },
    updateStudyCard({ commit, rootState }, { id, data }) {
        const card = rootState.card.cards.find((card) => card.id === id);
        const supermemoData = supermemo(
            data.quality,
            card.interval,
            card.repetitions,
            card.ease_factor
        );

        const review_date = new Date();
        review_date.setDate(review_date.getDate() + supermemoData.interval);

        commit(
            "card/UPDATE_CARD_SUPERMEMO",
            { id, ...supermemoData, review_date: review_date.toUTCString() },
            { root: true }
        );

        commit("deck/DECREASE_DUE_CARD_COUNT", card.deck_id, { root: true });
    },
};

export const getters = {
    getStudyDeck(state) {
        return state.study_deck;
    },
};
