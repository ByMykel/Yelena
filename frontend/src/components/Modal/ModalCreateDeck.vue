<template>
    <base-modal :show="show">
        <div class="px-4 py-4">
            <label
                for="deck-name"
                class="block text-sm font-medium text-gray-700"
                >Deck name</label
            >
            <input
                id="deck-name"
                v-model="deckForm.name"
                type="text"
                class="flex-1 block w-full mt-1 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Vocabulary - Spanish to English"
            />
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

export default {
    components: { BaseModal },
    props: {
        show: Boolean,
    },
    data() {
        return {
            deckForm: {
                name: "",
            },
        };
    },
    methods: {
        ...mapActions("deck", ["createDeck"]),
        handleForm() {
            this.createDeck(this.deckForm);
            this.deckForm.name = "";
        },
    },
};
</script>