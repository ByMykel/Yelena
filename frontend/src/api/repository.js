import api from "./api";

const BASE_URL = "http://localhost:8000/api";

export default {
    getCards() {
        return api.get(`${BASE_URL}/cards`);
    },

    getDecks() {
        return api.get(`${BASE_URL}/decks`);
    },

    getDeckById(id) {
        return api.get(`${BASE_URL}/decks/${id}`);
    },
};
