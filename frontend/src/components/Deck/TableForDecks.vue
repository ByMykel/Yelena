<template>
    <div class="divide-y divide-gray-200">
        <div
            class="flex flex-col bg-white sm:flex-row"
            v-for="deck in getDecks"
            :key="deck.id"
        >
            <div
                class="relative flex items-center px-8 py-4 text-sm font-medium text-gray-900 sm:w-3/5 whitespace-nowrap"
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
            </div>
            <div
                class="flex items-center justify-between px-2 py-0 pb-2 sm:py-2 sm:w-2/5"
            >
                <div
                    class="ml-6 text-sm text-gray-500 sm:ml-0 whitespace-nowrap"
                    :class="{
                        'opacity-50': deck.due_cards_count == 0,
                    }"
                >
                    {{ deck.due_cards_count }}/{{ deck.cards_count }}
                </div>
                <div
                    class="flex items-center justify-end text-sm font-medium text-right whitespace-nowrap"
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
                </div>
            </div>
        </div>
    </div>
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
        ...mapActions("deck", ["handleFavorite", "deleteDeckById"]),
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