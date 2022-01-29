import updateState from "../updateState";
import axios from "axios";

const checkCardWasReviewed = (card) => {
    if (card.review_date_human === "Has never been reviewed") {
        return false;
    }

    if (card.review_date_human === "Review now") {
        return false;
    }

    if (new Date(card.review_date) < new Date()) {
        return false;
    }

    return true;
};

export const namespaced = true;

export const state = {
    decks: [],
    decksDisplayed: [],
    meta: null,
    loading: false,
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
        state.decks = state.decks.filter((deck) => deck.id !== id);
    },
    CREATE_DECK(state, deck) {
        state.decks.push({
            id: deck.id ?? Math.floor(Math.random() * Date.now()),
            name: deck.name,
            favorite: deck.favorite,
            cards_count: deck.cards_count ?? 0,
            due_cards_count: deck.cards_count ?? 0,
            created_at: new Date(),
            updated_at: new Date(),
        });
    },
    INCREASE_CARD_COUNT(state, id) {
        state.decks.map((deck) => {
            if (deck.id === id) {
                deck.cards_count += 1;
                deck.due_cards_count += 1;
            }
        });
    },
    DECREASE_CARD_COUNT(state, card) {
        state.decks.map((deck) => {
            if (deck.id === card.deck_id) {
                deck.cards_count -= 1;

                if (card.review_date_human === "Has never been reviewed") {
                    deck.due_cards_count -= 1;
                    return;
                }

                if (card.review_date_human === "Review now") {
                    deck.due_cards_count -= 1;
                    return;
                }

                if (new Date(card.review_date) < new Date()) {
                    deck.due_cards_count -= 1;
                    return;
                }
            }
        });
    },
    DECREASE_DUE_CARD_COUNT(state, id) {
        state.decks.map((deck) => {
            if (deck.id === id) {
                deck.due_cards_count -= 1;
            }
        });
    },
    UPDATE_DUE_CARD_COUNT(state, { id, count }) {
        state.decks.map((deck) => {
            if (deck.id === id) {
                deck.due_cards_count = count;
            }
        });
    },
    SORT_DECKS(state) {
        state.decks = state.decks.sort((a, b) => {
            if (a.favorite === b.favorite) {
                return b.due_cards_count - a.due_cards_count;
            }

            return b.favorite - a.favorite;
        });
    },
};

export const actions = {
    async loadExampleDecks({ commit, dispatch }) {
        await axios.get(`/Yelena/data/deck.json`).then((data) => {
            commit("SET_STATE", data.data);
            dispatch("card/loadExampleCards", {}, { root: true });
        });
    },
    setState({ commit }, data) {
        commit("SET_STATE", data);
    },
    fetchDecks({ commit, state, rootState }, { page }) {
        commit("SORT_DECKS");

        const dueCardsCount = rootState.card.cards.reduce(
            (cards, card) => ({
                ...cards,
                [card.deck_id]:
                    (cards[card.deck_id] || 0) +
                    (checkCardWasReviewed(card) ? 0 : 1),
            }),
            {}
        );

        state.decks.forEach((deck) => {
            commit("UPDATE_DUE_CARD_COUNT", {
                id: deck.id,
                count: dueCardsCount[deck.id],
            });
        });

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
    importDeck({ commit }, file) {
        let createdDecks = 0;
        let createdCards = 0;

        for (const [key, value] of Object.entries(file.decks)) {
            if (!value.checked) continue;

            const deckName = key.split("-");
            const deckId = Math.floor(Math.random() * Date.now());

            commit("CREATE_DECK", {
                id: deckId,
                name: `Vocabulary - ${deckName[0]} to ${deckName[1]}`,
                favorite: false,
                cards_count: value.cards.filter((card) => card.checked).length,
            });

            createdDecks += 1;

            for (const card of value.cards) {
                if (!card.checked) continue;

                commit(
                    "card/CREATE_CARD",
                    { ...card, deck_id: deckId },
                    { root: true }
                );

                createdCards += 1;
            }
        }

        updateState();

        return `Created successfully ${createdDecks} decks and ${createdCards} cards`;
    },
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
    getLoading(state) {
        return state.loading;
    },
};
