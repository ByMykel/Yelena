<template>
    <base-modal :show="show">
        <div
            class="flex justify-center p-2 h-44"
            style="max-height: calc(100vh - 150px)"
        >
            <div
                v-if="finished"
                class="flex items-center text-lg font-semibold"
            >
                You have finished this deck for now.
            </div>
            <div
                v-else
                class="flex flex-col items-center justify-between w-full"
            >
                <div class="w-2/4 space-y-2 text-xl font-bold text-center">
                    <div class="px-2">
                        {{ actualCard.question }}
                    </div>
                    <div
                        class="w-full h-2 border-b border-gray-800 border-opacity-50 "
                    ></div>
                    <div v-if="showAnswer" class="px-2">
                        {{ actualCard.answer }}
                    </div>
                </div>
                <div>
                    <button
                        v-if="!showAnswer"
                        class="px-2 text-white bg-blue-600 rounded-sm hover:bg-blue-700"
                        @click="showAnswer = true"
                    >
                        Show
                    </button>
                    <div v-else class="space-x-2">
                        <button
                            v-for="option in [
                                { number: 2, name: 'Incorrect' },
                                { number: 3, name: 'Hard' },
                                { number: 4, name: 'Good' },
                                { number: 5, name: 'Easy' },
                            ]"
                            :key="option.number"
                            class="px-2 text-white bg-blue-600 rounded-sm hover:bg-blue-700"
                            @click="selectedOption(option.number)"
                        >
                            {{ option.name }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </base-modal>
</template>

<script>
import { mapGetters } from "vuex";
import repository from "../../api/repository";
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
        };
    },
    computed: {
        ...mapGetters("study", ["getStudyDeck"]),
    },
    watch: {
        show(value) {
            if (value) {
                this.showAnswer = false;
                this.initialDeck = [...this.getStudyDeck.cards];
                this.finished = this.getStudyDeck.cards.length === 0;
                this.actualCard = this.initialDeck.shift();
            }
        },
    },
    methods: {
        selectedOption(quality) {
            let data = this.superMemo(quality, this.actualCard);

            repository.updateStudyCard(this.actualCard.id, data);

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
        superMemo(quality, card) {
            let interval;
            let repetitions;
            let ease_factor;

            if (quality >= 3) {
                switch (card.repetitions) {
                    case 0:
                        interval = 1;
                        break;
                    case 1:
                        interval = 6;
                        break;
                    default:
                        interval = Math.round(card.interval * card.ease_factor);
                }

                repetitions = card.repetitions + 1;
            } else {
                repetitions = 0;
                interval = 1;
            }

            ease_factor =
                card.ease_factor +
                (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

            ease_factor = Math.max(ease_factor, 1.3);

            return { interval, repetitions, ease_factor };
        },
    },
};
</script>