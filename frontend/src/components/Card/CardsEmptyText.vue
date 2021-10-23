<template>
    <div class="p-5 bg-white sm:text-center">
        <h1
            class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
        >
            <span class="block xl:inline">No cards yet</span>
        </h1>
        <p
            class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl"
        >
            To get started create some cards.
        </p>
        <div class="mt-5 sm:mt-8 sm:flex sm:justify-center">
            <div class="rounded-md shadow">
                <button
                    class="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    @click="openModal('create_card')"
                >
                    Create cards
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