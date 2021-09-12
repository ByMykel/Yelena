<template>
    <div>
        <button
            v-if="confirmed"
            title="Confirm to delete this card"
            class="ml-3 font-semibold text-red-600 cursor-pointer hover:text-red-900"
            @click="$emit('delete-card', cardId)"
        >
            <svg
                class="w-5 h-5"
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
        </button>
        <button
            v-else
            title="Delete this card"
            class="ml-3 font-semibold text-red-600 cursor-pointer hover:text-red-900"
            @click="confirmAction()"
        >
            <svg
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
        </button>
    </div>
</template>

<script>
export default {
    props: {
        cardId: Number,
    },
    data() {
        return {
            confirmed: false,
        };
    },
    methods: {
        confirmAction() {
            this.confirmed = true;

            setTimeout(() => {
                this.confirmed = false;
            }, 3000);
        },
    },
};
</script>