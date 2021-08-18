<template>
    <div>
        <study-deck
            :show="showStudyModal"
            @close-modal="showStudyModal = false"
        ></study-deck>
        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                    class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                >
                    <div
                        class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
                    >
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                                    >
                                        Cards
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                                    >
                                        Due
                                    </th>
                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="deck in getDecks" :key="deck.id">
                                    <td
                                        class="relative px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        <div
                                            v-if="deck.due_cards_count == 0"
                                            class="absolute inset-0 flex items-center "
                                        >
                                            <span
                                                class="w-2 h-2 ml-2 bg-red-300 rounded-full top-5 left-1"
                                            ></span>
                                        </div>
                                        <span>{{ deck.name }}</span>
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                    >
                                        {{ deck.cards_count }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                    >
                                        {{ deck.due_cards_count }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                                    >
                                        <span
                                            class="mr-4 text-blue-600 cursor-pointer hover:text-blue-900"
                                            :class="{
                                                'opacity-50 cursor-not-allowed':
                                                    deck.due_cards_count == 0,
                                            }"
                                            @click="studySelectedDeck(deck)"
                                        >
                                            Study
                                        </span>
                                        <router-link
                                            :to="`/decks/${deck.id}`"
                                            class="mr-4 text-green-600 hover:text-green-900"
                                            >Check Cards</router-link
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
import StudyDeck from "../../components/StudyDeck.vue";

export default {
    components: { BasePagination, StudyDeck },
    data() {
        return {
            showStudyModal: false,
            selectedDeck: null,
        };
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
    methods: {
        studySelectedDeck(deck) {
            if (deck.due_cards_count == 0) return;

            store
                .dispatch("study/fetchStudyDeck", deck.id)
                .then(() => (this.showStudyModal = true));
        },
    },
};
</script>
