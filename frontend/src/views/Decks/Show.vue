<template>
    <div>
        <div v-if="!error">
            <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div
                        class="
                            py-2
                            align-middle
                            inline-block
                            min-w-full
                            sm:px-6
                            lg:px-8
                        "
                    >
                        <div
                            class="
                                shadow
                                overflow-hidden
                                border-b border-gray-200
                                sm:rounded-lg
                            "
                        >
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            class="
                                                px-6
                                                py-3
                                                text-left text-xs
                                                font-medium
                                                text-gray-500
                                                uppercase
                                                tracking-wider
                                            "
                                        >
                                            Question
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                                                px-6
                                                py-3
                                                text-left text-xs
                                                font-medium
                                                text-gray-500
                                                uppercase
                                                tracking-wider
                                            "
                                        >
                                            Answer
                                        </th>
                                        <th
                                            scope="col"
                                            class="relative px-6 py-3"
                                        >
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="bg-white divide-y divide-gray-200"
                                >
                                    <tr
                                        v-for="card in deck.cards"
                                        :key="card.id"
                                    >
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{ card.question }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{ card.answer }}
                                        </td>
                                        <td
                                            class="
                                                px-6
                                                py-4
                                                whitespace-nowrap
                                                text-right text-sm
                                                font-medium
                                            "
                                        >
                                            <a
                                                href="#"
                                                class="
                                                    text-indigo-600
                                                    hover:text-indigo-900
                                                "
                                                >Edit</a
                                            >
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>{{ error }}</div>
    </div>
</template>

<script>
import repository from "../../api/repository";

export default {
    data() {
        return {
            deck: [],
            error: "",
        };
    },
    computed: {},
    mounted() {
        this.fetchDeck();
    },
    methods: {
        fetchDeck() {
            repository
                .getDeckById(this.$route.params.id)
                .then((data) => {
                    this.deck = data.data.data;
                })
                .catch((error) => {
                    this.error = error;
                });
        },
    },
};
</script>
