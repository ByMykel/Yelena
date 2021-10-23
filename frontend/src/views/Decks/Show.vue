<template>
    <div>
        <div v-if="getCardsDeck" class="px-2 mb-10 sm:px-0">
            <h1 class="text-4xl font-bold text-white">
                Deck #{{ getCardsDeck.id }}
            </h1>
            <p class="mt-0.5 mb-3 text-xl text-white text-bold">
                {{ getCardsDeck.name }}
            </p>
        </div>
        <div v-else class="px-2 mb-10 sm:px-0">
            <div
                class="block mb-1.5 bg-gray-400 rounded-sm h-9 animate-pulse"
                :style="{ maxWidth: getRandomWidth() + '%' }"
            ></div>
            <div
                class="block w-40 bg-gray-400 rounded-sm h-7 animate-pulse"
            ></div>
        </div>
        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                    class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                >
                    <div
                        class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
                    >
                        <loading-cards
                            v-if="getLoading && !getCards.length"
                        ></loading-cards>
                        <div v-else>
                            <div v-if="getCards.length">
                                <table-for-cards></table-for-cards>
                                <div class="bg-white border-t border-gray-200">
                                    <base-pagination
                                        v-if="getCardsMeta"
                                        action="card/fetchCards"
                                        :path="`/decks/${getCardsDeck.id}/`"
                                        :meta="getCardsMeta"
                                    ></base-pagination>
                                </div>
                            </div>
                            <div v-else>
                                <cards-empty-text></cards-empty-text>
                            </div>
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
import CardsEmptyText from "../../components/Card/CardsEmptyText.vue";
import TableForCards from "../../components/Card/CardsList.vue";
import LoadingCards from "../../components/Card/LoadingCards.vue";

export default {
    components: { BasePagination, TableForCards, LoadingCards, CardsEmptyText },
    computed: {
        ...mapGetters("card", [
            "getCardsDeck",
            "getCards",
            "getCardsMeta",
            "getLoading",
        ]),
    },
    beforeRouteEnter(to, from, next) {
        const id = parseInt(to.params.id);
        const page = parseInt(to.query.page) || 1;

        next((vm) => {
            vm.fetchCards({ id, page }).then(() => {
                to.params.id = id;
                to.params.page = page;
            });
        });
    },
    beforeRouteUpdate(to, from, next) {
        const id = parseInt(to.params.id);
        const page = parseInt(to.query.page) || 1;

        this.fetchCards({ id, page }).then(() => {
            to.params.id = id;
            to.params.page = page;
            next();
        });
    },
    methods: {
        ...mapActions("card", ["fetchCards"]),
        getRandomWidth() {
            return Math.floor(Math.random() * 50) + 30;
        }
    },
};
</script>
