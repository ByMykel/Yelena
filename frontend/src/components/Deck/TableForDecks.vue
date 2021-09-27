<template>
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-white">
            <tr>
                <th
                    scope="col"
                    class="py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase  px-7"
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
                    class="relative py-4 text-sm font-medium text-gray-900  px-7 whitespace-nowrap"
                >
                    <div
                        class="absolute inset-0 flex items-center justify-center  w-7"
                    >
                        <button
                            v-if="deck.favorite"
                            @click="handleFavorite(deck)"
                        >
                            <svg
                                class="w-5 h-5 text-yellow-300 cursor-pointer  hover:text-yellow-200"
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
                                class="w-5 h-5 text-gray-300 cursor-pointer  hover:text-yellow-300"
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
                    <action-update-deck
                        :class="{
                            'opacity-50': deck.due_cards_count == 0,
                        }"
                        :deck="deck"
                    ></action-update-deck>
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
                    class="flex items-center justify-end px-6 py-4 text-sm font-medium text-right  whitespace-nowrap"
                >
                    <icon-background
                        class="mr-2"
                        title="Study this deck"
                        :disabledIcon="deck.due_cards_count == 0"
                        @hover-icon="studySelectedDeck(deck)"
                        @click-icon="studySelectedDeck(deck)"
                    >
                        <hero-icons-outline
                            class="w-5 h-5"
                            name="play"
                        ></hero-icons-outline>
                    </icon-background>
                    <icon-background
                        class="mr-2"
                        title="Check Cards"
                        @click-icon="visitCardsPage(deck)"
                    >
                        <hero-icons-outline
                            class="w-5 h-5"
                            name="external-link"
                        ></hero-icons-outline>
                    </icon-background>
                    <action-delete-deck
                        :deck-id="deck.id"
                        @delete-deck="deleteDeck(deck.id)"
                    ></action-delete-deck>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapGetters } from "vuex";
import repository from "../../api/repository";
import router from "../../router";
import store from "../../store";
import HeroIconsOutline from "../HeroIconsOutline.vue";
import IconBackground from "../IconBackground.vue";
import ActionDeleteDeck from "./ActionDeleteDeck.vue";
import ActionUpdateDeck from "./ActionUpdateDeckName.vue";

export default {
    components: {
        ActionDeleteDeck,
        ActionUpdateDeck,
        IconBackground,
        HeroIconsOutline,
    },
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
        deleteDeck(id) {
            let page = router.currentRoute.params.page || 1;

            repository
                .deleteDeckById(id)
                .then(() => store.dispatch("deck/fetchDecks", { page }));
        },
        visitCardsPage(deck) {
            router.push({ path: `/decks/${deck.id}` });
        },
    },
};
</script>