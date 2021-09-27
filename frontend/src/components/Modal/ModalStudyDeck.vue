<template>
    <base-modal :show="show" v-slot:default="slotProps">
        <div
            class="flex justify-center h-56"
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
                class="flex flex-col items-center justify-between w-full pb-2"
            >
                <div
                    class="w-full px-4 py-3 font-bold text-center text-gray-900 border-b border-gray-200 bg-gray-50 sm:px-6"
                >
                    {{ studyDeckTitle }}
                </div>
                <div class="w-2/4 space-y-2 text-3xl font-bold text-center">
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
                        @click="(showAnswer = true), slotProps.mountedHook()"
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
    </base-modal>
</template>

<script>
import { mapGetters } from "vuex";
import repository from "../../api/repository";
import router from "../../router";
import store from "../../store";
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
        studyDeckTitle() {
            return `${this.getStudyDeck.name}`;
        },
    },
    watch: {
        show(value) {
            if (value) {
                this.showAnswer = false;
                this.initialDeck = [...this.getStudyDeck.cards];
                this.finished = this.getStudyDeck.cards.length === 0;
                this.actualCard = this.initialDeck.shift();
                return;
            }

            let page = router.currentRoute.params.page || 1;
            store.dispatch("deck/fetchDecks", { page });
        },
    },
    methods: {
        selectedOption(option) {
            repository.updateStudyCard(this.actualCard.id, {
                name: option.name,
                quality: option.number,
            });

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