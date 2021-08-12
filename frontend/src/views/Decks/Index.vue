<template>
    <div>
        <div class="py-2 font-semibold text-xl">All your decks</div>
        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                    class="
                        py-2
                        align-middle
                        inline-block
                        min-w-full
                        sm:px-6
                        lg:px-8
                    "
                >
                    <div
                        class="
                            shadow
                            overflow-hidden
                            border-b border-gray-200
                            sm:rounded-lg
                        "
                    >
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        class="
                                            px-6
                                            py-3
                                            text-left text-xs
                                            font-medium
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        class="
                                            px-6
                                            py-3
                                            text-left text-xs
                                            font-medium
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >
                                        Cards
                                    </th>

                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="deck in getDecks" :key="deck.id">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        {{ deck.name }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        {{ deck.cards_count }}
                                    </td>

                                    <td
                                        class="
                                            px-6
                                            py-4
                                            whitespace-nowrap
                                            text-right text-sm
                                            font-medium
                                        "
                                    >
                                        <router-link
                                            :to="`/decks/${deck.id}`"
                                            class="
                                                mr-4
                                                text-green-600
                                                hover:text-green-900
                                            "
                                            >Study</router-link
                                        >
                                        <a
                                            href="#"
                                            class="
                                                text-indigo-600
                                                hover:text-indigo-900
                                            "
                                            >Edit</a
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="bg-white border-t border-gray-200">
                            <base-pagination
                                action="deck/fetchDecks"
                                path="/decks"
                                :meta="getDecksMeta"
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
import store from "../../store";
import BasePagination from "../../components/BasePagination.vue";

export default {
    components: { BasePagination },
    data() {
        return {};
    },
    computed: {
        ...mapGetters("deck", ["getDecks", "getDecksMeta"]),
    },
    beforeRouteEnter(to, from, next) {
        const currentPage = parseInt(to.query.page) || 1;

        store.dispatch("deck/fetchDecks", currentPage).then(() => {
            to.params.page = currentPage;
            next();
        });
    },
    methods: {},
};
</script>
