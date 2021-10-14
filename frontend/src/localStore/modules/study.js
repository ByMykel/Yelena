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
    async fetchStudyDeck({ commit }, id) {
        await repository.getStudyDeck(id).then((data) => {
            commit("SET_STUDY_DECK", data.data.data);
        });
    },
};

export const getters = {
    getStudyDeck(state) {
        return state.study_deck;
    },
};
