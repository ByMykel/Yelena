<template>
    <div>
        <div class="px-2 mb-10 sm:px-0">
            <h1 class="text-4xl font-bold text-white">Manage Decks</h1>
            <p class="mt-0.5 mb-3 text-xl text-white text-bold">
                These are all your decks.
            </p>
        </div>
        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                    class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                >
                    <div
                        class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
                    >
                        <loading-decks v-if="getLoading && !getDecks.length"></loading-decks>
                        <div v-else>
                            <div v-if="getDecks.length">
                                <table-for-decks></table-for-decks>
                                <div class="bg-white border-t border-gray-200">
                                    <base-pagination
                                        v-if="getDecksMeta"
                                        action="deck/fetchDecks"
                                        path="/"
                                        :meta="getDecksMeta"
                                    ></base-pagination>
                                </div>
                            </div>
                            <decks-empty-text v-else></decks-empty-text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BasePagination from "../../components/BasePagination.vue";
import TableForDecks from "../../components/Deck/DecksList.vue";
import LoadingDecks from "../../components/Deck/LoadingDecks.vue";
import DecksEmptyText from "../../components/Deck/DecksEmptyText.vue";

export default {
    components: { BasePagination, TableForDecks, LoadingDecks, DecksEmptyText },
    computed: {
        ...mapGetters("deck", ["getDecksMeta", "getDecks", "getLoading"]),
        ...mapGetters("modals", ["getModalVisibility"]),
    },
    beforeRouteEnter(to, from, next) {
        const currentPage = parseInt(to.query.page) || 1;

        next((vm) => {
            vm.fetchDecks({ page: currentPage }).then(() => {
                to.params.page = currentPage;
            });
        });
    },
    beforeRouteUpdate(to, from, next) {
        const currentPage = parseInt(to.query.page) || 1;

        this.fetchDecks({ page: currentPage }).then(() => {
            to.params.page = currentPage;
            next();
        });
    },
    methods: {
        ...mapActions("deck", ["fetchDecks"]),
    },
};
</script>
