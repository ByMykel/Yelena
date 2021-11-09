<template>
    <div class="p-5 bg-white sm:text-center dark:bg-gray-700">
        <h1
            class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
        >
            <span class="block xl:inline">No decks yet</span>
        </h1>
        <p
            class="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl"
        >
            To get started you can create some decks or let us to create an
            example for you.
        </p>
        <div class="mt-5 sm:mt-8 sm:flex sm:justify-center">
            <div class="rounded-md shadow">
                <button
                    class="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    @click="openModal('create_deck')"
                >
                    Create deck
                </button>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-3">
                <button
                    class="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md disabled:opacity-75 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    :disabled="loading"
                    @click="loadExampleData()"
                >
                    <svg
                        v-if="loading"
                        class="mr-2 fill-current animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                    >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" />
                    </svg>
                    <span>Load example</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        ...mapActions("modals", ["toggleModalVisibility"]),
        ...mapActions("deck", ["loadExampleDecks"]),
        openModal(modal) {
            this.toggleModalVisibility({
                modal,
                visibility: true,
            });
        },
        loadExampleData() {
            if (this.loading) return;

            this.loading = true;
            this.loadExampleDecks();
        },
    },
};
</script>