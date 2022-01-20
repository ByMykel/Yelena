<template>
    <base-modal :show="show" v-slot:default="slotProps">
        <div class="px-4 py-4 space-y-4">
            <div class="mb-3">
                <label
                    for="select-deck"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >Deck</label
                >
                <select
                    id="select-deck"
                    v-model="form.deck_id"
                    name="select-deck"
                    class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    <option
                        v-for="deck in decksList"
                        :key="deck.id"
                        :value="deck.id"
                    >
                        {{ deck.name }}
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <label
                    for="card-question"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >Question</label
                >
                <input
                    id="card-question"
                    v-model="form.question"
                    type="text"
                    class="flex-1 block w-full mt-1 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div class="">
                <label
                    for="card-answer"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >Answer</label
                >
                <input
                    id="card-answer"
                    v-model="form.answer"
                    type="text"
                    class="flex-1 block w-full mt-1 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div class="flex items-start">
                <div class="flex items-center h-5">
                    <input
                        id="favorite-card"
                        v-model="form.favorite"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                </div>
                <div class="ml-3 text-sm">
                    <label for="favorite-card" class="font-medium text-gray-700 dark:text-gray-200"
                        >Favorite</label
                    >
                </div>
            </div>
        </div>
        <div
            class="px-4 py-3 text-right border-t border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 sm:px-6"
        >
            <button
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm disabled:cursor-wait disabled:opacity-80 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
            decksList: [],
            form: {
                deck_id: null,
                question: "",
                answer: "",
                favorite: false,
            },
        };
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
    mounted() {
        this.getDecksList();
    },
    methods: {
        ...mapActions("card", ["createCard"]),
        ...mapActions("deck", ["getAllDecksName"]),
        handleForm() {
            this.loading = true;

            this.createCard(this.form).then(() => {
                this.form.question = "";
                this.form.answer = "";
                this.form.favorite = false;
                this.loading = false;
            });
        },
        getDecksList() {
            this.getAllDecksName().then((data) => {
                this.decksList = data.data.data;
                this.form.deck_id = this.decksList[0]?.id;
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
        },
    },
};
</script>