export const namespaced = true;

export const state = {
    theme: 'light',
};

export const mutations = {
    SET_THEME(state, theme) {
        state.theme = theme;
    },
    SET_STATE(state, data) {
        Object.assign(state, data);
    },
};

export const actions = {
    setState({ commit }, data) {
        commit("SET_STATE", data);
    },
    changeTheme({ commit }, theme) {
        commit("SET_THEME", theme)
    }
};

export const getters = {
    getTheme(state) {
        return state.theme;
    },
};
