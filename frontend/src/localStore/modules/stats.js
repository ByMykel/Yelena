export const namespaced = true;

export const state = {
    card_stats: null,
};

export const mutations = {
    SET_CARD_STATS(state, stats) {
        state.card_stats = stats;
    },
};

export const actions = {
    async fetchCardStats({ commit }) {
        commit("SET_CARD_STATS", null);
    },
};

export const getters = {
    getCardStats(state) {
        return state.card_stats;
    },
};
