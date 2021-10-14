<template>
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-white">
            <tr>
                <th
                    scope="col"
                    class="px-8 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
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
                    class="relative px-8 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                >
                    <div
                        class="absolute inset-0 flex items-center justify-center w-8 "
                    >
                        <icon-background
                            color="yellow"
                            @click-icon="handleFavoriteDeck(deck)"
                        >
                            <hero-icons-solid
                                v-if="deck.favorite"
                                class="w-5 h-5 text-yellow-400"
                                name="star"
                            ></hero-icons-solid>
                            <hero-icons-outline
                                v-else
                                class="w-5 h-5 text-yellow-400"
                                name="star"
                            ></hero-icons-outline>
                        </icon-background>
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
                    class="flex items-center justify-end px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                >
                    <icon-background
                        class="mr-2"
                        title="Study this deck"
                        :disabledIcon="deck.due_cards_count == 0"
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
import { mapActions, mapGetters } from "vuex";
import router from "../../router";
import HeroIconsOutline from "../HeroIconsOutline.vue";
import HeroIconsSolid from "../HeroIconsSolid.vue";
import IconBackground from "../IconBackground.vue";
import ActionDeleteDeck from "./ActionDeleteDeck.vue";
import ActionUpdateDeck from "./ActionUpdateDeckName.vue";

export default {
    components: {
        ActionDeleteDeck,
        ActionUpdateDeck,
        IconBackground,
        HeroIconsOutline,
        HeroIconsSolid,
    },
    computed: {
        ...mapGetters("deck", ["getDecks"]),
    },
    methods: {
        ...mapActions("deck", [
            "handleFavorite",
            "fetchDecks",
            "deleteDeckById",
        ]),
        ...mapActions("study", ["fetchStudyDeck"]),
        ...mapActions("modals", ["toggleModalVisibility"]),
        studySelectedDeck(deck) {
            if (deck.due_cards_count == 0) return;

            this.fetchStudyDeck(deck.id).then(() => {
                this.toggleModalVisibility({
                    modal: "study_modal",
                    visibility: true,
                });
            });
        },
        handleFavoriteDeck(deck) {
            this.handleFavorite(deck.id);
        },
        deleteDeck(id) {
            this.deleteDeckById(id);
        },
        visitCardsPage(deck) {
            router.push({ path: `/decks/${deck.id}` });
        },
    },
};
</script>