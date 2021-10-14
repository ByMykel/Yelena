const getDefaultState = () => {
    return {
        create_deck: false,
        create_card: false,
        import_card: false,
        study_modal: false
    };
};

export const namespaced = true;

export const state = getDefaultState();

export const mutations = {
    SET_MODAL_VISIBILITY(state, { modal, visibility }) {
        state[modal] = visibility;
    },
    SET_MODALS_VISIBILITY_FALSE(state) {
        Object.assign(state, getDefaultState());
    },
};

export const actions = {
    toggleModalVisibility({ commit }, { modal, visibility }) {
        commit("SET_MODAL_VISIBILITY", { modal, visibility });
    },
    closeModals({ commit }) {
        commit("SET_MODALS_VISIBILITY_FALSE");
    },
};

export const getters = {
    getModalVisibility: (state) => (modal) => {
        return state[modal];
    },
};
