<template>
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-white">
            <tr>
                <th
                    scope="col"
                    class="py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase  px-7"
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
                    class="relative py-4 text-sm font-medium text-gray-900  px-7 whitespace-nowrap"
                >
                    <div
                        class="absolute inset-0 flex items-center justify-center  w-7"
                    >
                        <button
                            v-if="card.favorite"
                            @click="handleFavorite(card)"
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
                        <button v-else @click="handleFavorite(card)">
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
                    <action-update-card-question
                        :class="{
                            'opacity-50': wasReviewed(card),
                        }"
                        :card="card"
                    ></action-update-card-question>
                </td>
                <td
                    class="px-6 py-4 text-sm font-medium text-gray-900  whitespace-nowrap"
                    :class="{
                        'opacity-50': wasReviewed(card),
                    }"
                >
                    {{ card.answer }}
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
                    class="flex items-center justify-end px-6 py-4 text-sm font-medium text-right  whitespace-nowrap"
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
import { mapGetters } from "vuex";
import repository from "../../api/repository";
import router from "../../router";
import store from "../../store";
import ActionDeleteCard from "./ActionDeleteCard.vue";
import ActionUpdateCardQuestion from "./ActionUpdateCardQuestion.vue";

export default {
    components: { ActionDeleteCard, ActionUpdateCardQuestion },
    computed: {
        ...mapGetters("card", ["getCards", "getCardsDeck"]),
    },
    methods: {
        wasReviewed(card) {
            if (card.review_date_human === "Has never been reviewed") {
                return false;
            }

            if (card.review_date_human === "Review now") {
                return false;
            }

            return true;
        },
        handleFavorite(card) {
            repository
                .handleFavoriteCard(card.id)
                .then(() => store.dispatch("card/handleFavorite", card.id));
        },
        deleteCard(id) {
            let deckId = this.getCardsDeck.id;
            let page = router.currentRoute.params.page || 1;

            repository
                .deleteCardById(id)
                .then(() =>
                    store.dispatch("card/fetchCards", { id: deckId, page })
                );
        },
    },
};
</script>