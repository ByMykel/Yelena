<template>
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-white">
            <tr>
                <th
                    scope="col"
                    class="px-8 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                >
                    Question
                </th>
                <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                >
                    Answer
                </th>
                <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                >
                    Next review
                </th>
                <th scope="col" class="relative px-6 py-3"></th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            <tr
                v-for="card in getCards"
                :key="card.id"
                :class="[wasReviewed(card) ? 'bg-gray-50' : 'bg-white']"
            >
                <td
                    class="relative px-8 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
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
                </td>
                <td
                    class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                >
                    <action-update-card-answer
                        :class="{
                            'opacity-50': wasReviewed(card),
                        }"
                        :card="card"
                    ></action-update-card-answer>
                </td>
                <td
                    class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    :class="{
                        'opacity-50': wasReviewed(card),
                    }"
                >
                    {{ card.review_date_human }}
                </td>
                <td
                    class="flex items-center justify-end px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                >
                    <action-delete-card
                        :card-id="card.id"
                        @delete-card="deleteCard(card.id)"
                    ></action-delete-card>
                </td>
            </tr>
        </tbody>
    </table>
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
        ...mapActions("card", ["handleFavorite", "fetchCards"]),
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