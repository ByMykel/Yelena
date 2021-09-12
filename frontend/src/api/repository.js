import api from "./api";

const BASE_URL = "http://localhost:8000/api";

export default {
    // Decks
    async getAllDecks() {
        return await api.get(`${BASE_URL}/decks_list`);
    },

    async getDecks(page) {
        return await api.get(`${BASE_URL}/decks/?page=${page}`);
    },

    async getDeckById(id) {
        return await api.get(`${BASE_URL}/decks/${id}`);
    },

    async createDeck(data) {
        return await api.post(`${BASE_URL}/decks/store`, data);
    },

    async handleFavoriteDeck(id) {
        return await api.post(`${BASE_URL}/decks/${id}/favorite`);
    },

    async deleteDeckById(id) {
        return await api.delete(`${BASE_URL}/decks/${id}/destroy`)
    },

    // Cards
    async getCardsByDeckId(id, page) {
        return await api.get(`${BASE_URL}/decks/${id}/?page=${page}`);
    },

    async createCard(data) {
        return await api.post(`${BASE_URL}/cards/store`, data);
    },

    async handleFavoriteCard(id) {
        return await api.post(`${BASE_URL}/cards/${id}/favorite`);
    },

    async deleteCardById(id) {
        return await api.delete(`${BASE_URL}/cards/${id}/destroy`)
    },

    // Study
    async getStudyDeck(id) {
        return await api.get(`${BASE_URL}/decks/${id}/study`);
    },

    async updateStudyCard(id, data) {
        return await api.put(`${BASE_URL}/cards/${id}/study/update`, data);
    },

    // Import deck
    async importDeck(data) {
        return await api.post(`${BASE_URL}/import_deck`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};
