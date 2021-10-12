<template>
    <base-modal :show="show" v-slot:default="slotProps">
        <div
            class="flex justify-center h-56"
            style="max-height: calc(100vh - 150px)"
        >
            <div class="w-full pb-2">
                <div
                    class="w-full px-4 py-3 font-bold text-center text-gray-900 border-b border-gray-200 bg-gray-50 sm:px-6"
                >
                    {{ studyDeckTitle }}
                </div>
                <div
                    class="h-0.5 bg-blue-600 transition-width"
                    :style="`width: ${progressBarPercentage}%`"
                ></div>
                <div
                    v-if="finished"
                    class="flex items-center justify-center mt-5 text-lg font-semibold "
                >
                    You have finished this deck for now.
                </div>
                <div
                    v-else
                    class="flex flex-col items-center justify-between h-full py-2 "
                    style="max-height: calc(100% - 46px)"
                >
                    <div
                        class="w-2/4 mt-2 space-y-2 text-3xl font-bold text-center "
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
                        <button
                            v-if="!showAnswer"
                            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            @click="
                                (showAnswer = true), slotProps.mountedHook()
                            "
                        >
                            Show
                        </button>
                        <div v-else class="space-x-2">
                            <button
                                v-for="option in options"
                                :key="option.number"
                                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
import repository from "../../api/repository";
import router from "../../router";
import BaseModal from "./BaseModal.vue";

export default {
    components: { BaseModal },
    props: {
        show: Boolean,
        idDeck: Number
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
                { number: 5, name: "Easy" }
            ]
        };
    },
    computed: {
        ...mapGetters("study", ["getStudyDeck"]),
        studyDeckTitle() {
            return this.getStudyDeck?.name;
        },
        progressBarPercentage() {
            return Math.trunc((1 - this.dueCards / this.numberCard) * 100);
        }
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
            this.fetchDecks({ page })
        }
    },
    methods: {
        ...mapActions("deck", ["fetchDecks"]),
        selectedOption(option) {
            repository.updateStudyCard(this.actualCard.id, {
                name: option.name,
                quality: option.number
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
        }
    }
};
</script>