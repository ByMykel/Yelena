<template>
    <div class="overflow-hidden rounded-md">
        <div class="flex items-center justify-between p-2 bg-blue-200">
            <div class="font-medium text-gray-900 truncate">
                <div class="flex items-start p-1">
                    <div class="flex items-center h-5">
                        <input
                            :id="deckName"
                            v-model="deck.checked"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            @change="toggleCheckCards()"
                        />
                    </div>
                    <div class="ml-3 text-sm">
                        <label
                            :for="deckName"
                            class="font-medium text-gray-900"
                            >{{ deckName }}</label
                        >
                    </div>
                </div>
            </div>
            <button @click="show = !show">
                <hero-icons-solid
                    class="w-6 h-6 text-gray-500 duration-300 transform"
                    :class="[show ? 'rotate-180' : 'rotate-0']"
                    name="chevron-down"
                ></hero-icons-solid>
            </button>
        </div>
        <div v-show="show" class="p-2 bg-blue-100">
            <div
                v-for="(card, index) in deck.cards"
                :key="index"
                class="flex items-start p-1"
            >
                <div class="flex items-center h-5">
                    <input
                        :id="deckName + index"
                        v-model="card.checked"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                </div>
                <div class="ml-3 text-sm">
                    <label
                        :for="deckName + index"
                        class="font-medium text-gray-900"
                    >
                        {{ card.question }} - {{ card.answer }}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeroIconsSolid from "../HeroIconsSolid.vue";

export default {
    components: { HeroIconsSolid },
    props: {
        deckName: String,
        deck: Object
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        toggleCheckCards() {
            this.deck.cards.map(card => (card.checked = this.deck.checked));
        }
    }
};
</script>