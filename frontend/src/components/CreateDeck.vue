<template>
    <div>
        <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
                <label
                    for="deck-name"
                    class="block text-sm font-medium text-gray-700"
                    >Deck name</label
                >
                <input
                    id="deck-name"
                    v-model="deckForm.name"
                    type="text"
                    class="
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        flex-1
                        block
                        w-full
                        rounded-md
                        sm:text-sm
                        border-gray-300
                    "
                    placeholder="Vocabulary - Spanish to English"
                />
            </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
                class="
                    inline-flex
                    justify-center
                    py-2
                    px-4
                    border border-transparent
                    shadow-sm
                    text-sm
                    font-medium
                    rounded-md
                    text-white
                    bg-indigo-600
                    hover:bg-indigo-700
                    focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
                @click="handleForm()"
            >
                Save
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            deckForm: {
                name: "",
            },
        };
    },
    methods: {
        ...mapActions(["createDeck"]),
        handleForm() {
            this.createDeck(this.deckForm);
            this.deckForm.name = "";
        },
    },
};
</script>