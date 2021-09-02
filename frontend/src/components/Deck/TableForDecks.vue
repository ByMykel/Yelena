<template>
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-white">
            <tr>
                <th
                    scope="col"
                    class="py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase px-7"
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
                <th scope="col" class="relative px-6 py-3"></th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            <tr
                v-for="deck in getDecks"
                :key="deck.id"
                :class="[deck.due_cards_count == 0 ? 'bg-gray-50' : 'bg-white']"
            >
                <td
                    class="relative py-4 text-sm font-medium text-gray-900 px-7 whitespace-nowrap"
                >
                    <div
                        class="absolute inset-0 flex items-center justify-center w-7"
                    >
                        <button
                            v-if="deck.favorite"
                            @click="handleFavorite(deck)"
                        >
                            <svg
                                class="w-5 h-5 text-yellow-300 cursor-pointer hover:text-yellow-200"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                ></path>
                            </svg>
                        </button>
                        <button v-else @click="handleFavorite(deck)">
                            <svg
                                class="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <span
                        :class="{
                            'opacity-50': deck.due_cards_count == 0,
                        }"
                        >{{ deck.name }}</span
                    >
                </td>
                <td
                    class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    :class="{
                        'opacity-50': deck.due_cards_count == 0,
                    }"
                >
                    {{ deck.cards_count }}
                </td>
                <td
                    class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    :class="{
                        'opacity-50': deck.due_cards_count == 0,
                    }"
                >
                    {{ deck.due_cards_count }}
                </td>
                <td
                    class="flex items-center justify-end px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                >
                    <button
                        class="mr-4 font-semibold text-gray-900 cursor-pointer hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="deck.due_cards_count == 0"
                        title="Study this deck"
                        @click="studySelectedDeck(deck)"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            ></path>
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </button>
                    <router-link
                        :to="`/decks/${deck.id}`"
                        title="Check Cards"
                        class="mr-4 font-semibold text-gray-900 cursor-pointer hover:text-gray-600"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            ></path>
                        </svg>
                    </router-link>
                    <button
                        title="Delete deck"
                        class="ml-3 font-semibold text-red-600 cursor-pointer hover:text-red-900"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                        </svg>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapGetters } from "vuex";
import repository from "../../api/repository";
import store from "../../store";

export default {
    computed: {
        ...mapGetters("deck", ["getDecks"]),
    },
    methods: {
        studySelectedDeck(deck) {
            if (deck.due_cards_count == 0) return;

            store
                .dispatch("study/fetchStudyDeck", deck.id)
                .then(() => this.$emit("open-study-modal"));
        },
        handleFavorite(deck) {
            repository
                .handleFavoriteDeck(deck.id)
                .then(() => store.dispatch("deck/handleFavorite", deck.id));
        },
    },
};
</script>