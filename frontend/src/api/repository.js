import api from "./api";

const BASE_URL = "http://localhost:8000/api";

export default {
    // Decks
    getAllDecks() {
        return api.get(`${BASE_URL}/decks_list`);
    },
    getDecks(page) {
        return api.get(`${BASE_URL}/decks/?page=${page}`);
    },
    getDeckById(id) {
        return api.get(`${BASE_URL}/decks/${id}`);
    },
    createDeck(data) {
        return api.post(`${BASE_URL}/decks/store`, data);
    },
    // Cards
    getCardsByDeckId(id, page) {
        return api.get(`${BASE_URL}/decks/${id}/?page=${page}`);
    },
    createCard(data) {
        return api.post(`${BASE_URL}/cards/store`, data);
    },
};
