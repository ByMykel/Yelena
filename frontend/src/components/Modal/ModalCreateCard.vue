<template>
    <base-modal :show="show">
        <div class="px-4 py-4">
            <div class="mb-3">
                <label
                    for="select-deck"
                    class="block text-sm font-medium text-gray-700"
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
                    class="block text-sm font-medium text-gray-700"
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
                    class="block text-sm font-medium text-gray-700"
                    >Answer</label
                >
                <input
                    id="card-answer"
                    v-model="form.answer"
                    type="text"
                    class="flex-1 block w-full mt-1 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
        </div>
        <div
            class="px-4 py-3 text-right border-t border-gray-200 bg-gray-50 sm:px-6"
        >
            <button
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                @click="handleForm()"
            >
                Save
            </button>
        </div>
    </base-modal>
</template>

<script>
import { mapActions } from "vuex";
import BaseModal from "./BaseModal.vue";
import repository from "../../api/repository";

export default {
    components: { BaseModal },
    props: {
        show: Boolean,
    },
    data() {
        return {
            decksList: [],
            form: {
                deck_id: null,
                question: "",
                answer: "",
            },
        };
    },
    watch: {
        show(value) {
            if (!value) return;

            this.getDecksList();
        },
    },
    mounted() {
        this.getDecksList();
    },
    methods: {
        ...mapActions("card", ["createCard"]),
        handleForm() {
            this.createCard(this.form);
            this.form.question = "";
            this.form.answer = "";
        },
        getDecksList() {
            repository.getAllDecks().then((data) => {
                this.decksList = data.data.data;
                this.form.deck_id = this.decksList[0]?.id;
            });
        },
    },
};
</script>