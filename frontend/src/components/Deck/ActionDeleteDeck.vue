<template>
    <button
        class="relative block ml-3 focus:outline-none group"
        @click="deleteDeck()"
    >
        <div class="flex flex-row items-center justify-center h-full">
            <div
                class="transition duration-300 ease-out transform scale-0 bg-transparent bg-red-600 rounded-full opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:scale-100 group-focus:scale-100 w-7 h-7 bg-opacity-20"
            ></div>
        </div>
        <div class="absolute inset-0">
            <div
                class="flex items-center justify-center w-full h-full text-gray-900 group-hover:text-red-600 group-focus:text-red-600"
            >
                <svg
                    v-if="confirmed"
                    title="Confirm to delete this deck"
                    class="w-5 h-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                <svg
                    v-else
                    title="Delete this deck"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                </svg>
            </div>
        </div>
    </button>
</template>

<script>
export default {
    props: {
        deckId: Number,
    },
    data() {
        return {
            confirmed: false,
        };
    },
    methods: {
        deleteDeck() {
            if (this.confirmed) {
                this.$emit("delete-deck", this.deckId);
            }

            this.confirmed = true;

            setTimeout(() => {
                this.confirmed = false;
            }, 3000);
        },
    },
};
</script>