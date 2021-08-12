<template>
    <Modal :show="show">
        <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
                <div class="col-span-6 sm:col-span-3">
                    <label
                        for="select-deck"
                        class="block text-sm font-medium text-gray-700"
                        >Deck</label
                    >
                    <select
                        id="select-deck"
                        v-model="form.deck_id"
                        name="select-deck"
                        class="
                            mt-1
                            block
                            w-full
                            py-2
                            px-3
                            border border-gray-300
                            bg-white
                            rounded-md
                            shadow-sm
                            focus:outline-none
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            sm:text-sm
                        "
                    >
                        <!-- <option :value="null">Default</option> -->
                        <option
                            v-for="deck in decksList"
                            :key="deck.id"
                            :value="deck.id"
                        >
                            {{ deck.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-span-3 sm:col-span-2">
                <label
                    for="card-question"
                    class="block text-sm font-medium text-gray-700"
                    >question</label
                >
                <input
                    id="card-question"
                    v-model="form.question"
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
                />
            </div>
            <div class="col-span-3 sm:col-span-2">
                <label
                    for="card-answer"
                    class="block text-sm font-medium text-gray-700"
                    >answer</label
                >
                <input
                    id="card-answer"
                    v-model="form.answer"
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
    </Modal>
</template>

<script>
import { mapActions } from "vuex";
import Modal from "../components/Modal.vue";
import repository from "../api/repository";

export default {
    components: { Modal },
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