<template>
    <base-modal :show="show" v-slot:default="slotProps">
        <div class="px-4 py-4 space-y-4">
            <div class="mb-3">
                <div>
                    <label
                        class="block text-sm font-medium text-gray-700  dark:text-gray-200"
                    >
                        Deck
                    </label>
                    <div class="relative w-full mt-1">
                        <div class="relative">
                            <input
                                ref="searchDeck"
                                type="text"
                                v-model="query"
                                class="relative w-full py-2 pr-10 text-left bg-white border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                :class="[
                                    formErrors.deck_id
                                        ? 'border-red-500 border-2'
                                        : 'border',
                                ]"
                                @keydown="showDecksList = true"
                            />
                            <button
                                ref="openDeckSelector"
                                type="button"
                                class="absolute inset-y-0 right-0 flex items-center px-2 ml-3 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                @click="showDecksList = !showDecksList"
                            >
                                <span>
                                    <svg
                                        class="w-5 h-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <ul
                            ref="decksList"
                            v-show="showDecksList"
                            class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg  deck-list max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                            <li
                                v-for="deck in filteredDecks"
                                :key="deck.id"
                                :value="deck.id"
                                class="relative py-2 pl-3 text-gray-900 cursor-pointer select-none  hover:text-white hover:bg-blue-600 pr-9 group"
                                @click="selectDeck(deck)"
                            >
                                <div class="flex items-center">
                                    <span>
                                        <svg
                                            v-if="deck.favorite"
                                            class="w-5 h-5 text-yellow-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            ></path>
                                        </svg>
                                    </span>
                                    <span
                                        class="block ml-3 font-normal truncate"
                                        :class="[
                                            {
                                                'font-semibold':
                                                    deck.id === form.deck_id,
                                            },
                                            {
                                                'pl-5': !deck.favorite,
                                            },
                                        ]"
                                    >
                                        {{ deck.name }}
                                    </span>
                                </div>
                                <span
                                    v-if="deck.id === form.deck_id"
                                    class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600  group-hover:text-white"
                                >
                                    <svg
                                        class="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </li>
                            <li
                                v-if="filteredDecks.length === 0"
                                class="relative py-2 pl-3 text-center text-gray-600 cursor-pointer select-none  pr-9"
                            >
                                No decks found
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <label
                    for="card-question"
                    class="block text-sm font-medium text-gray-700  dark:text-gray-200"
                    >Question</label
                >
                <input
                    id="card-question"
                    v-model="form.question"
                    type="text"
                    class="flex-1 block w-full mt-1 border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    :class="{ 'border-red-500 border-2': formErrors.question }"
                />
            </div>
            <div class="">
                <label
                    for="card-answer"
                    class="block text-sm font-medium text-gray-700  dark:text-gray-200"
                    >Answer</label
                >
                <input
                    id="card-answer"
                    v-model="form.answer"
                    type="text"
                    class="flex-1 block w-full mt-1 border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    :class="{ 'border-red-500 border-2': formErrors.answer }"
                />
            </div>
            <div class="flex items-start">
                <div class="flex items-center h-5">
                    <input
                        id="favorite-card"
                        v-model="form.favorite"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 border-gray-300 rounded  focus:ring-blue-500"
                    />
                </div>
                <div class="ml-3 text-sm">
                    <label
                        for="favorite-card"
                        class="font-medium text-gray-700 dark:text-gray-200"
                        >Favorite</label
                    >
                </div>
            </div>
        </div>
        <div
            class="px-4 py-3 text-right border-t border-gray-200  dark:border-gray-500 bg-gray-50 dark:bg-gray-600 sm:px-6"
        >
            <button
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm  disabled:cursor-wait disabled:opacity-80 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                :disabled="loading"
                @click="handleForm(), slotProps.mountedHook()"
            >
                <svg
                    v-if="loading"
                    class="text-white fill-current animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" />
                </svg>
                <span v-else>Save</span>
            </button>
        </div>
    </base-modal>
</template>

<script>
import BaseModal from "./BaseModal.vue";
import { mapActions } from "vuex";

export default {
    components: { BaseModal },
    props: {
        show: Boolean,
    },
    data() {
        return {
            loading: false,
            showDecksList: false,
            decksList: [],
            selectedDeck: null,
            query: "",
            form: {
                deck_id: null,
                question: "",
                answer: "",
                favorite: false,
            },
            formErrors: {
                deck_id: false,
                question: false,
                answer: false,
            },
        };
    },
    computed: {
        getSelectedDeckName() {
            return this.selectedDeck?.name ?? "Select a deck";
        },
        filteredDecks() {
            return this.decksList.filter((deck) => {
                return deck.name
                    .toLowerCase()
                    .includes(this.query.toLowerCase());
            });
        },
    },
    watch: {
        show(value) {
            if (!value) {
                setTimeout(() => this.resetData(), 200);
                return;
            }

            this.getDecksList();
        },
    },
    beforeMount() {
        window.addEventListener("click", this.clickOutsideSelector);
    },
    mounted() {
        this.getDecksList();
    },
    beforeDestroy() {
        window.removeEventListener("click", this.clickOutsideSelector);
    },
    methods: {
        ...mapActions("card", ["createCard"]),
        ...mapActions("deck", ["getAllDecksName"]),
        isNotFullfilled() {
            let isNotFullfilled = false;

            if (this.form.deck_id === null) {
                this.formErrors.deck_id = true;
                isNotFullfilled = true;
            } else {
                this.formErrors.deck_id = false;
            }

            if (this.form.question === "") {
                this.formErrors.question = true;
                isNotFullfilled = true;
            } else {
                this.formErrors.question = false;
            }

            if (this.form.answer === "") {
                this.formErrors.answer = true;
                isNotFullfilled = true;
            } else {
                this.formErrors.answer = false;
            }

            return isNotFullfilled;
        },
        handleForm() {
            if (this.isNotFullfilled(this.form)) return;

            this.loading = true;

            this.createCard(this.form).then(() => {
                this.resetData();
            });
        },
        getDecksList() {
            this.getAllDecksName().then((data) => {
                this.decksList = data.data.data;
            });
        },
        resetData() {
            this.loading = false;
            this.decksList = [];
            this.form = {
                deck_id: null,
                question: "",
                answer: "",
                favorite: false,
            };
            this.selectedDeck = null;
            this.formErrors = {
                deck_id: false,
                question: false,
                answer: false,
            };
            this.query = "";
        },
        selectDeck(deck) {
            this.query = deck.name;
            this.selectedDeck = deck;
            this.form.deck_id = deck.id;
            this.showDecksList = false;
        },
        clickOutsideSelector(e) {
            if (this.$refs.openDeckSelector.contains(e.target)) {
                return;
            }

            if (this.$refs.searchDeck.contains(e.target)) {
                return;
            }

            if (
                this.showDecksList &&
                !this.$refs.decksList.contains(e.target)
            ) {
                this.showDecksList = false;
            }
        },
    },
};
</script>