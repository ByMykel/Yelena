<template>
    <div class="divide-y divide-gray-200">
        <div
            class="grid grid-cols-1 bg-white sm:grid-cols-6"
            v-for="card in getCards"
            :key="card.id"
            :class="[wasReviewed(card) ? 'bg-gray-50' : 'bg-white']"
        >
            <div
                class="relative flex items-center col-span-2 px-8 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
            >
                <div
                    class="absolute inset-0 flex items-center justify-center w-8 "
                >
                    <icon-background
                        color="yellow"
                        @click-icon="handleFavoriteCard(card)"
                    >
                        <hero-icons-solid
                            v-if="card.favorite"
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
                <action-update-card-question
                    :class="{
                        'opacity-50': wasReviewed(card),
                    }"
                    :card="card"
                ></action-update-card-question>
            </div>
            <div
                class="relative flex items-center col-span-2 px-8 pb-4 -mt-2 text-sm font-medium text-gray-900 sm:mt-0 sm:py-4 whitespace-nowrap"
            >
                <action-update-card-answer
                    :class="{
                        'opacity-50': wasReviewed(card),
                    }"
                    :card="card"
                ></action-update-card-answer>
            </div>
            <div
                class="flex items-center justify-between col-span-2 px-2 py-0 pb-2 sm:py-2"
            >
                <div
                    class="ml-6 text-sm text-gray-500 truncate sm:ml-0 whitespace-nowrap"
                    :class="{
                        'opacity-50': wasReviewed(card),
                    }"
                >
                    {{ card.review_date_human }}
                </div>
                <div
                    class="flex items-center justify-end text-sm font-medium text-right whitespace-nowrap"
                >
                    <action-delete-card
                        :card-id="card.id"
                        @delete-card="deleteCard(card.id)"
                    ></action-delete-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import HeroIconsOutline from "../HeroIconsOutline.vue";
import HeroIconsSolid from "../HeroIconsSolid.vue";
import IconBackground from "../IconBackground.vue";
import ActionDeleteCard from "./ActionDeleteCard.vue";
import ActionUpdateCardAnswer from "./ActionUpdateCardAnswer.vue";
import ActionUpdateCardQuestion from "./ActionUpdateCardQuestion.vue";

export default {
    components: {
        ActionDeleteCard,
        ActionUpdateCardQuestion,
        ActionUpdateCardAnswer,
        HeroIconsSolid,
        HeroIconsOutline,
        IconBackground,
    },
    computed: {
        ...mapGetters("card", ["getCards", "getCardsDeck"]),
    },
    methods: {
        ...mapActions("card", ["handleFavorite", "deleteCardById"]),
        wasReviewed(card) {
            if (card.review_date_human === "Has never been reviewed") {
                return false;
            }

            if (card.review_date_human === "Review now") {
                return false;
            }

            return true;
        },
        handleFavoriteCard(card) {
            this.handleFavorite(card.id);
        },
        deleteCard(id) {
            this.deleteCardById(id);
        },
    },
};
</script>