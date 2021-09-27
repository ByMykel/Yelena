<template>
    <button
        class="relative block ml-3 focus:outline-none group"
        @click="deleteCard()"
    >
        <div class="flex flex-row items-center justify-center h-full">
            <div
                class="transition duration-300 ease-out transform scale-0 bg-transparent bg-red-600 rounded-full opacity-0  group-hover:opacity-100 group-focus:opacity-100 group-hover:scale-100 group-focus:scale-100 w-7 h-7 bg-opacity-20"
            ></div>
        </div>
        <div class="absolute inset-0">
            <div
                class="flex items-center justify-center w-full h-full text-gray-900  group-hover:text-red-600 group-focus:text-red-600"
            >
                <hero-icons-outline
                    v-if="!confirmed"
                    class="w-5 h-5"
                    title="Confirm to delete this card"
                    name="trash"
                ></hero-icons-outline>
                <hero-icons-solid
                    v-else
                    class="w-5 h-5 text-red-600"
                    title="Delete this card"
                    name="exclamation-circle"
                ></hero-icons-solid>
            </div>
        </div>
    </button>
</template>

<script>
import HeroIconsOutline from "../HeroIconsOutline.vue";
import HeroIconsSolid from "../HeroIconsSolid.vue";
export default {
    components: { HeroIconsOutline, HeroIconsSolid },
    props: {
        cardId: Number,
    },
    data() {
        return {
            confirmed: false,
        };
    },
    methods: {
        deleteCard() {
            if (this.confirmed) {
                this.$emit("delete-card", this.cardId);
            }

            this.confirmed = true;

            setTimeout(() => {
                this.confirmed = false;
            }, 3000);
        },
    },
};
</script>