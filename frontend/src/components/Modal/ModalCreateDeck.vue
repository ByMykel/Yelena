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
                class="flex-1 block w-full mt-1 border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Vocabulary - Spanish to English"
            />
        </div>

        <div
            class="px-4 py-3 text-right border-t border-gray-200  bg-gray-50 sm:px-6"
        >
            <button
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm  disabled:cursor-wait disabled:opacity-80 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                :disabled="loading"
                @click="handleForm()"
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
import repository from "../../api/repository";
import BaseModal from "./BaseModal.vue";
import updateState from "../../store/updateState";

export default {
    components: { BaseModal },
    props: {
        show: Boolean,
    },
    data() {
        return {
            loading: false,
            deckForm: {
                name: "",
            },
        };
    },
    methods: {
        handleForm() {
            this.loading = true;

            repository.createDeck(this.deckForm).then(() => {
                this.deckForm.name = "";
                this.loading = false;

                updateState();
            });
        },
    },
};
</script>