<template>
    <div>
        <div class="px-2 mb-10 sm:px-0">
            <h1 class="text-4xl font-bold text-white">Statistics</h1>
        </div>
        <div class="space-y-4">
            <div
                class="overflow-hidden bg-white border-b border-gray-200 shadow dark:border-gray-700 dark:bg-gray-700 sm:rounded-lg"
            >
                <div
                    class="px-4 py-3 font-medium text-gray-700 border-b border-gray-200 dark:text-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 sm:px-6"
                >
                    Created cards this week
                </div>
                <div class="p-2 px-4 sm:px-6">
                    <created-cards-week
                        v-if="getCardStats"
                        :data="getCardStats.CreatedCardsWeekly"
                    ></created-cards-week>
                </div>
            </div>
            <div
                class="space-y-4 overflow-hidden text-gray-700 bg-white border-b border-gray-200 shadow dark:text-gray-200 dark:border-gray-700 dark:bg-gray-700 sm:rounded-lg"
            >
                <div
                    class="px-4 py-3 font-medium border-b border-gray-200 dark:border-gray-500 bg-gray-50 sm:px-6 dark:bg-gray-600"
                >
                    Studied cards by quality
                </div>
                <div class="p-2 px-4 sm:px-6">
                    <studied-cards-quality
                        v-if="getCardStats"
                        :data="getCardStats.StudiedCardsByQuality"
                    ></studied-cards-quality>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreatedCardsWeek from "../components/Charts/CreatedCardsWeek.vue";
import StudiedCardsQuality from "../components/Charts/StudiedCardsQuality.vue";

export default {
    name: "Stats",
    components: { CreatedCardsWeek, StudiedCardsQuality },
    computed: {
        ...mapGetters("stats", ["getCardStats"]),
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.fetchCardStats();
        });
    },
    beforeRouteUpdate(to, from, next) {
        this.fetchCardStats().then(() => next());
    },
    methods: {
        ...mapActions("stats", ["fetchCardStats"]),
    },
};
</script>
