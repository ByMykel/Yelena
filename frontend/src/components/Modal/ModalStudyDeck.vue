<template>
    <base-modal :show="show" v-slot:default="slotProps">
        <div
            class="flex justify-center"
            style="max-height: calc(100vh - 150px)"
        >
            <div class="w-full pb-4 overflow-hidden">
                <div
                    class="w-full px-4 py-3 font-bold text-center text-gray-900 border-b border-gray-200 dark:text-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 sm:px-6"
                >
                    {{ studyDeckTitle }}
                </div>
                <div
                    class="h-0.5 bg-blue-600 transition-width"
                    :style="`width: ${progressBarPercentage}%`"
                ></div>
                <div
                    v-if="finished"
                    class="relative flex flex-col items-center justify-center mb-32 text-lg font-semibold md:mb-48 dark:text-gray-200"
                >
                    <p class="mt-4 text-sm font-medium sm:text-base">
                        You have finished this deck for now.
                    </p>
                    <img
                        class="absolute top-2 md:top-0"
                        src="images/undraw_finish_line_katerina_limpitsouni_xy20.svg"
                        alt=""
                    />
                </div>
                <div
                    v-else
                    class="text-center"
                    style="max-height: calc(100% - 46px)"
                >
                    <div
                        class="mt-2 space-y-2 text-3xl font-bold mb-14 dark:text-gray-200"
                    >
                        <div v-if="showAnswer" class="px-2">
                            <div>{{ actualCard.answer }}</div>
                            <div class="text-xs font-medium text-purple-400">
                                answer
                            </div>
                        </div>
                        <div v-else class="px-2">
                            <div>{{ actualCard.question }}</div>
                            <div class="text-xs font-medium text-red-400">
                                question
                            </div>
                        </div>
                    </div>
                    <div>
                        <div v-if="!showAnswer" class="px-4">
                            <button
                                class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                @click="
                                    (showAnswer = true), slotProps.mountedHook()
                                "
                            >
                                Show
                            </button>
                        </div>
                        <div
                            v-else
                            class="flex flex-col justify-center px-4 space-y-2 md:space-y-0 md:flex-row md:space-x-2"
                        >
                            <button
                                v-for="option in options"
                                :key="option.number"
                                class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                @click="
                                    selectedOption(option),
                                        slotProps.mountedHook()
                                "
                            >
                                {{ option.name }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </base-modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import router from "../../router";
import BaseModal from "./BaseModal.vue";

export default {
    components: { BaseModal },
    props: {
        show: Boolean,
        idDeck: Number,
    },
    data() {
        return {
            finished: true,
            showAnswer: false,
            actualCard: null,
            initialDeck: [],
            numberCard: 0,
            dueCards: 0,
            options: [
                { number: 2, name: "Incorrect" },
                { number: 3, name: "Hard" },
                { number: 4, name: "Good" },
                { number: 5, name: "Easy" },
            ],
        };
    },
    computed: {
        ...mapGetters("study", ["getStudyDeck"]),
        studyDeckTitle() {
            return this.getStudyDeck?.name;
        },
        progressBarPercentage() {
            return Math.trunc((1 - this.dueCards / this.numberCard) * 100);
        },
    },
    watch: {
        show(value) {
            if (value) {
                this.showAnswer = false;
                this.initialDeck = [...this.getStudyDeck.cards];
                this.finished = this.getStudyDeck.cards.length === 0;
                this.actualCard = this.initialDeck.shift();
                this.numberCard = this.getStudyDeck.cards_count;
                this.dueCards = this.getStudyDeck.due_cards_count;
                return;
            }

            let page = router.currentRoute.params.page || 1;
            this.fetchDecks({ page });
        },
    },
    methods: {
        ...mapActions("deck", ["fetchDecks"]),
        ...mapActions("study", ["updateStudyCard"]),
        ...mapActions("modals", ["closeModals"]),
        selectedOption(option) {
            this.updateStudyCard({
                id: this.actualCard.id,
                data: {
                    name: option.name,
                    quality: option.number,
                },
            });

            this.dueCards--;

            if (this.initialDeck.length === 0) {
                this.finished = true;
                return;
            }

            this.nextCard();
        },
        nextCard() {
            this.showAnswer = false;
            this.actualCard = this.initialDeck.shift();
        },
    },
};
</script>