<template>
    <div>
        <div class="mb-10">
            <h1 class="text-4xl font-bold text-white">
                Deck #{{ getCardsDeck.id }}
            </h1>
            <p class="mt-0.5 mb-3 text-xl text-white text-bold">
                {{ getCardsDeck.name }}
            </p>
        </div>
        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                    class="inline-block min-w-full py-2 align-middle  sm:px-6 lg:px-8"
                >
                    <div
                        class="overflow-hidden border-b border-gray-200 shadow  sm:rounded-lg"
                    >
                        <table-for-cards></table-for-cards>
                        <div class="bg-white border-t border-gray-200">
                            <base-pagination
                                action="card/fetchCards"
                                :path="`/decks/${getCardsDeck.id}/`"
                                :meta="getCardsMeta"
                            ></base-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import BasePagination from "../../components/BasePagination.vue";
import TableForCards from "../../components/Card/TableForCards.vue";
import store from "../../store";

export default {
    components: { BasePagination, TableForCards },
    computed: {
        ...mapGetters("card", ["getCardsDeck", "getCardsMeta"]),
    },
    beforeRouteEnter(to, from, next) {
        const id = parseInt(to.params.id);
        const page = parseInt(to.query.page) || 1;

        store.dispatch("card/fetchCards", { id, page }).then(() => {
            to.params.id = id;
            to.params.page = page;
            next();
        });
    },
    beforeRouteUpdate(to, from, next) {
        const id = parseInt(to.params.id);
        const page = parseInt(to.query.page) || 1;

        store.dispatch("card/fetchCards", { id, page }).then(() => {
            to.params.id = id;
            to.params.page = page;
            next();
        });
    },
};
</script>
