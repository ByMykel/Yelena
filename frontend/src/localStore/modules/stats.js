export const namespaced = true;

const currentWeek = () => {
    let date = new Date();
    let firstDay =
        date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

    let week = [];

    for (; firstDay < 8; firstDay++) {
        date.setDate(firstDay);
        week.push(date.toISOString().slice(0, 10));
    }

    return week;
};

export const state = {
    card_stats: {
        StudiedCardsByQuality: [
            {
                quality: "Incorrect",
                cards_count: 0,
            },
            {
                quality: "Hard",
                cards_count: 0,
            },
            {
                quality: "Good",
                cards_count: 0,
            },
            {
                quality: "Easy",
                cards_count: 0,
            },
        ],
        CreatedCardsWeekly: [],
    },
};

export const mutations = {
    SET_STATE(state, data) {
        Object.assign(state, data);
    },
    SET_CREATED_CARDS_WEEKLY(state, stats) {
        state.card_stats.CreatedCardsWeekly = stats;
    },
    SET_STUDIED_CARD(state, quality) {
        state.card_stats.StudiedCardsByQuality.map((item) => {
            if (item.quality === quality) {
                item.cards_count += 1;
            }
        });
    },
};

export const actions = {
    setState({ commit }, data) {
        commit("SET_STATE", data);
    },
    fetchCardStats({ commit, rootState }) {
        const cards = rootState.card.cards.reduce(
            (cards, card) => ({
                ...cards,
                [new Date(card.created_at).toISOString().slice(0, 10)]:
                    (cards[
                        new Date(card.created_at).toISOString().slice(0, 10)
                    ] || 0) + 1,
            }),
            {}
        );

        let CreatedCardsWeekly = [];

        for (let day of currentWeek()) {
            CreatedCardsWeekly.push({
                day: CreatedCardsWeekly.length + 1,
                date: day,
                created_cards_count: cards[day] ?? 0,
            });
        }

        commit("SET_CREATED_CARDS_WEEKLY", CreatedCardsWeekly);
    },
    setStudiedCard({ commit }, quality) {
        commit("SET_STUDIED_CARD", quality);
    },
};

export const getters = {
    getCardStats(state) {
        return state.card_stats;
    },
};
